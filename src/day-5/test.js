const input = require ('./input')
const { setOne, setTwo } = require('./index')

describe('Day Five - Set One', () => {
  it('should do something', () => {
    const rv = setOne(input)
    expect(rv).toBe(9078)
  })

})

describe('Day Five - Set Two', () => {
  it('should do something', () => {
    const rv = setTwo(input)
    expect(rv).toBe(5698)
  })
})