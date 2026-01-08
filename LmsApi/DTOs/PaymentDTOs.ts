namespace LmsApi.DTOs
{
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
