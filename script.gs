function doGet(){
return HtmlService.createHtmlOutputFromFile('index');
}




function main(action,inputA,inputB, inputC) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  
  
 /* if (action == "geocode"){
    var end = [];
    var data = Maps.newGeocoder.geocode(inputA);
    for (var i = 0; i < data.results.length; i++){
      
     var parsedData = data.results[i];
      end[i] = parsedData.geometry.location.lat;
      end[i + 1] = parsedData.geometry.location.lng;
    }
    
    return end;
    
  } */
  
  
  if (action == "sign"){
    
    sheet.appendRow(["",inputA,inputB,inputC]);

  }
  
  
  
  
  
}


