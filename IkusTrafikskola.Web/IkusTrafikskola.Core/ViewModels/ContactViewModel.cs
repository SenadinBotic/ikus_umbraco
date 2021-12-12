using System.ComponentModel.DataAnnotations;
using Umbraco.Web;

namespace IkusTrafikskola.Core.ViewModels
{
    public class ContactViewModel
    {
        //[Required(ErrorMessage = UmbracoHelper.GetDictionaryValue("Contact.ErrorMessage.FirstName"))]
        [MinLength(length: 3, ErrorMessage = "Dozvoljen je unos od minimalno 3 karaktera.")]
        public string Name { get; set; }

        //[Required(ErrorMessage = "Molimo unesite Vaše prezime.")]
        //[MinLength(length: 3, ErrorMessage = "Dozvoljen je unos od minimalno 3 karaktera.")]
        public string LastName { get; set; }

        //[Required(ErrorMessage = "Molimo unesite Vašu E-mail adresu.")]
        //[EmailAddress(ErrorMessage = "Molimo unesite E-mail adresu u ispravnom formatu.")]
        public string Email { get; set; }

        //[Required(ErrorMessage = "Molimo unesite naziv Vaše poruke.")]
        ////[MinLength(length: 3, ErrorMessage = "Dozvoljen je unos od minimalno 3 karaktera.")]
        public string Subject { get; set; }

        //[Required(ErrorMessage = "Molimo unesite Vašu poruku.")]
        //[MinLength(length: 3, ErrorMessage = "Dozvoljen je unos od minimalno 3 karaktera.")]
        public string Message { get; set; }

        public int ContactFormId { get; set; }

    }
}
