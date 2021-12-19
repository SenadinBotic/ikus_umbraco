using System.ComponentModel.DataAnnotations;

namespace IkusTrafikskola.Core.ViewModels
{
    public class ContactViewModel
    {
        [Required(ErrorMessage = "Vänligen ange ditt meddelande.")]
        [MinLength(length: 3, ErrorMessage = "Minst 3 tecken är tillåtna.")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Vänligen ange ditt efternamn.")]
        [MinLength(length: 3, ErrorMessage = "Minst 3 tecken är tillåtna.")]
        public string LastName { get; set; }

        [Required(ErrorMessage = "Var god skriv in din e-postadress.")]
        [EmailAddress(ErrorMessage = "Ange e-postadressen i rätt format.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Vänligen skriv in ditt telefonnummer.")]
        [MinLength(length: 3, ErrorMessage = "Minst 3 tecken är tillåtna.")]
        public string Phone { get; set; }

        [Required(ErrorMessage = "Ange ditt personnummer.")]
        [MinLength(length: 3, ErrorMessage = "Minst 3 tecken är tillåtna.")]
        public string PersonalNumber { get; set; }

        [Required(ErrorMessage = "Ange ett namn för ditt meddelande.")]
        [MinLength(length: 3, ErrorMessage = "Minst 3 tecken är tillåtna.")]
        public string Subject { get; set; }

        [Required(ErrorMessage = "Vänligen ange ditt meddelande.")]
        [MinLength(length: 3, ErrorMessage = "Minst 3 tecken är tillåtna.")]
        public string Message { get; set; }

        public int ContactFormId { get; set; }

    }
}
