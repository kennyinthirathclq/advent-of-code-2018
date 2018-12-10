const setOne = (input) => {
  // N
  const checksum = input.reduce((acc, serial) => {
    const counter = [false, false]

    // 2N
    const counted = serial
      .split('')
      .reduce((acc, char) => ({...acc, [char]: acc[char] ? acc[char] + 1 : 1 }), {})

    // N
    Object
      .values(counted)
      .forEach(val => {
        if(val === 2)
          counter[0] = true
        else if(val === 3)
          counter[1] = true
      })

    return [
      acc[0] + counter[0], 
      acc[1] + counter[1]
    ]
  }, [0 ,0])

  const [two, three] = checksum
  return two * three
}
// 4N runtime


const setTwo = (input) => {
  const compare = (a, b) => {
    let variance = []    
    
    a.forEach((char, idx) => char !== b[idx] && variance.push(idx))
    
    return variance
  }
  
  const sorted = input.sort((a,b) => a.localeCompare(b))
  
  // Sorted comparisons don't work when the first and last chars are the variance
  return sorted.reduce((acc, serial, idx, arr) => {
    const nextSerial = arr[idx+1]

    if(!nextSerial)
      return acc

    const variance = compare(serial.split(''), nextSerial.split(''))

    if(variance.length === 1) {
      const split = serial.split('')
      return [...split.slice(0, variance[0]), ...split.slice(variance[0]+1, split.length)].join('')
    }

    return acc
  }, null)
}

module.exports = {
  setOne,
  setTwo
}