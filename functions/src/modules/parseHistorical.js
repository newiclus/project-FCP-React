module.exports = (agencies, historicalData, month, year) => {
  const jsonHistorical = {};

  const months = {
    "01": { _id: 1, name: "enero" },
    "02": { _id: 2, name: "febrero" },
    "03": { _id: 3, name: "marzo" },
    "04": { _id: 4, name: "abril" },
    "05": { _id: 5, name: "mayo" },
    "06": { _id: 6, name: "junio" },
    "07": { _id: 7, name: "julio" },
    "08": { _id: 8, name: "agosto" },
    "09": { _id: 9, name: "setiembre" },
    "10": { _id: 10, name: "octubre" },
    "11": { _id: 11, name: "noviembre" },
    "12": { _id: 12, name: "diciembre" }
  }

  const buildHistorical = (monthR, currentHistorical) => {
    const currentMonth = months[monthR].name;
    const _id = months[monthR]._id;

    return {
      agency: {
        effectiveness: currentHistorical.efectivity,
        goal: currentHistorical.goal,
        microinsurance: currentHistorical.total_insurances,
        month: currentMonth,
        num_month: _id
      },
      business: {
        effectiveness: currentHistorical.efectivity,
        goal: currentHistorical.goal,
        microinsurance: currentHistorical.total_insurances,
        month: currentMonth,
        num_month: _id
      },
      support: {
        effectiveness: currentHistorical.support_effectivity,
        goal: currentHistorical.support_goal,
        month: currentMonth,
        num_month: _id
      }
    }
  }

  const listHistorical = historicalData.docs.map(
    doc => Object.assign({}, { id: doc.id }, doc.data())
  )

  Object.keys(agencies).forEach(code => {
    const agency = listHistorical.filter(item => item.id === code)[0];
    const monthHistorical = buildHistorical(month, agencies[code]);

    if (agency) {
      const agencyHistorical = agency[year] ? agency[year].agency : [];
      const businessHistorical = agency[year] ? agency[year].business : [];
      const support = agency[year] ? agency[year].support : [];

      agencyHistorical.push(monthHistorical.agency);      
      businessHistorical.push(monthHistorical.business);
      support.push(monthHistorical.support);

      jsonHistorical[code] = {
        [year]: {
          agency: agencyHistorical,
          business: businessHistorical,
          support: support
        },
        __collections__: {}
      }
    } else {
      jsonHistorical[code] = {
        [year]: {
          agency: [monthHistorical.agency],
          business: [monthHistorical.business],
          support: [monthHistorical.support]
        },
        __collections__: {}
      }
    }
  })

  return jsonHistorical;
};
