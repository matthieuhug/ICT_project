# Ensure script execution policy allows running this script
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force

# Variables
$NodeVersion = "22.11.0"
$DownloadUrl = "https://nodejs.org/dist/v$NodeVersion/node-v$NodeVersion-x64.msi"
$InstallerPath = "$env:TEMP\node-v$NodeVersion-x64.msi"
$AppPath = "app.js" # Change this to the path of your app.js file

# Function to check Node.js version
function Check-NodeVersion {
    try {
        $CurrentVersion = node -v 2>&1
        if ($CurrentVersion.StartsWith("v$NodeVersion")) {
            Write-Host "Node.js version $NodeVersion is already installed."
            return $true
        }
        else {
            Write-Host "A different version of Node.js is installed: $CurrentVersion. Required: $NodeVersion."
            return $false
        }
    }
    catch {
        Write-Host "Node.js is not installed."
        return $false
    }
}

# Step 1: Check Node.js version
if (-not (Check-NodeVersion)) {
    # Step 2: Download Node.js if not installed or version mismatch
    Write-Host "Downloading Node.js version $NodeVersion..."
    Invoke-WebRequest -Uri $DownloadUrl -OutFile $InstallerPath

    # Step 3: Install Node.js
    Write-Host "Installing Node.js..."
    Start-Process -FilePath "msiexec.exe" -ArgumentList "/i", $InstallerPath, "/quiet", "/norestart" -Wait

    # Step 4: Verify Node.js installation
    Write-Host "Verifying Node.js installation..."
    node -v
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Node.js installation failed!"
        exit 1
    }
}

# Step 5: Install necessary dependencies
Write-Host "Installing dependencies..."
npm install --prefix (Split-Path -Path $AppPath)

# Step 6: Start the Node.js application
Write-Host "Starting the Node.js application..."
Start-Process -NoNewWindow -FilePath "node" -ArgumentList $AppPath

# Step 7: Launch web browser
Write-Host "Launching the web browser..."
Start-Process "http://localhost:3000/index.html"

# Clean up
if (Test-Path $InstallerPath) {
    Write-Host "Cleaning up installation files..."
    Remove-Item -Force $InstallerPath
}

Write-Host "Node.js application started successfully! Press Ctrl+C in the node.js console to stop the application."
