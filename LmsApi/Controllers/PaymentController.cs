using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

        // ---------------- CREATE ORDER ----------------
        [HttpPost("create-order")]
        public async Task<IActionResult> CreateOrder([FromBody] PaymentRequest request)
        {
            if (request.Amount <= 0)
                return BadRequest("Invalid amount");

            var auth = Convert.ToBase64String(
                Encoding.UTF8.GetBytes($"{key}:{secret}")
            );

            _http.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Basic", auth);

            var body = new
            {
                amount = (int)(request.Amount * 100),
                currency = "INR",
                receipt = $"rcpt_{Guid.NewGuid():N}".Substring(0, 30)
            };

            var response = await _http.PostAsJsonAsync(
                "https://api.razorpay.com/v1/orders", body);

            var content = await response.Content.ReadAsStringAsync();
            if (!response.IsSuccessStatusCode)
                return BadRequest(content);

            var json = JObject.Parse(content);
            var orderId = json["id"]!.ToString();

            var payment = new Payment
            {
                UserId = request.UserId,
                CourseId = request.CourseId,
                Amount = request.Amount,
                RazorpayOrderId = orderId,
                Status = "CREATED"
            };

            _context.Payments.Add(payment);
            await _context.SaveChangesAsync();

            return Ok(new { orderId, key });
        }

        // ---------------- VERIFY PAYMENT ----------------
        [HttpPost("verify-payment")]
        public async Task<IActionResult> VerifyPayment(
            [FromBody] PaymentVerifyRequest req)
        {
            var payload = $"{req.RazorpayOrderId}|{req.RazorpayPaymentId}";
            using var hmac = new HMACSHA256(Encoding.UTF8.GetBytes(secret));

            var generated = BitConverter
                .ToString(hmac.ComputeHash(Encoding.UTF8.GetBytes(payload)))
                .Replace("-", "")
                .ToLower();

            if (generated != req.RazorpaySignature.ToLower())
                return BadRequest("Invalid signature");

            var payment = await _context.Payments
                .FirstOrDefaultAsync(p =>
                    p.RazorpayOrderId == req.RazorpayOrderId);

            if (payment == null)
                return BadRequest("Payment record not found");

            payment.RazorpayPaymentId = req.RazorpayPaymentId;
            payment.RazorpaySignature = req.RazorpaySignature;
            payment.Status = "PAID";
            payment.PaidAt = DateTime.UtcNow;

            bool alreadyEnrolled = await _context.Enrollments.AnyAsync(e =>
                e.UserId == payment.UserId &&
                e.CourseId == payment.CourseId);

            if (!alreadyEnrolled)
            {
                _context.Enrollments.Add(new Enrollment
                {
                    UserId = payment.UserId,
                    CourseId = payment.CourseId
                });
            }

            await _context.SaveChangesAsync();

            return Ok(new { success = true });
        }
    } // ✅ CONTROLLER CLOSED HERE

    // ---------------- DTOs ----------------

    public class PaymentRequest
    {
        public string UserId { get; set; }
        public int CourseId { get; set; }
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
