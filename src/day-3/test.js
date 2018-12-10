const input = require('./input')
const { setOne, setTwo } = require('./index.js')

describe('Day Three - Set One', () => {
  it('should do something', () => {
    const rv = setOne(input)
    expect(rv).toBe(121259)
  })
})

describe('Day Three - Set Two', () => {
  it('should do something', () => {
    const rv = setTwo(input)
    expect(rv).toBe('239')
  })
})