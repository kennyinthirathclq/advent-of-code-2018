/**
 * We need to find the guard that sleeps the most
 * We need to find the minute which they sleep the most as well
 * 
 * They fall asleep on the minute (inclusive)
 * They wake up off the minute (exclusive aka -1)
 * 
 * All times are during the midnight hour
 * 
 * 1. We should sort the timestamps to analyze in chronological order O(n lgn)
 *  1a. We need to parse the row into a date sortable array
 * 
 * 2. We need to keep a running track of the guard, when they sleep and at what time most likely
 *  2a. TOTAL_MINUTES_SLEPT
 *  2b. MAX(TOTAL_MINUTES_SLEPT)
 *
 * 3. guard = {
 *     [0 - 60] : each minute
 *     total_minutes : minutes
 *   } 
 * 
 * Assumptions
 *  Timestamp will always have the same length
 *  Assume the first entry is a begins shift
 *  If a guard falls asleep, assume it is first
 * 
 *  Parse
 *    1. Convert timestamp to unix time
 *    2. 1 Guard per shift
 *    3. determine action
 * 
 */
const setOne = (input) => {

  const parseLogEntry = (entry) => {
    const [ timestamp, action ] = entry.split('] ')
    const time = timestamp.slice(1)
    const event = action.length === 12
      ? 0
      : action.length === 8
        ? 1
        : action
            .split(' ')[1]
            .slice(1)

    return {
      time,
      event
    }
  }

  const parsedLogs = input.map(parseLogEntry)
  const sortedLogs = [...parsedLogs].sort((a, b) => a.time.localeCompare(b.time))

  console.log(input[0])
  console.log(parsedLogs[0])
  console.log(sortedLogs[0])


  // console.log(sortedLogs[0])

  const analysis = sortedLogs.reduce((acc, log, idx, arr) => {
    if(log.event.substr)
      return {...acc, 
        [log.event]: acc[log.event] || { total: 0, minutes: Array.from({length: 60}, _ => 0)}, 
        currentGuard: [log.event]
    }

    if(log.event === 1) {
      const sleptTime = new Date(arr[idx-1].time).getMinutes()
      const wakeTime = new Date(log.time).getMinutes()

      for(let t = sleptTime; t < wakeTime; t++) {
        acc[acc.currentGuard].minutes[t] = acc[acc.currentGuard].minutes[t]+1
      }

      acc[acc.currentGuard].total = acc[acc.currentGuard].total + wakeTime - sleptTime
      
      return acc
    }

    return acc
  }, { currentGuard: '' })

  const {currentGuard, ...guards} = analysis 

  const sorted = Object
    .entries(guards)
    .sort((a,b) => b[1].total - a[1].total)
    
  // Pick first guard
  // Pick highest minute
    
}

/**
 * Same as problem one but keep track of a max count
 */
const setTwo = () => {

  const parseLogEntry = (entry) => {
    const [ timestamp, action ] = entry.split('] ')
    const time = timestamp.slice(1)
    const event = action.length === 12
      ? 0
      : action.length === 8
        ? 1
        : action
            .split(' ')[1]
            .slice(1)

    return {
      time,
      event
    }
  }

  const parsedLogs = input.map(parseLogEntry)
  const sortedLogs = [...parsedLogs].sort((a, b) => a.time.localeCompare(b.time))

  console.log(input[0])
  console.log(parsedLogs[0])
  console.log(sortedLogs[0])


  let freqMin = null
  let freqMatch = { guard: null, minute: null}

  const analysis = sortedLogs.reduce((acc, log, idx, arr) => {
    if(log.event.substr)
      return {...acc, 
        [log.event]: acc[log.event] || { total: 0, minutes: Array.from({length: 60}, _ => 0)}, 
        currentGuard: [log.event]
    }

    if(log.event === 1) {
      const sleptTime = new Date(arr[idx-1].time).getMinutes()
      const wakeTime = new Date(log.time).getMinutes()

      for(let t = sleptTime; t < wakeTime; t++) {
        acc[acc.currentGuard].minutes[t] = acc[acc.currentGuard].minutes[t]+1

        if(acc[acc.currentGuard].minutes[t] > freqMin) {
          freqMin = acc[acc.currentGuard].minutes[t]
          freqMatch = { guard: acc.currentGuard, minute: t}
        }
      }

      acc[acc.currentGuard].total = acc[acc.currentGuard].total + wakeTime - sleptTime
      
      return acc
    }

    return acc
  }, { currentGuard: '' })

  const {currentGuard, ...guards} = analysis 
    
  console.log(freqMatch)
}

module.exports = {
  setOne,
  setTwo
}