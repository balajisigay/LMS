using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System.Net.Http.Headers;
using System.Security.Cryptography;
using System.Text;
using LmsApi.Data;
using LmsApi.Models;

namespace LmsApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentController : ControllerBase
    {
        private readonly string key = "rzp_test_RJNdnca6en5y2b";
        private readonly string secret = "6C76BZ9g77hrdNf6JwYG4oCN";

        private readonly LmsDbContext _context;
        private readonly HttpClient _http;

        public PaymentController(LmsDbContext context)
        {
            _context = context;
            _http = new HttpClient();
        }

        // ------------------------------------------------------
        // STEP 1: CREATE RAZORPAY ORDER
        // ------------------------------------------------------
        [HttpPost("create-order")]
        public async Task<IActionResult> CreateOrder([FromBody] PaymentRequest request)
        {
            try
            {
                if (request.Amount <= 0)
                    return BadRequest(new { success = false, error = "Invalid amount" });

                var authToken = Convert.ToBase64String(
                    Encoding.UTF8.GetBytes($"{key}:{secret}")
                );

                _http.DefaultRequestHeaders.Authorization =
                    new AuthenticationHeaderValue("Basic", authToken);

                // Convert to paise (integer)
                var amountInPaise = (int)(request.Amount * 100);

                // Generate short receipt (max 40 chars for Razorpay)
                var timestamp = DateTimeOffset.UtcNow.ToUnixTimeSeconds();
                var random = new Random().Next(1000, 9999);
                var receipt = $"rcpt_{timestamp}_{random}";

                var body = new
                {
                    amount = amountInPaise,
                    currency = "INR",
                    receipt = receipt
                };

                var response = await _http.PostAsJsonAsync(
                    "https://api.razorpay.com/v1/orders",
                    body
                );

                var content = await response.Content.ReadAsStringAsync();

                if (!response.IsSuccessStatusCode)
                {
                    Console.WriteLine($"Razorpay Error: {content}");
                    return BadRequest(new
                    {
                        success = false,
                        error = $"Razorpay API error: {content}"
                    });
                }

                var json = JObject.Parse(content);

                return Ok(new
                {
                    orderId = json["id"]?.ToString(),
                    amount = request.Amount,
                    key = key
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error creating order: {ex.Message}");
                return StatusCode(500, new
                {
                    success = false,
                    error = $"Server error: {ex.Message}"
                });
            }
        }

        // ------------------------------------------------------
        // STEP 2: VERIFY PAYMENT + SAVE + ENROLL
        // ------------------------------------------------------
        [HttpPost("verify-payment")]
        public async Task<IActionResult> VerifyPayment(
            [FromBody] PaymentVerifyRequest req
        )
        {
            try
            {
                // Validate request
                if (string.IsNullOrEmpty(req.UserId) || 
                    string.IsNullOrEmpty(req.RazorpayPaymentId) ||
                    string.IsNullOrEmpty(req.RazorpayOrderId) ||
                    string.IsNullOrEmpty(req.RazorpaySignature))
                {
                    return BadRequest(new
                    {
                        success = false,
                        message = "Missing required payment information"
                    });
                }

                // Verify signature
                string payload = $"{req.RazorpayOrderId}|{req.RazorpayPaymentId}";

                using var hmac = new HMACSHA256(Encoding.UTF8.GetBytes(secret));

                string generatedSignature = BitConverter
                    .ToString(hmac.ComputeHash(Encoding.UTF8.GetBytes(payload)))
                    .Replace("-", "")
                    .ToLower();

                if (generatedSignature != req.RazorpaySignature.ToLower())
                {
                    Console.WriteLine($"Signature mismatch. Generated: {generatedSignature}, Received: {req.RazorpaySignature}");
                    return BadRequest(new
                    {
                        success = false,
                        message = "Invalid payment signature"
                    });
                }

                // Check if course exists
                var courseExists = await _context.Courses.FindAsync(req.CourseId);
                if (courseExists == null)
                {
                    return BadRequest(new
                    {
                        success = false,
                        message = "Course not found"
                    });
                }

                // Check if already enrolled
                var alreadyEnrolled = _context.Enrollments
                    .Any(e => e.UserId == req.UserId && e.CourseId == req.CourseId);

                if (!alreadyEnrolled)
                {
                    // Save payment
                    var payment = new Payment
                    {
                        UserId = req.UserId,
                        CourseId = req.CourseId,
                        Amount = req.Amount,
                        RazorpayPaymentId = req.RazorpayPaymentId,
                        RazorpayOrderId = req.RazorpayOrderId,
                        RazorpaySignature = req.RazorpaySignature,
                        PaidAt = DateTime.UtcNow
                    };

                    _context.Payments.Add(payment);

                    // Enroll user
                    _context.Enrollments.Add(new Enrollment
                    {
                        UserId = req.UserId,
                        CourseId = req.CourseId
                    });

                    await _context.SaveChangesAsync();
                }

                return Ok(new
                {
                    success = true,
                    message = "Payment verified & enrolled"
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error verifying payment: {ex.Message}");
                return StatusCode(500, new
                {
                    success = false,
                    message = $"Server error: {ex.Message}"
                });
            }
        }
    }

    // ---------------- DTOs ----------------

    public class PaymentRequest
    {
        public decimal Amount { get; set; }
    }

    public class PaymentVerifyRequest
    {
        public string UserId { get; set; }
        public int CourseId { get; set; }
        public decimal Amount { get; set; }
        public string RazorpayPaymentId { get; set; }
        public string RazorpayOrderId { get; set; }
        public string RazorpaySignature { get; set; }
    }
}