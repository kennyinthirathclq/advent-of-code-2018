const {
  setOne,
  setTwo
} = require('./index')
const input = require('./input')

describe('Day Two - Problem One', () => {
  it('should have a correct checksum', () => {
    const rv = setOne(input)

    expect(rv).toBe(9139)
  })
})

describe('Day Two - Problem Two', () => {
  it('should do something', () => {
    const rv = setTwo(input)

    expect(rv).toBe('uqcidadzwtnhsljvxyobmkfyr')
  })
})