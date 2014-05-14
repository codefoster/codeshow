using System.Collections.Generic;
using Windows.UI.Xaml.Controls;

namespace CodeShow.CS
{
    public class Item
    {
        public Item(string name, string desc)
        {
            this.ItemName = name;
            this.Description = desc;
        }
        public string ItemName { get; set; }
        public string Description { get; set; }
    }
    public class GroupOfItems
    {
        public GroupOfItems()
        {
            this.GroupItems = new List<Item>();
        }
        public string GroupTitle { get; set; }
        List<Item> groupItems = new List<Item>();
        public List<Item> GroupItems { get; set; }
    }
    public sealed partial class GroupedItemsDemo : UserControl
    {
        public List<GroupOfItems> Groups { get; set; }
        public GroupedItemsDemo()
        {
            this.InitializeComponent();
            this.Groups = new List<GroupOfItems>();
     
            for (int i = 0; i < 4; i++)
            {
                GroupOfItems goi = new GroupOfItems();
                goi.GroupTitle = "Group " + i.ToString();
                for (int j = 0; j < 5; j++)
                {
                    Item item = new Item("Item " + j.ToString(),
                        "Desc " + j.ToString());
                    goi.GroupItems.Add(item);
                }

                this.Groups.Add(goi);
            }

            this.collectionViewSourceName.Source = this.Groups;
        }
    }
}
