using System;
using System.Web.Mvc;
using IkusTrafikskola.Core.ViewModels;
using Umbraco.Web;
using Umbraco.Web.Mvc;

namespace IkusTrafikskola.Core.Contollers
{
    public class MetaDataSurfaceController : SurfaceController
    {
        private string PartialViewPath(string name)
        {
            return $"~/Views/Partials/{name}.cshtml";
        }

        public ActionResult RenderMetaData()
        {
            MetaDataModel model = new MetaDataModel();

            string title = CurrentPage.Value<string>("");
            model.Title = !string.IsNullOrEmpty(title) ? title : CurrentPage.Name;
            model.Description = CurrentPage.HasProperty("metaDescription") ? CurrentPage.Value<string>("metaDescription") : null;
            string[] tags = CurrentPage.HasProperty("metaKeywords") ? CurrentPage.Value<string[]>("metaKeywords") : null;
            model.Keywords = String.Join(",", tags);
            model.Url = CurrentPage.Url();

            return PartialView(PartialViewPath("metaData"), model);
        }
    }
}