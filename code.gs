var webhook = "Discord Webhook link";
var title = "Choose the title of the Embed";

function embedSubmit(e) {
  var form = FormApp.getActiveForm();
  var allResponses = form.getResponses();
  var latestResponse = allResponses[allResponses.length - 1];
  var response = latestResponse.getItemResponses();
  var items = [];

  for (var i = 0; i < response.length; i++) {
    var question = response[i].getItem().getTitle();
    var answer = response[i].getResponse();
    var parts = answer.match(/[\s\S]{1,1024}/g) || [];

    if (answer == "") continue;
    for (var j = 0; j < parts.length; j++) {
      if (j == 0) {
        items.push({ "name": question, "value": parts[j], "inline": false });
      } else {
        items.push({ "name": question.concat(" (cont.)"), "value": parts[j], "inline": false });
      }
    }
  }
  
  if(!title) title = "Type of Data"

  var options = {"method": "post", "headers": { "Content-Type": "application/json"}, muteHttpExceptions: true, "payload": JSON.stringify({ "embeds": [{
    
    "title": title, "color": 191970,
    "fields": items, "timestamp": new Date().toISOString(),
    
  }]})};
  UrlFetchApp.fetch(webhook, options);
};
