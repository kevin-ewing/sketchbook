# CS467 Sketchbook Template

Use this template to set up your sketchbook. 

Once you have this set up on Github, it will automatically build a list of your sketches on Github Pages.

To create new sketches, you just need to add new folders containing `index.html` and any JavaScript files required for your sketch to the `sketch` folder. I've given you a sample sketch to get you started. Please rename this and use it to start your first sketch. Alternatively, you could just delete it and start fresh. 


# Setting up GitHub

There are a couple of steps required on GitHub for this process to work.

- Open the project settings on GitHub (it is the far right tab in the tab bar at the top with a gear con next to it)
- In the menu on the left, choose **Actions** and then **General** from the options that appear below **Actions**.
- Find the section marked **Workflow permissions** and change the setting to "read and write permissions" (this allows the action I wrote for you to make changes to the files in your repository). If this is already set, just move to the next step.
- Again from the menu on the left, choose **Pages**.
- In the **Build and deployment** section, set the **Source** to "Deploy from a branch" and set the **Branch** to "main" and then click the "Save" button


Everything should now be set up. Every time that you push your code to GitHub, it will automatically generate the list of sketches and publish your site. 

When the site is published, there will be a link at the top of the **Pages** page in the Settings. You can also see the progress of the deployment in the **Code** view in a panel on the right side labeled **Environments**. For a more details view of what is going on, you can check on the progress of the two actions in the **Actions** tab. If they ever fail, just let me know. 

# Note

The Github Action is updating a file in the repository, so make sure that you do a `git pull` afterwards to get the changed file before you do a `git push`.