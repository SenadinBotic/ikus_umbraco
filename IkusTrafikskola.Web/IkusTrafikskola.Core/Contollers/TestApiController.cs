using System.Collections.Generic;
using System.Web.Configuration;
using Umbraco.Core.Models.PublishedContent;
using Umbraco.Web;
using Umbraco.Web.WebApi;

namespace IkusTrafikskola.Core.Contollers
{
    public class TestApiController : UmbracoApiController
    {
        public bool GetValidEmail(string Email, string Password)
        {
            var content = Umbraco.Content(1116);
            var usersList = content.Value<IEnumerable<IPublishedElement>>("emailValidation");

            bool valid = false;

            foreach ( var item in usersList)
            {
                var email = item.Value<string>("userMail");
                var userDisabled = item.Value<bool>("userStatus");

                if (email.ToLower() == Email.ToLower() && !userDisabled)
                    valid = true;
            }
            if (valid)
            {
                if (Password != WebConfigurationManager.AppSettings["TestPassword"])
                    valid = false;
            }
            return valid;
        }
    }
}
