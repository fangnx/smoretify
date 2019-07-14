/**
 * react-then-electron.js
 *
 * @author nxxinf
 * @github https://github.com/fangnx
 * @created 2019-06-15 17:05:42
 * @last-modified 2019-07-14 15:34:53
 */

const net = require('net');
const port = process.env.PORT ? process.env.PORT - 100 : 3000;

process.env.ELECTRON_START_URL = `http://localhost:${port}`;

const client = new net.Socket();

let startedElectron = false;
const tryConnection = () =>
  client.connect({ port: port }, () => {
    client.end();
    if (!startedElectron) {
      console.log('starting electron');
      startedElectron = true;
      const exec = require('child_process').exec;
      exec('npm run electron');
    }
  });

tryConnection();

client.on('error', error => {
  setTimeout(tryConnection, 1000);
});
