const yargs = require('yargs')
const argv = yargs
    .usage('Usage: $0 --input [inputFile] --output [outputFile] --title [title]')
    .demandOption(['input','output'])
    .argv

var showdown  = require('showdown');
var fs = require('fs');


let filename = argv.input || "README.md"
let outFilename = argv.output || process.cwd() + "README.html"
let pageTitle = argv.title || ""


fs.readFile(__dirname + '/style.css', function (err, styleData) {
  fs.readFile(filename, function (err, data) {
    if (err) {
      throw err; 
    }
    let text = data.toString();

    converter = new showdown.Converter({
      ghCompatibleHeaderId: true,
      simpleLineBreaks: true,
      ghMentions: true,
      tables: true
    });

    let preContent = `
    <html>
      <head>
        <title>` + pageTitle + `</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
      </head>
      <body>
        <div id='content'>
    `

    let postContent = `

        </div>
        <style type='text/css'>` + styleData + `</style>
      </body>
    </html>`;

    html = preContent + converter.makeHtml(text) + postContent

    converter.setFlavor('github');
    console.log(html);

    fs.writeFile(outFilename, html, { flag: "wx" }, function(err) {
      if (err) {
        console.log("File '" + outFilename + "' already exists. Aborted!");
      } else {
        console.log("Done, saved to " + outFilename);
      }
    });
  });
});
