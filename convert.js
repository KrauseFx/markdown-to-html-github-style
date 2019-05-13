var showdown  = require('showdown');
var fs = require('fs');
let filename = "README.md"

fs.readFile(__dirname + '/style.css', function (err, styleData) {
  fs.readFile(__dirname + '/' + filename, function (err, data) {
    if (err) {
      throw err; 
    }
    let text = data.toString();

    converter = new showdown.Converter({
      ghCompatibleHeaderId: true,
      simpleLineBreaks: true,
      ghMentions: true,
    });

    let preContent = "<html><body>"
    let postContent = "<style type='text/css'>" + styleData + "</style></body></html>";

    html = preContent + converter.makeHtml(text) + "\n" + postContent

    converter.setFlavor('github');
    console.log(html);

    let filePath = __dirname + "/output.html";
    fs.writeFile(filePath, html, function(err) { 
      console.log("Done, saved to " + filePath);
    }); 
  });
});
