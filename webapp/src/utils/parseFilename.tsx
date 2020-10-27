const parseFilename = (filename: string) => {
  if (filename && filename !== '') {
    const traces = filename.split(' ').filter(item => item !== '-')
    const composeName = traces.reduce((start, next) => `${start}_${next}`)
    const composeDate = (traces.filter(item => parseInt(item))[0])
    const month = composeDate.slice(2,4)
    const year = composeDate.slice(4,6)

    return {
      name: composeName,
      month,
      year
    }
  }

  throw Error('Missing the filename param...')
}

export default parseFilename