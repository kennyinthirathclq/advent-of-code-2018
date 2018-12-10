/**
 * At least a 1000x1000 grid
 * Each claim has
 *  - an ID
 *  - a distance from the top and left edge
 *  - WxL 
 * 
 * How many inches (x,y coord) overlap from each claim ?
 * 
 * Considerations
 *  - Do all claims fall within the grid boundaries
 *  - Is there a max W || L on the claim
 *  - Do we need to keep track of which space is claimed by an ID?
 *   - For overlapping claims, do we want a list of IDs?
 * 
 */


const setOne = (input) => {
  // Keep a running count of sq inches overlapped
  let overlapping = 0
  
  // Create an array of 1000x1000
  let fabric = Array.from(
    {length: 1000},
    _ => Array.from({length: 1000}, _ => 0)
  )

  const parseClaim = (rawClaim) => {
    // Assume the each input is valid
    const [rawId, rawAt, rawCoordinate, rawSize] = rawClaim.split(' ')

    const id = rawId.slice(1)
    const [startX, startY] = rawCoordinate
      .slice(0, -1)
      .split(',')
      .map(coord => ~~coord)
    const [width, height] = rawSize
      .split('x')
      .map(coord => ~~coord)
    
    return {
      id,
      startX,
      startY,
      width,
      height
    }
  }

  const markClaim = (fabric, claim) => {
    for(let x = claim.startX; x < claim.startX+claim.width; x++) {
      for(let y = claim.startY; y < claim.startY+claim.height; y++ ) {
        if(fabric[x][y] === 1)
          overlapping++

        fabric[x][y] = fabric[x][y] + 1
      }
    }
  }
  
  input.forEach(claim => {
    const parsed = parseClaim(claim)
    markClaim(fabric, parsed)
  })
  
  return overlapping
}


/**
 * 
 * Find an ID that does not overlap
 * So to modify the original algorithm we need to keep track of IDs instead of counts
 * We can modify it to have a linked list or something of that sort
 * 
 * 
 * 
 */

const setTwo = (input) => {  
    // Create an array of 1000x1000
    let fabric = Array.from(
      {length: 1000},
      _ => Array.from({length: 1000}, _ => new Set())
    )

    const unclaimed = new Set()
  
    const parseClaim = (rawClaim) => {
      // Assume the each input is valid
      const [rawId, rawAt, rawCoordinate, rawSize] = rawClaim.split(' ')
  
      const id = rawId.slice(1)
      const [startX, startY] = rawCoordinate
        .slice(0, -1)
        .split(',')
        .map(coord => ~~coord)
      const [width, height] = rawSize
        .split('x')
        .map(coord => ~~coord)
      
      return {
        id,
        startX,
        startY,
        width,
        height
      }
    }
  
    const markClaim = (fabric, claim, unclaimed) => {
      unclaimed.add(claim.id)

      for(let x = claim.startX; x < claim.startX+claim.width; x++) {
        for(let y = claim.startY; y < claim.startY+claim.height; y++ ) {
          fabric[x][y].add(claim.id)

          if(Array.from(fabric[x][y]).length > 1)
            fabric[x][y].forEach(id => unclaimed.delete(id))
        }
      }
    }
    
    input.forEach(claim => {
      const parsed = parseClaim(claim)
      markClaim(fabric, parsed, unclaimed)
    })

    return [...unclaimed][0]
}

module.exports = {
  setOne,
  setTwo
}