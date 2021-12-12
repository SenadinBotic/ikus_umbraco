using System;
using System.Net;
using System.Net.Mail;
using System.Web.Configuration;
using IkusTrafikskola.Core.Contollers;
using IkusTrafikskola.Core.ViewModels;
using Umbraco.Core.Logging;

namespace IkusTrafikskola.Core.Services
{
    public class SmtpService : ISmtpService
    {
        private readonly ILogger _logger;

        public SmtpService(ILogger logger)
        {
            _logger = logger;
        }
        public bool SendEmail(ContactViewModel model)
        {
            try
            {
                var fromAddress = new MailAddress(model.Email);
                var toAddress = new MailAddress(WebConfigurationManager.AppSettings["SMTPUser"], "Ikus Trafikskola");

                string body = "<table>" +
                            "<tr><td>Förnamn och efternamn:</td><td>" + model.Name + " " + model.LastName + "</td></tr><br>" +
                            "<tr><td>E-postadress:</td><td><a href='mailto:" + model.Email + "'>" + model.Email + "</a></td></tr><br>" +
                            "<tr><td>Meddelande:</td><td>" + model.Message + "</td></tr><br>" +
                          "</table>";

                var client = new SmtpClient
                {
                    Host = "smtp.gmail.com",
                    Port = 587,
                    EnableSsl = true,
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    UseDefaultCredentials = false,
                    Credentials = new NetworkCredential(WebConfigurationManager.AppSettings["SMTPUser"], WebConfigurationManager.AppSettings["SMTPPassword"])
                };

                using (var message = new MailMessage(fromAddress, toAddress)
                {
                    Subject = $"{model.Subject} - {model.Name} {model.LastName}",
                    Body = body,
                    IsBodyHtml = true
                })

                client.Send(message);
                return true;
            }
            catch (Exception ex)
            {
                _logger.Error(typeof(ContactSurfaceController), ex, "Error sending contact form.");
                return false;
            }
        }
    }
}
