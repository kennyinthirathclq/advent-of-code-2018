/**
 * Basically a closing parentheses problem
 * 
 * Maybe we can work with two stacks
 * One for lowercase, other for uppercase
 * 
 * Runtime will be 2n
 * 
 * Will need to parse
 * 
 * Should we stream the input (if it's a very large dataset)
 * Do we need to limit stack sizes?
 * 
 * I think we can check if there's a match then remove
 * If we remove then we should keep checking until nothing's valid
 * 
 * Only alphas?
 */
const setOne = input => {
  const stack = []

  const combo = (stack) => {
    const top = stack[stack.length - 1]
    const topLess = stack[stack.length - 2]

    if(!top || !topLess)
      return

    if(top.toLowerCase() === topLess.toLowerCase() && top !== topLess) {
      stack.pop() & stack.pop()
      combo(stack)
    }

  }

  const split = input.split('')

  split.forEach(char => {
    stack.push(char)
    combo(stack)
  })

  return stack.length
}


const setTwo = input => {
  const stack = []
  let seen = {}

  const combo = (stack) => {
    const top = stack[stack.length - 1]
    const topLess = stack[stack.length - 2]

    if(!top || !topLess)
      return

    if(top.toLowerCase() === topLess.toLowerCase() && top !== topLess) {
      stack.pop() & stack.pop()
      combo(stack)
    }

  }

  const split = input.split('')

  split.forEach(char => {
    seen[char.toLowerCase()] = char.toLowerCase()
    stack.push(char)
    combo(stack)
  })

  let smallest = { char: null, length: 9078}

  Object
    .values(seen)
    .forEach(seenChar => {
      let temp = stack.join('')
      const s = temp
        .replace(new RegExp(`${seenChar}`, 'gi'), '')
        .split('')
      

      let stackTwo = []

      s.forEach(char => {
        stackTwo.push(char)
        combo(stackTwo)
      })

      const variant = stackTwo.length

      if(variant < smallest.length)
        smallest = { char: seenChar, length: variant}
    })


  return smallest.length
}

module.exports = {
  setOne,
  setTwo
}