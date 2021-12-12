using IkusTrafikskola.Core.ViewModels;

namespace IkusTrafikskola.Core.ViewModels
{
    public interface ISmtpService
    {
        bool SendEmail(ContactViewModel model);
    }
}
