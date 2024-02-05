# Setup for SPA ⚛️

# PRE-REQS

-   Microsoft Windows OS (windows 10, Windows Server)
-   Download and install Git for windows (https://git-scm.com/download/win)
-   Node.js and NPM Version 6.14.5 (https://nodejs.org/en/download/releases/)
    -   Any version of node will work, but if the version of Node doesn't have NPM Version 6.14.5<br>
        run the command:<br>
        `npm install -g npm@6.14.5`<br>
        anywhere in the terminal.

# Step 1) Clone the code

```
git clone https://...git
```

Then

# Step 2) Install dependencies

Move into the directory

```
cd {tu folder}
```

Within the {tu folder} directory run the command:

```
npm install
```

# Step 3) HTTPS Configuration

This is a token based site that must ran under HTTPS protocal to perform Refresh-Token to request a new access token.

-   Make sure that at the end of this step you have 2 files in the main root, in the same level of the "src" folder.
-   The 2 files must be named like the following:
    -   localhost-key.pem
    -   localhost.pem

## Install mkcert

Follow instructions in the following url: https://github.com/FiloSottile/mkcert

-   Chocolatey seems the package that works to install mkcert. DON'T use "npm install mkcert".
-   Once installed, run the 2 commands below:

    ```
    Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

    choco install mkcert
    mkcert -install
    mkcert -key-file localhost-key.pem -cert-file localhost.pem localhost
    ```

# Step 4) Run App

```
npm start
```

Once everything in frontend is compiled, in an internet browser go to url `localhost:82`
