module.exports = (agencies, isEndMonth, premadeThreeMonths) => {
  const agenciesArr = {};
  const historicalArr = {};

  const calcEffectiveness = (effectiveness) => {
    const calc = effectiveness/3;

    if (Number.isNaN(calc) || calc === Infinity) {
      return 0;
    }
    return calc;
  }

  const parseNumber = (cell) => {
    const num = parseFloat(cell)
    if (!cell || Number.isNaN(num)) {
      return 0;
    }
    return num;
  }
  
  for (let i = 0; i < agencies.length; i++) {
    const row = agencies[i];
    const code = row[3];

    if (i > 0 && code !== undefined) {
      const agency = {
        code: code,
        disbursements: row[7],
        efectivity: parseNumber(row[9]),
        meta: {
          avance: {
            goal: row[10],
            progress: parseNumber(row[8])
          },
          support: {
            goal: row[30],
            progress: row[31],
          }
        },
        name: row[4],
        region: (row[1]).trim(),
        sales_business: row[17],
        sales_family: row[15],
        sales_onco: row[19],
        sales_protection: row[18],
        territory: row[0],
        total_insurances: row[6],  
        zone: row[2],
        __collections__: {}
      };

      // calc threemonthEfectivity
      if (isEndMonth === "true") {
        const threeMonths = premadeThreeMonths.agencies;
        const threeEffectiveness = threeMonths[code].efectivity + parseNumber(row[9]);

        agency.threemonthEfectivity = calcEffectiveness(threeEffectiveness);
      }

      agenciesArr[code] = agency;

      historicalArr[code] = {
        disbursements: row[7],
        total_insurances: row[6],
        efectivity: parseNumber(row[9]),
        goal: row[10],
        support_effectivity: row[31],
        support_goal: row[30]
      }
    }
  }

  return {
    business: agenciesArr,
    historical: historicalArr
  };
}
