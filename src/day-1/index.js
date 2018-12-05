const input = require ('./input.js')

const main = (input) => input.reduce((acc, num) => {
  const sign = num.slice(0, 1)
  const parsed = ~~num.slice(1, num.length)

  return sign === '+'
    ? acc + parsed
    : acc - parsed

}, 0)

const secondary = (input) => {
  let seen = {}
  let freq = 0
  let repeated = false

  while (!repeated) {
    input.forEach(num => {

      if(seen[freq]) {
        repeated = true
        return;
      }

      seen[freq] = true

      const sign = num.slice(0, 1)
      const parsed = ~~num.slice(1, num.length)

      freq = sign === '+'
        ? freq + parsed
        : freq - parsed
    })
  }

  return freq
}

module.exports = {
  default: main,
  secondary,
  input
}