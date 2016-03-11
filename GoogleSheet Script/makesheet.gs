function onOpen() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var entries = [{
    name : "iOS Resource sheet",
    functionName : "iOSSheet"
  }, {
    name : "Android Resource sheet",
    functionName : "AndroidSheet"
  }];
  sheet.addMenu("리소스 만들기", entries);
};


function AndroidSheet(){
  var FileName = SpreadsheetApp.getActiveSpreadsheet().getName()+"_and";
  var files = DriveApp.getFilesByName(FileName);
  
  var sheet;
  // Check we found a sheet with the name
  while (files.hasNext()){
    sheet = files.next();
    if(sheet.getName() == FileName){
      Logger.log("Opened Sheet: " + FileName);
      return makeAndroidResource(sheet.getId());
    }
  }
  
  // We didn't find the file, so create it.
  sheet = SpreadsheetApp.create(FileName);
  Logger.log("Created new Sheet for: " + FileName);
  
  
  return makeAndroidResource(sheet.getId());
  
}

function iOSSheet(){
  var FileName = SpreadsheetApp.getActiveSpreadsheet().getName()+"_iOS";
  var files = DriveApp.getFilesByName(FileName);
  
  var sheet;
  // Check we found a sheet with the name
  while (files.hasNext()){
    sheet = files.next();
    if(sheet.getName() == FileName){
      Logger.log("Opened Sheet: " + FileName);
      return makeiOSResource(sheet.getId());
    }
  }
  
  // We didn't find the file, so create it.
  sheet = SpreadsheetApp.create(FileName);
  Logger.log("Created new Sheet for: " + FileName);
  
  
  return makeiOSResource(sheet.getId());
  
}

function makeAndroidResource(fileId){  
  // Get Spreadsheets
  var SourceSpreadSheet = SpreadsheetApp.getActiveSpreadsheet();
  var Targetspreadsheet = SpreadsheetApp.openById(fileId); //새로운 파일
  // Set Sheets
  var SourceSheet = SourceSpreadSheet.getSheets()[0];
  var TargetSheet  = Targetspreadsheet.getSheets()[0];
  
  TargetSheet.clear();
  
  // Get Source last row
  var last_row = SourceSpreadSheet.getLastRow();

  // Set Ranges
  var source_range = SourceSpreadSheet.getRange("A1:C"+last_row);
  var target_range = Targetspreadsheet.getRange("A1:C"+last_row);
  // 안드로이드 키 값
  var source_key_range = SourceSpreadSheet.getRange("E1:E"+last_row);
  var target_key_range = Targetspreadsheet.getRange("D1:D"+last_row);
  
  // Fetch values
  var values = source_range.getValues();
  var key_values = source_key_range.getValues();
  
  // Save to spreadsheet
  target_range.setValues(values);
  target_key_range.setValues(key_values);
  
}

function makeiOSResource(fileId){  
  // Get Spreadsheets
  var SourceSpreadSheet = SpreadsheetApp.getActiveSpreadsheet();
  var Targetspreadsheet = SpreadsheetApp.openById(fileId); //새로운 파일
  // Set Sheets
  var SourceSheet = SourceSpreadSheet.getSheets()[0];
  var TargetSheet  = Targetspreadsheet.getSheets()[0];
  
  TargetSheet.clear();
  
  // Get Source last row
  var last_row = SourceSpreadSheet.getLastRow();

  // Set Ranges
  var source_range = SourceSpreadSheet.getRange("A1:C"+last_row);
  var target_range = Targetspreadsheet.getRange("A1:C"+last_row);
  // ios 키 값
  var source_key_range = SourceSpreadSheet.getRange("D1:D"+last_row);
  var target_key_range = Targetspreadsheet.getRange("D1:D"+last_row);
  
  // Fetch values
  var values = source_range.getValues();
  var key_values = source_key_range.getValues();
  
  //ignore header
  for(var i=1; i< values.length; i++){
    values[i][0] = "\""+key_values[i]+"\"=\""+ values[i][0] +"\";";
    values[i][1] = "\""+key_values[i]+"\"=\""+ values[i][1] +"\";";
    values[i][2] = "\""+key_values[i]+"\"=\""+ values[i][2] +"\";";        
  }
  
  
  // Save to spreadsheet 
  target_range.setValues(values);
  //target_key_range.setValues(key_values);
  
}