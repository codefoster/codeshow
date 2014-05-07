using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Windows;
using Windows.UI;
using Windows.UI.Xaml;
using Windows.UI.Text;
using Windows.UI.Xaml.Documents;
using Windows.UI.Xaml.Media;

namespace CodeShow.CS.Shared
{
    public class SyntaxHighlighter
    {
        
        private List<string> keyWords = new List<string>();
        private const int FontSize = 14;

        public static List<string> ObjectNames
        {
            get;
            set;
        }
        public SyntaxHighlighter() 
        {
            this.keyWords.Add(".");
            this.keyWords.Add("#if");
            this.keyWords.Add("#endif");
            this.keyWords.Add("abstract");
            this.keyWords.Add("as");
            this.keyWords.Add("async");
            this.keyWords.Add("await");
            this.keyWords.Add("base");
            this.keyWords.Add("bool");
            this.keyWords.Add("break");
            this.keyWords.Add("byte");
            this.keyWords.Add("case");
            this.keyWords.Add("catch");
            this.keyWords.Add("char");
            this.keyWords.Add("checked");
            this.keyWords.Add("class");
            this.keyWords.Add("const");
            this.keyWords.Add("continue");
            this.keyWords.Add("decimal");
            this.keyWords.Add("default");
            this.keyWords.Add("delegate");
            this.keyWords.Add("do");
            this.keyWords.Add("double");
            this.keyWords.Add("else");
            this.keyWords.Add("enum");
            this.keyWords.Add("event");
            this.keyWords.Add("explicit");
            this.keyWords.Add("extern");
            this.keyWords.Add("false");
            this.keyWords.Add("finally");
            this.keyWords.Add("fixed");
            this.keyWords.Add("float");
            this.keyWords.Add("for");
            this.keyWords.Add("foreach");
            this.keyWords.Add("goto");
            this.keyWords.Add("if");
            this.keyWords.Add("implicit");
            this.keyWords.Add("in");
            this.keyWords.Add("int");
            this.keyWords.Add("interface");
            this.keyWords.Add("internal");
            this.keyWords.Add("is");
            this.keyWords.Add("lock");
            this.keyWords.Add("long");
            this.keyWords.Add("namespace");
            this.keyWords.Add("new");
            this.keyWords.Add("null");
            this.keyWords.Add("object");
            this.keyWords.Add("operator");
            this.keyWords.Add("out");
            this.keyWords.Add("override");
            this.keyWords.Add("params");
            this.keyWords.Add("partial");
            this.keyWords.Add("private");
            this.keyWords.Add("protected");
            this.keyWords.Add("public");
            this.keyWords.Add("readonly");
            this.keyWords.Add("ref");
            this.keyWords.Add("return");
            this.keyWords.Add("sbyte");
            this.keyWords.Add("sealed");
            this.keyWords.Add("short");
            this.keyWords.Add("sizeof");
            this.keyWords.Add("stackalloc");
            this.keyWords.Add("static");
            this.keyWords.Add("string");
            this.keyWords.Add("struct");
            this.keyWords.Add("switch");
            this.keyWords.Add("this");
            this.keyWords.Add("throw");
            this.keyWords.Add("true");
            this.keyWords.Add("try");
            this.keyWords.Add("typeof");
            this.keyWords.Add("uint");
            this.keyWords.Add("ulong");
            this.keyWords.Add("unchecked");
            this.keyWords.Add("unsafe");
            this.keyWords.Add("ushort");
            this.keyWords.Add("using");
            this.keyWords.Add("virtual");
            this.keyWords.Add("void");
            this.keyWords.Add("volatile");
            this.keyWords.Add("while");
        }

        public Paragraph HighlightCsParagraph(string text)
        {
            List<char> matchChars = new List<char>();
            matchChars.Add(' ');
            matchChars.Add('.');
            matchChars.Add('(');
            matchChars.Add(',');
            matchChars.Add('\"');
            matchChars.Add('\n');
            matchChars.Add('/');
            matchChars.Add('<');
            matchChars.Add('>');
            matchChars.Add('\r');

            Paragraph paragraph = this.CreateParagraph();

            Run run = null;
            int index = 0;
            while (index < text.Length)
            {
                if (run == null)
                {
                    run = this.CreateNewRun(Colors.Black);
                }

                while (index < text.Length && text[index] == ' ')
                {
                    run.Text += " ";
                    index++;
                }

                char matchedChar;
                int currentIndex = index;
                for ( ; currentIndex < text.Length; currentIndex++)
                {
                    matchedChar = matchChars.Find(match => match == text[currentIndex]);
                    if (matchedChar != '\0')
                    {
                        string sub = text.Substring(index, currentIndex - index);
                        switch (matchedChar)
                        {
                            case ' ':
                            case '.':
                            case '(':
                            case ',':
                            case '>':
                            case '\r':
                                {
                                    if (this.keyWords.Find(item => item == sub.Trim()) != null)
                                    {
                                        if (!String.IsNullOrEmpty(run.Text))
                                        {
                                            paragraph.Inlines.Add(run);
                                            run = this.CreateNewRun(Colors.Blue);
                                        }
                                        else
                                        {
                                            run.Foreground = new SolidColorBrush(Colors.Blue);
                                        }

                                        run.Text = sub + text[currentIndex];
                                        paragraph.Inlines.Add(run);
                                        run = this.CreateNewRun(Colors.Black);
                                    }
                                    else if (SyntaxHighlighter.ObjectNames.Find(item => item == sub.Trim()) != null)
                                    {
                                        if (!String.IsNullOrEmpty(run.Text))
                                        {
                                            paragraph.Inlines.Add(run);
                                            run = this.CreateNewRun(Colors.Turquoise);
                                        }
                                        else
                                        {
                                            run.Foreground = new SolidColorBrush(Colors.Turquoise);
                                        }

                                        run.Text = sub + text[currentIndex];
                                        paragraph.Inlines.Add(run);
                                        run = this.CreateNewRun(Colors.Black);
                                    }
                                    else
                                    {
                                        run.Text += sub + text[currentIndex];
                                        paragraph.Inlines.Add(run);
                                        run = this.CreateNewRun(Colors.Black);
                                    }

                                    index = currentIndex + 1;
                                    break;
                                }
                                case '\"':
                                    run.Text += sub;
                                    paragraph.Inlines.Add(run);
                                    index = currentIndex;
                                    run = this.CreateQuoteRun(text, ref index, Colors.DarkRed);
                                    paragraph.Inlines.Add(run);
                                    run = this.CreateNewRun(Colors.Black);
                                    break;
                                case '\n':
                                    if (sub.Contains("#endif"))
                                    {
                                        paragraph.Inlines.Add(run);
                                        run = this.CreateNewRun(Colors.Blue);
                                        run.Text = sub;
                                        paragraph.Inlines.Add(run);
                                        run = this.CreateNewRun(Colors.Black);
                                    }
                                    else
                                    {
                                        run.Text += sub;
                                    }

                                    index = currentIndex + 1;
                                break;
                            case '/':
                                {
                                    if (currentIndex < text.Length &&
                                        (text[currentIndex + 1] == '/' ||
                                        text[currentIndex + 1] == '*'))
                                    {
                                        run.Text += sub;
                                        paragraph.Inlines.Add(run);
                                        index = currentIndex;
                                    }

                                    run = this.CreateCommentRun(text, ref index, Colors.Green);
                                    paragraph.Inlines.Add(run);
                                    run = this.CreateNewRun(Colors.Black);
                                }

                                break;
                            case '<':
                                {
                                    run.Text += sub + matchedChar;
                                    paragraph.Inlines.Add(run);
                                    index = currentIndex + 1;
                                    run = this.CreateNewRun(Colors.Black);
                                }

                                break; 
                        }

                        if (run.Text.Contains("UserControl"))
                        {

                        }

                        break;
                    }
                }

                if (currentIndex == text.Length && currentIndex != index)
                {
                    string sub = text.Substring(index, currentIndex - index - 1);
                    run.Text += sub;
                    index = currentIndex;
                }
            }

            if (!String.IsNullOrEmpty(run.Text))
            {
                paragraph.Inlines.Add(run);
            }

            return paragraph;
        }

        private Run CreateQuoteRun(string text, ref int index, Color color)
        {
            Run run = this.CreateNewRun(color);
            int currentIndex = text.IndexOf('\"', index + 1);
            run.Text = text.Substring(index, ++currentIndex - index);
            index = currentIndex;

            return run;
        }

        private Run CreateCommentRun(string text, ref int index, Color color)
        {
            Run run = this.CreateNewRun(color);
            int currentIndex = index;
            if (currentIndex < text.Length &&
                                        text[currentIndex + 1] == '/')
            {
                currentIndex = text.IndexOf('\n', index);
                currentIndex++;
            }

            if (currentIndex < text.Length &&
                text[currentIndex + 1] == '*')
            {
                currentIndex = text.IndexOf("*/", index);
                currentIndex += 2;
            }

            currentIndex++;
            string sub = text.Substring(index, currentIndex - index);
            run.Text = sub;
            index = currentIndex;
            return run;
        }

        private Paragraph CreateParagraph()
        {
            Paragraph paragraph = new Paragraph();
            paragraph.FontSize = SyntaxHighlighter.FontSize;
            paragraph.FontWeight = FontWeights.Light;
            paragraph.FontFamily = new FontFamily("Consolas");

            return paragraph;
        }

        public Paragraph HighlightXamlParagrapy(string text)
        {
            Paragraph paragraph = this.CreateParagraph();

            List<char> matchChars = new List<char>();
            matchChars.Add('<');
            matchChars.Add('>');
            matchChars.Add('\"');           
            matchChars.Add('/');
            matchChars.Add('=');
            matchChars.Add(':');

            Run run = null;
            int index = 0;
            while (index < text.Length)
            {
                if (run == null)
                {
                    run = this.CreateNewRun(Colors.Blue);
                }

                while (index < text.Length && text[index] == ' ')
                {
                    run.Text += " ";
                    index++;
                }

                char matchedChar;
                int currentIndex = index;
                for ( ; currentIndex < text.Length; currentIndex++)
                {
                    matchedChar = matchChars.Find(match => match == text[currentIndex]);
                    if (matchedChar != '\0')
                    {
                        switch (matchedChar)
                        {
                            case '<':
                                {
                                    if (!String.IsNullOrEmpty(run.Text))
                                    {
                                        paragraph.Inlines.Add(run);
                                        index = currentIndex;
                                    }
                                    
                                    if (text[currentIndex + 1] == '/')
                                    {
                                        currentIndex++;
                                    }

                                    run = this.CreateNewRun(Colors.Blue);
                                    run.Text = text.Substring(index, currentIndex - index + 1);
                                    paragraph.Inlines.Add(run);

                                    index = currentIndex + 1;
                                    while (text[currentIndex] != ' ' && text[currentIndex] != '>')
                                    { 
                                        currentIndex++;
                                    }

                                    run = this.CreateNewRun(Colors.DarkRed);
                                    run.Text = text.Substring(index, currentIndex - index);
                                    paragraph.Inlines.Add(run);

                                    if (text[currentIndex]  == '>')
                                    {
                                        run = this.CreateNewRun(Colors.Blue);
                                        run.Text = text[currentIndex].ToString();
                                        paragraph.Inlines.Add(run);
                                    }
                                    else
                                    {
                                        currentIndex--;
                                    }
                                    
                                    index = currentIndex;
                                    run = this.CreateNewRun(Colors.Red);
                                 
                                }
                                break;
                            case '\"':
                                {
                                    if (!String.IsNullOrEmpty(run.Text))
                                    {
                                        paragraph.Inlines.Add(run);
                                    }

                                    index = currentIndex;
                                    run = this.CreateQuoteRun(text, ref index, Colors.Blue);
                                    paragraph.Inlines.Add(run);
                                    run = this.CreateNewRun(Colors.Red);
                                    currentIndex = index - 1;
                                }
                                break;
                            case '=':
                            case ':':
                            case '/':
                            case '>':
                                {
                                    if (String.IsNullOrEmpty(run.Text))
                                    {
                                        run.Foreground = new SolidColorBrush(Colors.Blue);
                                    }
                                    else
                                    {
                                        paragraph.Inlines.Add(run);
                                        run = this.CreateNewRun(Colors.Blue);
                                    }

                                    run.Text += matchedChar;
                                    
                                    if (matchedChar == '/')
                                    {
                                        run.Text += '>';
                                        currentIndex++;
                                    }

                                    paragraph.Inlines.Add(run);
                                    run = this.CreateNewRun(Colors.Red);
                                    index = currentIndex;
                                }
                                break;
                        }
                    }
                    else
                    {
                        run.Text += text[currentIndex];
                        if (currentIndex == text.Length - 1)
                        {
                            index = text.Length;
                            if (!paragraph.Inlines.Contains(run))
                            {
                                paragraph.Inlines.Add(run);
                            }
                        }
                    }
                }
            }

            return paragraph;
        }

        private Run CreateNewRun(Color color)
        {
            Run r = new Run();
            r.Foreground = new SolidColorBrush(color);
            return r;
        }
    }
}
