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
        // STEP 1: CREATE ORDER
        // ------------------------------------------------------
       [HttpPost("create-order")]
public async Task<IActionResult> CreateOrder([FromBody] PaymentRequest request)
{
    var authToken = Convert.ToBase64String(Encoding.UTF8.GetBytes($"{key}:{secret}"));
    _http.DefaultRequestHeaders.Authorization =
        new AuthenticationHeaderValue("Basic", authToken);

    var body = new
    {
        amount = request.Amount * 100,
        currency = "INR",
        receipt = $"rcpt_{Guid.NewGuid()}"
    };

    var response = await _http.PostAsJsonAsync("https://api.razorpay.com/v1/orders", body);
    var content = await response.Content.ReadAsStringAsync();

    if (!response.IsSuccessStatusCode)
    {
        return BadRequest(new
        {
            success = false,
            message = "Razorpay order failed",
            razorpayError = content
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

        // ------------------------------------------------------
        // STEP 2: VERIFY PAYMENT + SAVE + ENROLL
        // ------------------------------------------------------
        [HttpPost("verify-payment")]
        public async Task<IActionResult> VerifyPayment([FromBody] PaymentVerifyRequest req)
        {
            // 1. Compute signature
            string payload = req.RazorpayOrderId + "|" + req.RazorpayPaymentId;

            using var hmac = new HMACSHA256(Encoding.UTF8.GetBytes(secret));
            string computedSignature = BitConverter.ToString(hmac.ComputeHash(Encoding.UTF8.GetBytes(payload)))
                                        .Replace("-", "").ToLower();

            if (computedSignature != req.RazorpaySignature)
            {
                return BadRequest(new { success = false, message = "Invalid payment signature" });
            }

            // 2. Save Payment
            var payment = new Payment
            {
                UserId = req.UserId,
                CourseId = req.CourseId,
                Amount = req.Amount,
                RazorpayPaymentId = req.RazorpayPaymentId,
                RazorpayOrderId = req.RazorpayOrderId,
                RazorpaySignature = req.RazorpaySignature
            };

            _context.Payments.Add(payment);

            // 3. Enroll User
            _context.Enrollments.Add(new Enrollment
            {
                UserId = req.UserId,
                CourseId = req.CourseId
            });

            await _context.SaveChangesAsync();

            return Ok(new { success = true, message = "Payment verified & enrollment complete" });
        }
    }

    public class PaymentRequest
    {
        public int Amount { get; set; }
    }

    public class PaymentVerifyRequest
    {
        public string UserId { get; set; }
        public int CourseId { get; set; }
        public int Amount { get; set; }
        public string RazorpayPaymentId { get; set; }
        public string RazorpayOrderId { get; set; }
        public string RazorpaySignature { get; set; }
    }
}
