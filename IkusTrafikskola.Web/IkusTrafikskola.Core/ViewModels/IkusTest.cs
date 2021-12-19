using System.Collections.Generic;

namespace IkusTrafikskola.Core.ViewModels
{
    public class IkusTest
    {
        public int ID { get; set; }
        public string Image { get; set; }
        public string Question { get; set; }
        public List<IkusTestItem> TestItemList { get; set; }
    }
}
