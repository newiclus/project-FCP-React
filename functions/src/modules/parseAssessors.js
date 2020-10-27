/**
 * 
 * @function parseAssessors
 * @param {raw} assessors RawExcelData
 * @param {array} agencies  Array of objects
 */
module.exports = (assessors, agencies, isEndMonth, premadeThreeMonths) => {
  const assessorsArr = {};
  const leadersArr = {};
  const historicalArr = {};

  const calcEffectiveness = (insurance, disbursements) => {
    const calc = insurance/disbursements;

    if (Number.isNaN(calc) || calc === Infinity) {
      return 0;
    }
    return calc;
  }

  const parseEffectiveness = (effectiveness) => {
    const result = parseFloat(effectiveness)

    if (Number.isNaN(result)) {
      return 0;
    }
    return result;
  }

  const getAgencyEffectiviness = (codAgency) => {
    const arrAgencies = Object.keys(agencies);
    const idResult = arrAgencies.filter((id) => agencies[id].code === codAgency);

    return agencies[idResult].efectivity;
  }

  const validateTypeForce = (cell) => {
    if (cell) {
      return (cell).replace('F. ', '');
    }
    return "N.A";
  }

  
  for (let i = 0; i < assessors.length; i++) {
    const row = assessors[i]
    const cargo = row[9];

    if (i > 0 && cargo !== undefined) {
      const code = row[2];
      const agency = row[7];
      const total_mandatory = Number.parseInt(row[18]);
      const total_insurances = Number.parseInt(row[19])
      
      if ( cargo.indexOf("ASESOR") === 0 || cargo.indexOf("EJECUTIVO") === 0  ) {
        
        const assessor = {
          agency: agency,
          cargo: cargo,
          code: code,
          disbursements: row[20],
          efectivity: parseEffectiveness(row[21]),
          efectivity_bussiness: calcEffectiveness(row[16], row[20]),
          efectivity_family: calcEffectiveness(row[11], row[20]),
          efectivity_onco: calcEffectiveness(row[14], row[20]),
          efectivity_protection: calcEffectiveness(row[17], row[20]),
          efectivity_total: getAgencyEffectiviness(row[7]),
          force: validateTypeForce(row[0]),
          leader: false,
          name: row[3],
          region: (row[5]).trim(),
          sales_business: row[16],
          sales_family: row[11],
          sales_onco: row[14],
          sales_protection: row[17],
          territory: row[4],
          total_mandatory: total_mandatory,
          total_insurances: total_insurances,
          updatedAt: (row[10]).toJSON(),
          zone: row[6],
          __collections__: {}
        }

        const _id = agency+'-'+code;

        // calc threemonthEfectivity
        if (isEndMonth === "true") {
          const threeMonths = premadeThreeMonths.assessors;
          const accumulatedDis = threeMonths[_id] ? threeMonths[_id].disbursements : 0
          const accumulatedIns = threeMonths[_id] ? threeMonths[_id].total_insurances : 0
          const accumulatedMan = threeMonths[_id] ? threeMonths[_id].total_mandatory : 0

          const threeDisburs = accumulatedDis + row[20];
          const threeInsurances = (accumulatedIns + accumulatedMan) + (total_insurances + total_mandatory);
          const threemonthEfectivity = calcEffectiveness(threeInsurances, threeDisburs)

          assessor.threemonthEfectivity = threemonthEfectivity;
        }

        assessorsArr[_id] = assessor;

        // For historical
        historicalArr[_id] = {
          disbursements: row[20],
          efectivity: parseEffectiveness(row[21]),
          total_mandatory: row[18],
          total_insurances: row[19]
        }
      }

      if ( (cargo.indexOf("JEFE DE NEGOCIOS") === 0 || cargo.indexOf("GERENTE") === 0) && cargo.indexOf("(E)") === -1 ) {
        
        const leader = {
          agency: row[7],
          cargo: cargo,
          code: row[2],
          efectivity: parseEffectiveness(row[21]),
          leader: true,
          name: row[3],
          updatedAt: (row[10]).toJSON(),
          __collections__: {}
        }
        
        leadersArr[agency+'-'+code] = leader;
      }
    }
  }

  return {
    business: assessorsArr,
    leaders: leadersArr,
    historical: historicalArr
  };
}