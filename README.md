# ICT_project

This project includes a simple PowerShell script, launch.ps1, that automates the setup and launch of a Node.js application. The script ensures all necessary tools are installed and the application is accessible on your local machine.
What Does launch.ps1 Do?

    Checks Node.js Installation:
        The script checks if Node.js is already installed on your machine.
        If Node.js is installed and the version matches the required version (22.11.0), it skips the installation step.
        If Node.js is not installed or the version is incorrect, the script downloads and installs the correct version.

    Installs Application Dependencies:
        The script automatically runs npm install to install all required Node.js modules specified in the package.json file.

    Launches the Application:
        The script starts the app.js file using Node.js.
        It opens your default web browser, pointing to the application URL: http://localhost:3000.

How to Use

    Open PowerShell on your Windows machine.
    Navigate to the folder containing the launch.ps1 script.
    Run the following command:

.\launch.ps1

The script will handle all the setup automatically. Once complete, you can access the application at:

    http://localhost:3000

