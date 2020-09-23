const args = process.argv.slice(2);
const url = args[0];
const filePath = args[1];

const request = require('request');
const fs = require('fs');
const readline = require('readline');
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

request(url,(error, response, body) => {
  if (error) {
    console.log(`URL Error: \n`,error);
    process.exit();
  } else if(response.statusCode !== 200) {
    console.log(`Response Error:`, response.statusCode);
    process.exit();
  }
fs.access(filePath, (error) => {
  if (!error) {
    rl.question("File already exists. If you want to overwrite please press Y followed by enter \n",(answer) => {
      if (answer === 'Y') {
        writeFile(body);
      } else {
        console.log("File will not be over written");
        process.exit();
      }
    })
  } else {
    writeFile(body);
  }

});

// writeFile(body); 
});
const writeFile = function(response) {

  fs.writeFile(filePath,response,'utf8', (error) => {
    if (!error) {
      const length = response.length;
      console.log(`Downloaded and saved ${length}  bytes to ${filePath}`);
      process.exit();
    } else {
      console.log(`File Path doesnot exist \n `,error);
      process.exit();
  };
  }); 
};

