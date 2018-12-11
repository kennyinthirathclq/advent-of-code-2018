const input = require('./input')
const { setOne, setTwo } = require('./index')

describe('Day 4 - Set One', () => {
  it('should do something', () => {
    const rv = setOne(input)
    expect(rv).toBe(48680)
  })

})

describe('Day 4 - Set Two', () => {
  it('should do something', () => {
    const rv = setTwo(input)
    expect(rv).toBe(94826)
  })
})