const { 
  default: dayOne,
  secondary,
  input
} = require('./index.js')

describe('Day 1', () => {
  it('should read the input', () => {
    expect(input).toBe(require('./input'))
  })

  it('return an integer', () => {
    const rv = dayOne(input)
    expect(Number.isInteger(rv)).toBe(true)
  })

  it('should equal to 411', () => {
    const rv = dayOne(input)
    expect(rv).toBe(411)
  })

  describe('Secondary', () => {
    it('should equal 56360', () => {
      const rv = secondary(input)
      expect(rv).toBe(56360)
    })
  })
})