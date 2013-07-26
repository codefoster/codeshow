using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace DemoConverter
{
    class Program
    {
        static void Main(string[] args)
        {
            new DirectoryInfo(
                @"C:\Users\jerfost\SkyDrive\Documents\Development\codeshow\codeSHOW.Win81JS\demos")
                .EnumerateDirectories()
                .ToList()
                .ForEach(d => {
                    var jsonFilePath = Path.Combine(d.FullName, d.Name + ".json");
                    var htmlFilePath = Path.Combine(d.FullName, d.Name + ".html");
                    if (!File.Exists(jsonFilePath))
                    {
                        var html = File.ReadAllText(htmlFilePath);
                        string title = "", keywords = "", description = "", author = "", dateCreated = "";

                        //title
                        var match = new Regex("<title>(.*)</title>").Match(html);
                        title = match.Groups[1].Value;

                        //tag
                        match = new Regex("<meta name=\"tags\" content=\"\" />").Match(html);
                        if (match.Success)
                        {
                            html = html.Replace(match.Value, "");
                            File.WriteAllText(htmlFilePath, html);
                        }

                        //keywords
                        match = new Regex("<meta name=\"keywords\" content=\"(.*)\" />").Match(html);
                        if (match.Success)
                        {
                            var fullMatch = match.Value;
                            keywords = match.Groups[1].Value;
                            html = html.Replace(fullMatch, "");
                            File.WriteAllText(htmlFilePath, html);
                        }

                        //description
                        match = new Regex("<meta name=\"description\" content=\"(.*)\" />").Match(html);
                        if (match.Success)
                        {
                            var fullMatch = match.Value;
                            description = match.Groups[1].Value;
                            html = html.Replace(fullMatch, "");
                            File.WriteAllText(htmlFilePath, html);
                        }

                        //author
                        match = new Regex("<meta name=\"author\" content=\"(.*)\" />").Match(html);
                        if (match.Success)
                        {
                            var fullMatch = match.Value;
                            author = match.Groups[1].Value;
                            html = html.Replace(fullMatch, "");
                            File.WriteAllText(htmlFilePath, html);
                        }

                        //dateCreated
                        match = new Regex("<meta name=\"keywords\" content=\"(.*)\" />").Match(html);
                        if(match.Success)
                        {
                            var fullMatch = match.Value;
                            dateCreated = match.Groups[1].Value;
                            html = html.Replace(fullMatch, "");
                            File.WriteAllText(htmlFilePath, html);
                        }                                

                        //write json file
                        keywords = "\"" + String.Join("\",\"", keywords.Split(' ')) + "\"";
                        var result = "{\n" +
                            "    \"title\": \"" + title + "\",\n" +
                            "    \"keywords\":[" + keywords + "],\n" +
                            "    \"description\": \"" + description + "\",\n" +
                            "    \"author\": \"" + author + "\",\n" +
                            "    \"dateCreated\": \"" + dateCreated + "\"\n" +
                            "}";
                        File.WriteAllText(jsonFilePath, result);
                    }
                    Console.WriteLine("done");
                });
        }
    }
}
