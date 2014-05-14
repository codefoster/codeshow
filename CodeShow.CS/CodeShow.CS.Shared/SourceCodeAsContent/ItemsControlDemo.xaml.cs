using System.Collections.ObjectModel;
using Windows.UI.Xaml.Controls;

namespace CodeShow.CS.Shared
{
    // BeginCutPaste
    public sealed partial class ItemsControlDemo : UserControl
    {
        private class RosterItem
        {
            public RosterItem(string name, string alias)
            {
                this.Alias = alias;
                this.Name = name;
            }
            public string Alias { get; set; }
            public string Name { get; set; }
        }

        private ObservableCollection<RosterItem> rosterList = 
            new ObservableCollection<RosterItem>();
        private ObservableCollection<RosterItem> RosterList
        {
            get { return this.rosterList;}
        }
 
        public ItemsControlDemo()
        {
            this.InitializeComponent();
            this.AddRosterItems();
            this.roster.ItemsSource = this.RosterList;
        }

        // EndCutPaste
        private void AddRosterItems()
        {
            this.rosterList.Add(new RosterItem("RobAtkin", "RBAOFTIKN"));
            this.rosterList.Add(new RosterItem("Paola", "APDSLAO"));
            this.rosterList.Add(new RosterItem("Emilio", "EIMFILBO"));
            this.rosterList.Add(new RosterItem("Kaitlyn", "KBADCUK"));
            this.rosterList.Add(new RosterItem("Chris", "CHGIRSTBU"));
            this.rosterList.Add(new RosterItem("Lita", "LIADTC"));
            this.rosterList.Add(new RosterItem("Richard", "IRCCFHOOK"));
            this.rosterList.Add(new RosterItem("Marlene", "CMOQAT"));
            this.rosterList.Add(new RosterItem("Octavio", "OCCAURSZ"));
            this.rosterList.Add(new RosterItem("Erin", "REIDDNALL"));
            this.rosterList.Add(new RosterItem("Kirill", "KRIIDLLDE"));
            this.rosterList.Add(new RosterItem("Todd", "TDREKVSEN"));
            this.rosterList.Add(new RosterItem("Aysar", "ASARYAE"));
            this.rosterList.Add(new RosterItem("James", "JAITFZ"));
            this.rosterList.Add(new RosterItem("Anne", "ANFLICNH"));
            this.rosterList.Add(new RosterItem("Srinivasa", "SRINIGV"));
            this.rosterList.Add(new RosterItem("Jianxia", "JIAGO"));
            this.rosterList.Add(new RosterItem("Jennifer", "JGEENTEL"));
            this.rosterList.Add(new RosterItem("Meetali", "EGMEOL"));
            this.rosterList.Add(new RosterItem("Flavio", "VFLAIGO"));
            this.rosterList.Add(new RosterItem("Raajkanna", "ARVGOIDN"));
            this.rosterList.Add(new RosterItem("Prema", "PAGRHNDI"));
            this.rosterList.Add(new RosterItem("Dimitar", "DAMGGI"));
            this.rosterList.Add(new RosterItem("Ramachandran", "RBAMGUDRU"));
            this.rosterList.Add(new RosterItem("Dave", "DAAHMITL"));
            this.rosterList.Add(new RosterItem("Minglei", "IMHAUNG"));
            this.rosterList.Add(new RosterItem("Hung Jen", "HUNGJIN"));
            this.rosterList.Add(new RosterItem("Sonia", "SONIK"));
            this.rosterList.Add(new RosterItem("Jakub", "JAKUBK"));
            this.rosterList.Add(new RosterItem("Raghu", "RAGHURK"));
            this.rosterList.Add(new RosterItem("Scott", "SCOTTKUR"));
            this.rosterList.Add(new RosterItem("Christophe", "CHRILE"));
            this.rosterList.Add(new RosterItem("Eddie", "EDDIELI"));
            this.rosterList.Add(new RosterItem("Yuen Fai", "YUENLO"));
            this.rosterList.Add(new RosterItem("Jordan", "JOMAPLES"));
            this.rosterList.Add(new RosterItem("Wenbin", "WMENG"));
            this.rosterList.Add(new RosterItem("Hovsep", "HOVSEPM"));
            this.rosterList.Add(new RosterItem("Tim", "TIMINC"));
            this.rosterList.Add(new RosterItem("Naveena", "NAVEENAP"));
            this.rosterList.Add(new RosterItem("Kriti", "KRTIIP"));
            this.rosterList.Add(new RosterItem("Cary", "CAYRP"));
            this.rosterList.Add(new RosterItem("Dan  II", "DAOPP"));
            this.rosterList.Add(new RosterItem("Ivan  Sastre", "IVNASA"));
            this.rosterList.Add(new RosterItem("Sagar", "SAASHA"));
            this.rosterList.Add(new RosterItem("Shou-Ching", "SHOCUL"));
            this.rosterList.Add(new RosterItem("Carl", "CARSLC"));
            this.rosterList.Add(new RosterItem("Bryan", "BSOCTT"));
            this.rosterList.Add(new RosterItem("Anuja", "NAUHSAH"));
            this.rosterList.Add(new RosterItem("Catalin", "CSIICU"));
            this.rosterList.Add(new RosterItem("Carlos", "CAISU"));
            this.rosterList.Add(new RosterItem("Tammy", "TAMMYB"));
            this.rosterList.Add(new RosterItem("Andrew", "ANMSIT"));
            this.rosterList.Add(new RosterItem("Edward", "DEWRADS"));
            this.rosterList.Add(new RosterItem("Taylor", "UYATNG"));
            this.rosterList.Add(new RosterItem("Joel Varela", "JDOOANDO"));
            this.rosterList.Add(new RosterItem("Jagannathan", "JGAAVN"));
            this.rosterList.Add(new RosterItem("Sumita", "SUIMTAV"));
            this.rosterList.Add(new RosterItem("Xuan", "XUNAWAGN"));
            this.rosterList.Add(new RosterItem("Larry", "LRARYWNI"));
            this.rosterList.Add(new RosterItem("Yun", "YUXN"));
            this.rosterList.Add(new RosterItem("Jennifer", "JNENZ"));
            this.rosterList.Add(new RosterItem("Jing", "JINZGH"));
            this.rosterList.Add(new RosterItem("Ken", "JIAZNHAN"));
            this.rosterList.Add(new RosterItem("Li", "LIZAHO"));
        }
    }
}


