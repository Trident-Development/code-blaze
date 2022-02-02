const { exec } = require("child_process");

const executePy = (filepath) => {
  // executes python file by using exec command
  console.log('I GOT LOGGED!!');
  return new Promise((resolve, reject) => {
    exec(
      `python3 ${filepath}`,
      (error, stdout, stderr) => {
        error && reject({ error, stderr });
        stderr && reject(stderr);
        resolve(stdout);
      }
    );
  });
};

module.exports = {
  executePy,
};