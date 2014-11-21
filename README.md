*Note: you need Visual Studio 2013 _Update 2_ to work on the _latest_ version of codeShow*

!! codeShow in the Windows 8 Store
Go to [url:http://aka.ms/codeshowapp] to install codeShow from the Windows 8 Store

!! Project Description
This is a Windows 8 HTML/JS project with the express goal of demonstrating simple development concepts for the Windows 8 platform. You may learn some stuff about end-to-end app architecture by looking at the source code of codeShow, but the primary goal of the project is to help you learn discrete programming tasks such as accessing the camera, implementing an asymmetric ListView, or handling errors look to codeShow. 
To see what's new with codeShow, visit the [news] page.

!! How to download the codeShow source code
First of all, don't go to the downloads tab! That's for installing software releases and codeShow doesn't have a release. It's just source code right now.
There are two paths you can take for getting the source code: you can download it as a zip file or you can clone it using Git. If you download it as a zip file, you will always have the version you downloaded. If you clone it using Git, then you can easily pull changes down into your project, so I recommend the latter. Regardless, I'll explain how to do both...

*OPTION 1: Download a zip file*
Downloading a project zip file is super easy, but you only get a snapshot of the project at one point in time. When contributors make changes to codeShow, you will have to download a new zip file... sort of a headache. Anyway, here's how to do it...
* go to the Source Code tab
* look for the download link under the main menu bar on the right and whack it
* unzip the downloaded file... if you don't know how to unzip a file, you've got bigger problems

*OPTION 2: Clone or fork it?*
Well, should I clone or fork it? The question is, are you going to contribute to the project (which you're encouraged to do by the way)? If not, then you only need to clone it. You'll still be able to easily get the latest changes. If you want to be a good citizen and make contributions to codeShow then you need to fork it. Forking a git project means that you are creating your own online repository that is linked to the original. This allows the project owner (us) to _pull_ in changes when you change something and submit a _pull request_.

*To fork it in CodePlex*
If you are considering making contributions to codeShow, then fork the project first and then clone your forked project instead of the original one (using the steps below for cloning a project).
* sign in to CodePlex
* go to codeshow.codeplex.com
* go to the Source Code tab
* click Fork... that's it
* and see the link next to Fork that says Send Pull Request? That's what you're going to use to notify us that you have commits that you think add value to the project and recommend we pull in.

*To clone it from Visual Studio 2013*
* open VS2013 and go to the Team Explorer tab (usually next to Solution Explorer)
* go to Settings | Git Settings
** make sure your name and email are filled in (those are recorded in commits in git)
** enter the path to your development folder
** enable author images
* then drop the nav menu down and go to Project | Team Projects
* hit Clone and type in https://git01.codeplex.com/codeshow
* verify you like the path where it's going to go
* hit Clone
* when it's done click on the project and then click on the .sln file to launch it
* now you can come back to the Commits section of Team Explorer and Sync anytime you want to get the latest changes

*To clone it from the command line*
* go to the Source Code tab
* open Git Bash or PowerShell
* browse to your development folder
* run "git clone https://git01.codeplex.com/codeshow" (a new folder called codeShow will be created for you by default)

*.then()*
Regardless of which method you use to get the code down to your system, you'll want to do this afterward...
* open the codeshow\packages folder
* install all of the SDKs included there
* now open the .sln file in Visual Studio and have fun!
One more note about the SDKs. You install the SDKs to fulfill the References that you'll find in the project. In the Solution Explorer, you'll see the References folder and the references in there are based on these SDKs. If you don't install an SDK, then you'll have to remove the reference. If there is code that depends on a reference then your project won't build and the Errors Pane will start screaming bloody murder.
By the way, these SDKs are updated from time to time. If you get a new version of the code (by either downloading it or by pulling changes) and you start running into errors, then you may need to update one of the SDKs by simply running the installation from the packages folder again

!! Privacy Policy (aka "Legal Stuff")
The codeShow app requests access to internet to provide access for various demos in the project, but neither the app itself or any of the demos in the app collect, store, or share any identifying information from users. Rest assured that your privacy is respected. If you would like to report any violation of this policy, you can contact any of the project contributors.
