const fs = require("fs-extra");

module.exports = (tempFilesPath) => {
  const rawSecondMonth = fs.readFileSync(tempFilesPath[0]);
  const rawThridMonth = fs.readFileSync(tempFilesPath[1]);

  const secondMonth = JSON.parse(rawSecondMonth);
  const thridMonth = JSON.parse(rawThridMonth);

  const agenciesSecond = secondMonth.agencies;
  const agenciesThird = thridMonth.agencies;

  const assessorsSecond = secondMonth.assessors;
  const assessorsThird = thridMonth.assessors;

  const premadeAgencies = {}
  const premadeAssessors = {}

  Object.keys(assessorsThird).forEach((key) => {
    if (assessorsSecond[key]) {
      premadeAssessors[key] = {
        disbursements: (assessorsThird[key].disbursements + assessorsSecond[key].disbursements),
        total_insurances: (assessorsThird[key].total_insurances + assessorsSecond[key].total_insurances),
        total_mandatory: (assessorsThird[key].total_mandatory + assessorsSecond[key].total_mandatory)
      }
    } else {
      premadeAssessors[key] = assessorsThird[key]
    }
  })

  Object.keys(agenciesThird).forEach((key) => {
    if (agenciesSecond[key]) {
      premadeAgencies[key] = {
        efectivity: (agenciesThird[key].efectivity + agenciesSecond[key].efectivity)
      }
    } else {
      premadeAgencies[key] = agenciesThird[key]
    }
  })

  return {
    assessors: premadeAssessors,
    agencies: premadeAgencies,
  }
}