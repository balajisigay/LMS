public class Payment
{
    public int Id { get; set; }

    public string UserId { get; set; }
    public int CourseId { get; set; }

    public string RazorpayOrderId { get; set; }
    public string? RazorpayPaymentId { get; set; }
    public string? RazorpaySignature { get; set; }

    public decimal Amount { get; set; }

    public string Status { get; set; } = "CREATED"; // CREATED | PAID | FAILED

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? PaidAt { get; set; }
}
