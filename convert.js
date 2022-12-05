var showdown  = require('showdown');
var fs = require('fs');
let filename = "README.md"
let pageTitle = process.argv[2] || ""
let plausibleDomain = process.argv[3] || ""

fs.readFile(__dirname + '/style.css', function (err, styleData) {
  fs.readFile(process.cwd() + '/' + filename, function (err, data) {
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

    var preContent = `
    <html>
      <head>
        <title>` + pageTitle + `</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">`

    if (plausibleDomain.length > 0) {
      preContent += `
        <script defer data-domain="` + plausibleDomain + `" src="https://plausible.io/js/script.js"></script>
      `
    }
    preContent += `
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

    let filePath = process.cwd() + "/README.html";
    fs.writeFile(filePath, html, { flag: "wx" }, function(err) {
      if (err) {
        console.log("File '" + filePath + "' already exists. Aborted!");
      } else {
        console.log("Done, saved to " + filePath);
      }
    });
  });
});
