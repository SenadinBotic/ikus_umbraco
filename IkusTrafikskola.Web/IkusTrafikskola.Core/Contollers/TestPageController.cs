using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Umbraco.Web.Mvc;
using Umbraco.Web;
using System.Web.Script.Serialization;
using Umbraco.Core.Models.PublishedContent;
using IkusTrafikskola.Core.ViewModels;

namespace IkusTrafikskola.Core.Contollers
{
    public class TestPageController : SurfaceController
    {
        private string PartialViewPath(string name)
        {
            return $"~/Views/Partials/TestPage/{name}.cshtml";
        }

        public ActionResult RenderWelcomeSection()
        {
            return PartialView(PartialViewPath("welcomePage"));
        }

        public ActionResult RenderCategorySection()
        {
            List<QuizCategory> list = new List<QuizCategory>();
            var categories = CurrentPage.AncestorOrSelf("quiz").Children.Where(x => x.IsVisible());

            foreach (var category in categories) 
            {
                QuizCategory obj = new QuizCategory();
                obj.CategoryName = category.Name;
                obj.CategoryLink = category.Url();
                list.Add(obj);
            }

            return PartialView(PartialViewPath("categoryPage"), list);
        }

        public ActionResult RenderTestSection()
        {
            List<IkusTest> model = new List<IkusTest>();
            IPublishedContent testPage = CurrentPage.AncestorOrSelf("testPage");
            var testItemSection = testPage.Value<IEnumerable<IPublishedElement>>("testQuestion").OrderBy(x => Guid.NewGuid()).Take(70);
            List<IkusTest> list = new List<IkusTest>();

            int i = 0;
            int j = 0;
            List<QuestionAnswerMapper> correctAnswers = new List<QuestionAnswerMapper>();
            foreach (var fieldset in testItemSection)
            {

                var image = fieldset.Value<IPublishedContent>("questionImage");
                string imageUrl = "";

                if (image != null)
                {
                    imageUrl = image.Url();
                }
                else
                {
                    imageUrl = "/assets/images/Default.png";
                }

                var question = fieldset.Value<string>("questionText");
                var testList = fieldset.Value<IEnumerable<IPublishedElement>>("testAnswers");

                IkusTest obj = new IkusTest();
                obj.ID = i;
                obj.Image = imageUrl;
                obj.Question = question;
                obj.TestItemList = new List<IkusTestItem>();
                foreach (var item in testList)
                {
                    var index = j++;
                    if (item.Value<bool>("correctAnswer"))
                    {
                        correctAnswers.Add(new QuestionAnswerMapper() { QuestionId = i, AnswerId = index });
                    }

                    obj.TestItemList.Add(new IkusTestItem(item.Value<string>("answer"), item.Value<bool>("correctAnswer"), index));
                }
                j = 0;
                i++;
                list.Add(obj);
            }

            var json = new JavaScriptSerializer().Serialize(correctAnswers);
            Response.Cookies.Add(new HttpCookie("PitanjaOdgovori", json));
            return PartialView(PartialViewPath("testContent"), list);
        }

        public class QuestionAnswerMapper
        {
            public int QuestionId { get; set; }
            public int AnswerId { get; set; }
        }
    }
}
