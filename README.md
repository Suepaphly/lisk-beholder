# lisk-beholder
A Delegate list for lisk-core3


Demo: http://liskbeholder.io


### Prerequisites

- Node.js
- PM2
- Express
- Axios 
- Ant-design

### Installation

```
git clone https://github.com/Suepaphly/lisk-beholder
cd lisk-beholder
npm install
```

### Config

You can change the node the client is connected to in `src\config\config.json`

### Run locally

In the lisk-mini-explorer directory run: `npm start`


### Run on a webserver

To run the explorer in the background on a server you can use pm2 together with express.

First build your scripts and place the build directory on a server.
```npm run build```

On the server install pm2, you can check if it's already installed with the command ```pm2 -v```.

```npm install pm2```

And install express

``` npm install express```

Now you can use the script runBuild.js to setup a webserver. Place the script in the same directory as the build directory, like this:

- runBuild.js
- {build}
- - asset-manifest.json
- - index.html
- - manifest.json
- - {static}

When you're done, make sure to run the following command to create the necessary pages:

``` npm run-script build```

Give your new background process a name and point it to the file it should run, in this case the express script that runs the site on port 8080. Don't forget to set up an nginx proxy or reroute port 80 traffic to whatever port you are using. 

```pm2 start --name beholder runBuild.js```

Check to see if it's online with:
```pm2 ls```

You can stop the process using ```pm2 stop beholder``` and start it using ```pm2 start beholder```.

Now visit the IP address of your server in a web browser, like this: http://45.63.105.137:8080/  and your Lisk Beholder should be available. 

This project is based on the lisk-mini-explorer by Korben3: https://github.com/Korben3/lisk-mini-explorer
