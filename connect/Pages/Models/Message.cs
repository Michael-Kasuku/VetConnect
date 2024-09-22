﻿namespace connect.Pages.Models
{
    public class Message
    {
        public int MessageId { get; set; }
        public string? SenderEmailAddress { get; set; }
        public string? MessageContent { get; set; }
        public DateTime TimeSent { get; set; } = DateTime.Now;
    }
}
