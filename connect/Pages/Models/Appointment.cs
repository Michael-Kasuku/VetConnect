﻿namespace connect.Pages.Models
{
    public class Appointment
    {
        public int AppointmentId { get; set; }
        public int Host { get; set; }
        public string? Guest { get; set; }
        public DateTime AppointmentDate { get; set; }

        // Navigation property for HostUser
        public virtual User? HostUser { get; set; }

        // Navigation property for GuestUser
        public virtual User? GuestUser { get; set; }

        // Additional properties can be added here
    }
}
