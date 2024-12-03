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

# Step 6: Launch the web browser
Write-Host "Launching the web browser..."
Start-Process "http://localhost:3000/index.html"

# Step 7: Start the Node.js application in the foreground
Write-Host "Starting the Node.js application in the foreground. Press Ctrl+C to stop the application."
& node $AppPath

# Clean up
if (Test-Path $InstallerPath) {
    Write-Host "Cleaning up installation files..."
    Remove-Item -Force $InstallerPath
}
