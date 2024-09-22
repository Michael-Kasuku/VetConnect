using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;
using connect.Pages.Models;
using System;

namespace connect.Pages
{
    public class IndexModel : PageModel
    {
        private readonly ILogger<IndexModel> _logger;
        private readonly AppDbContext _context; // Assuming you're using EF for database
        public string? name = "";
        public string? email = "";
        public string? message = "";

        public IndexModel(ILogger<IndexModel> logger, AppDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        public void OnGet()
        {

        }

        public IActionResult OnPost()
        {
            // Get the data the user has entered
            name = Request.Form["name"];
            email = Request.Form["email"];
            message = Request.Form["message"];

            // Save the data to the database
            if (!string.IsNullOrEmpty(name) && !string.IsNullOrEmpty(email) && !string.IsNullOrEmpty(message))
            {
                try
                {
                    var newMessage = new Message
                    {
                        SenderEmailAddress = email,
                        MessageContent = message,
                        TimeSent = DateTime.Now
                    };

                    _context.Messages.Add(newMessage);
                    _context.SaveChanges();

                    // Set success message
                    TempData["MessageStatus"] = "Message sent successfully!";
                    TempData["AlertType"] = "success"; // Bootstrap alert type
                }
                catch (Exception ex)
                {
                    // Log error and set error message
                    _logger.LogError(ex, "Error saving message to the database.");
                    TempData["MessageStatus"] = "An error occurred while sending the message.";
                    TempData["AlertType"] = "danger"; // Bootstrap alert type
                }
            }
            else
            {
                TempData["MessageStatus"] = "All fields are required.";
                TempData["AlertType"] = "warning"; // Bootstrap alert type
            }

            return RedirectToPage(); // To prevent form resubmission
        }
    }
}
