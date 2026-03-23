using MailKit.Security;
using Microsoft.AspNetCore.Mvc;
using MimeKit.Text;
using MimeKit;
using MailKit.Net.Smtp;
using System.Net.Security;
using System.Security.Cryptography.X509Certificates;

namespace Rado.Dyntro.Server.Services
{
    public class EmailService
    {
        public async Task SendEmail(string sendTo, string body)
        {
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse("dyntro.bot@gmail.com"));
            email.To.Add(MailboxAddress.Parse(sendTo));
            email.Subject = "Set password - Dyntro";
            email.Body = new TextPart(TextFormat.Plain) { Text = body };

            try
            {
                using var smtp = new SmtpClient();
                smtp.ServerCertificateValidationCallback = (sender, certificate, chain, sslPolicyErrors) => true;
                smtp.Connect("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
                smtp.Authenticate("dyntro.bot@gmail.com", "ndkyxceijanxswmo"); // daj do pliku appsettings
                smtp.Send(email);
                smtp.Disconnect(true);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
        }
    }
}
