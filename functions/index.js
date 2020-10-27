const path = require('path');
const os = require('os');
const fs = require("fs-extra");
// The Firebase Admin SDK to access the Firebase Services.
const admin = require('firebase-admin');
admin.initializeApp();
const functions = require('firebase-functions');
const xlsx = require('node-xlsx');
const fbImport = require('node-firestore-import-export');

const getFilesNameJSON = require('./src/modules/getFilesNameJson');
const generateThreeMonth = require('./src/modules/generateThreeMonth');
const parseAgencies = require('./src/modules/parseAgencies');
const parseAssessors = require('./src/modules/parseAssessors');
const parseHistorical = require('./src/modules/parseHistorical');

const firestoreImport = fbImport.firestoreImport;
const { tmpdir } = os;
const { join, dirname } = path;


exports.generateJSON = functions.storage.object().onFinalize(async (object) => {
  const fileBucket = object.bucket; // The Storage bucket that contains the excel file.
  const filePath = object.name; // File path in the bucket.
  const contentType = object.contentType; // File content type.
  const fileName = path.basename(filePath);

  if ( !contentType.match(/(vnd.openxmlformats-officedocument|vnd.ms-excel)/g) ) {
    return console.log('This is not excel file.');
  }

  if (fileName.match(/application\/json/g)) {
    return console.log('Already a JSON.');
  }


  // Download file from bucket.
  const bucket = admin.storage().bucket(fileBucket);
  const workingDir = join(tmpdir(), "_json_");
  const tempFilePath = join(workingDir, fileName);

  // 1. Ensure JSON dir exists
  await fs.ensureDir(workingDir);

  // 2. Save the excel file to the temp folder
  await bucket.file(filePath).download({ destination: tempFilePath });
  const objMetadata = await bucket.file(filePath).getMetadata();
  const customMetas = objMetadata[0].metadata;

  // 3. Read the excel file and process it
  const workBook = xlsx.parse(tempFilePath, { cellDates: true });
  const json = {};
 
  let agencies = {};
  let assessors = {};
  let premadeThreeMonths = {};
  const collectionHistorical = admin.firestore().collection('historical');

    // 3.1 If End of month then process the 3 month before reports
    if (customMetas.endMonth === "true") {
      const jsonFiles = getFilesNameJSON(customMetas.month, customMetas.year, workingDir);

      await bucket.file(jsonFiles.bucket_files[0]).download({ destination: jsonFiles.temp_files[0] });
      await bucket.file(jsonFiles.bucket_files[1]).download({ destination: jsonFiles.temp_files[1] });

      premadeThreeMonths = generateThreeMonth(jsonFiles.temp_files);
    }
 

  //  Looping through all sheets
  workBook.forEach((sheet, index) => {
    if (index === 4) {
      agencies = parseAgencies(sheet['data'], customMetas.endMonth, premadeThreeMonths)
    }
  })

  workBook.forEach((sheet, index) => {
    if (index === 3) {
      assessors = parseAssessors(sheet['data'], agencies.business, customMetas.endMonth, premadeThreeMonths)
    }
  })

  json.agencies = agencies.business;
  json.assessors = assessors.business;
  json.leaders = assessors.leaders;


  // 4. Import data from Raw-JSON to Firebase
  const collectionAssessors = admin.firestore().collection('users');
  const collectionLeaders = admin.firestore().collection('leaders');
  const collectionAgencies = admin.firestore().collection('agencies');

  const Assesors = Object.keys(json.assessors).length;
  const Leaders = Object.keys(json.leaders).length;
  const Agencies = Object.keys(json.agencies).length;
  
  const promiseArr = [
    firestoreImport(json.assessors, collectionAssessors, true),
    firestoreImport(json.leaders, collectionLeaders, true),
    firestoreImport(json.agencies, collectionAgencies, true),
  ];

  // Save the agencies historical
  if (customMetas.endMonth === "true") {
    const currentHistorical = await collectionHistorical.get();
    const historical = parseHistorical(
      agencies.historical,
      currentHistorical,
      customMetas.month,
      customMetas.year
    );
    promiseArr.push( firestoreImport(historical, collectionHistorical, true) );
  }

  await Promise.all(promiseArr)
  .then(() => {
    console.log('Assesors was imported: ' + Assesors + ' registers.');
    console.log('Leaders was imported: ' + Leaders + ' registers.');
    console.log('Agencies was imported: ' + Agencies + ' registers.');
  })
  .catch(error => {
    console.log(error);
  });
 
  

  // 5. Create JSON file
  const jsonFileName = customMetas.endMonth ? 
    customMetas.year+'_'+customMetas.month+'.json' : 
    fileName.replace(/.xlsx|.xls/, '.json');
    
  const jsonTmpFilePath = path.join(workingDir, jsonFileName);
  const jsonFilePath = path.join(dirname(filePath), jsonFileName);
  const metadata = { contentType: "application/json" };
  const writeStr = JSON.stringify({ 
    assessors: assessors.historical,
    agencies: agencies.historical
  });

  await fs.writeFile(jsonTmpFilePath, writeStr, function(err) {
    if (err) {
      return console.log(err);
    }
    return console.log(jsonFileName + " was saved in the current directory!");
  });

  // 6. Delete excel file
  const excelRef = bucket.file(filePath);
  await excelRef.delete();

  // 7. Uploading the JSON file if the excel is end of month.
  if (customMetas.endMonth && customMetas.endMonth === "true") {
    await bucket.upload(jsonTmpFilePath, {
      destination: jsonFilePath,
      metadata: metadata,
    });
  }

  return fs.remove(workingDir)
    .then(() => {
      console.log('Success function');
    })
    .catch(err => {
      console.error(err);
    });
});
