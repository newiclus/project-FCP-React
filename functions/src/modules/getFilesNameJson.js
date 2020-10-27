const path = require('path');
const { join } = path;

/**
 * @function {getFilesNameJson}
 * Description. This function get files path json from the bucket and also the filespath in temp folder
 * @param  {string} month      Month of document
 * @param  {string} year       Year of document
 * @param  {string} tempFolder Name of folder to save the json reports
 * @return {{bucket_files: string, temp_files: string}} files - Pathfiles of bucket and temp
 */
module.exports = (month, year, tempFolder) => {
  const numMonth = parseInt(month);
  const numYear = parseInt(year);
  const FOLDER_BUCKET = "assessors_reports/";

  const bucketFilesName = [];
  const tempFilesName = [];

  [1,2].forEach(num => {
    let strMont = (numMonth - num);
    let strYear = numYear;

    if (strMont <= 0) {
      strMont = (numMonth + 12) - num;
      strYear = (numYear - 1);
    }

    let monthWithZero = ('0' + strMont).slice(-2);
    let fileName = strYear+'_'+monthWithZero+'.json';

    tempFilesName.push(join(tempFolder, fileName));
    bucketFilesName.push(FOLDER_BUCKET+fileName);
  })

  return {
    bucket_files: bucketFilesName,
    temp_files: tempFilesName
  }
}