using CodeShow.CS.Shared;
using Windows.Graphics.Display;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Documents;
using Windows.UI.Xaml.Controls;

namespace CodeShow.CS
{
    public sealed partial class CodeShowControl : UserControl
    {
        private double currentViewWidth;
        private double currentViewHeight;
        private string csText;
        private string xamlText;
        private SyntaxHighlighter syntaxHighlighter = new SyntaxHighlighter();

        private enum CodeType { Cs, Xaml}
        public string ShowCsText
        {
            set
            {
                this.csText = value;
                this.updateViewText(CodeType.Cs);
            }
            get
            {
                return this.csText;
            }
        }

        public string ShowXamlText
        {
            set
            {
                this.xamlText = value;
                this.updateViewText(CodeType.Xaml);
            }
            get
            {
                return this.xamlText;
            }
        }

        public CodeShowControl()
        {
            this.InitializeComponent();
            this.SizeChanged += OnSizeChanged;
            DisplayInformation.GetForCurrentView().OrientationChanged += OnOrientationChanged;
        }

        private void updateViewText(CodeType codeType )
        {
            Paragraph paragraph = null;
            switch (codeType)
            {
                case CodeType.Cs:
                    paragraph = this.syntaxHighlighter.HighlightCsParagraph(this.csText);
                    this.csRichTextBlock.Blocks.Add(paragraph);
                    break;
                case CodeType.Xaml:
                    paragraph = this.syntaxHighlighter.HighlightXamlParagrapy(this.xamlText);
                    this.xamlRichTextBlock.Blocks.Add(paragraph);
                    break;
            }
        }

        private void OnOrientationChanged(DisplayInformation sender, object args)
        {
            if (sender.CurrentOrientation == DisplayOrientations.Portrait)
            {
                this.SetDisplayForWidth(this.currentViewHeight);
            }
            else
            {
                this.SetDisplayForWidth(this.currentViewWidth);
            }
            
        }

        private void OnSizeChanged(object sender, SizeChangedEventArgs e)
        {
            this.currentViewHeight = e.NewSize.Height;
            this.currentViewWidth = e.NewSize.Width;
            this.SetDisplayForWidth(e.NewSize.Width);
        }

        private void SetDisplayForWidth(double width)
        {
            if (width <= 800)
            {
                VisualStateManager.GoToState(this, "Portrait", false);
                Grid.SetColumn(this.csViewer, 1);
                Grid.SetRow(this.csViewer, 1);
                Grid.SetColumn(this.controlGrid, 1);
                Grid.SetRow(this.controlGrid, 2);

                if (width < 500)
                {
                    this.ColumnZero.Width = new GridLength(20);
                }
            }
            else
            {
                VisualStateManager.GoToState(this, "Landscape", false);
            }
        }

        public void SetControl(UserControl control, bool add)
        {
            if (add)
            {
                this.control.Children.Add(control);
            }
            else
            {
                this.control.Children.RemoveAt(0);
            }
        }
    }
}
