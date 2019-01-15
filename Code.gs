function sendSms(smsMessageX,num) {
  // Get account SID and auth token here:
  //   https://www.twilio.com/user/account
  var accountSid = "************************************************************";
  var authToken = "*******************************************************************";
  var url = "https://api.twilio.com/2010-04-01/Accounts/" + accountSid + "/SMS/Messages.json";
  var realNum = "+" + num
  var options = {
    method: "post",
    headers: {
      Authorization: "Basic " + Utilities.base64Encode(accountSid + ":" + authToken)
    },
    payload: {
      // From is one of your Twilio phone numbers
      From: "+17344158607",
      To: realNum,
      Body: smsMessageX,
    }
  };
  var response = UrlFetchApp.fetch(url, options);
  
}




function output(value,a) {
  var message = "none";
  if (value == "rain"){
    message = "Its raining now, time to turn off the sprinkler!";  
  }
  else{
   message = "It stopped raining, so turn the sprinklers back tomorrow";  
  }
console.log("YEP");
 sendSms(message,a);
}


function getWeather(){
  //variables for creating loop
  var loop = 2;
  var go = 1;
  
  
  
  
  
  while (go == 1){

  //create a variable for sheet and get data from sheet
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var oldValue = sheet.getRange("A" + loop).getValue();
    if (oldValue == ""){
      go = 0;
    }
    
    
    
    if (go == 1){
   //get phone number to pass as param to output() 
  var phoneNum = sheet.getRange("B" + loop).getValue();
  
  //get data from Dark Sky API and lat and lon params from sheet
  var latitude = sheet.getRange("C" + loop).getValue(); 
  var longitude = sheet.getRange("D" + loop).getValue();  
  var url = "https://api.darksky.net/forecast/c65e6521074597abb74206c177ba547c/" + latitude + "," + longitude;
  var response = UrlFetchApp.fetch(url);
  var rawJson = response.getContentText();
  var json = JSON.parse(rawJson);
  var final = json.currently.icon;
  
  
  
  //ouput text function if needed
  if (final != "rain" && final != "snow" && final != "sleet" ){
    if (oldValue == "rain" || oldValue == "snow" || oldValue == "sleet"){
      output("no rain",phoneNum);
    }
    sheet.getRange("A" + loop).setValue(final);
  }
  else if (final == "rain" || final == "snow" || final == "sleet" ){
    if (oldValue != "rain" && oldValue != "snow" && oldValue != "sleet"){
      output("rain",phoneNum); 
    }
    sheet.getRange("A" + loop).setValue(final);
  }
  
    }
    
    
  //loop + 1 to continue to next row
    
   loop = loop + 1;
    
    
  }
  
  
  
  
  
  
  
}











 
 
