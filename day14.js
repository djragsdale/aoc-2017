const { addWrap, log, range, sum } = require('./utilities');
log('Beginning program...')
const input = require('./day14_input')

const knotHash = (word) => {
  const LIST_LENGTH = 256

  const getNewPosition = (...params) => addWrap(...params)
  const twistLoop = (loop, startPosition, length) => {
    if (startPosition + length >= loop.length) {
      const tailLength = (loop.length) - startPosition
      const headLength = length - tailLength
      const twistArr = [
        ...loop.slice(startPosition),
        ...loop.slice(0, headLength)
      ]
        .reverse()

      // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      // [0, 1), 2, 3, 4, 5, (6, 7, 8, 9)]
      // twistArr = [6, 7, 8, 9, 0, 1]
      // .reverse() -> [1, 0, 9, 8, 7, 6]
      // [7, 6), 2, 3, 4, 5, (1, 0, 9, 8]

      return [
        ...twistArr.slice(tailLength),
        ...loop.slice(headLength, startPosition),
        ...twistArr.slice(0, tailLength),
      ]
    } else {
      return [
        ...loop.slice(0, startPosition),
        ...loop.slice(startPosition, startPosition + length).reverse(),
        ...loop.slice(startPosition + length),
      ]
    }
  }
  const getSparseHash = (lengthSequence, numberOfRounds, listLength) => {
    let currentPosition = 0
    let skipSize = 0
    let sparseHash = range(listLength - 1)
    for (let i = 0; i < numberOfRounds; i++) {
      lengthSequence.forEach((length) => {
        sparseHash = twistLoop(sparseHash, currentPosition, length)
        currentPosition = getNewPosition(currentPosition, length + skipSize, listLength)
        skipSize++
      })
    }
    return sparseHash
  }
  const getDenseHash = (sparseHash) => {
    const BLOCK_LENGTH = 16
    const denseHash = range(15)
      .map((blockIdx) => sparseHash.slice(blockIdx * BLOCK_LENGTH, (blockIdx + 1) * BLOCK_LENGTH))
      .map((block) => block
        .slice(1)
        .reduce((acc, next) => acc ^ next, block[0])
      )
    return denseHash
      .map((hexCode) => hexCode.toString(16))
      .map((hexString) => hexString.padStart(2, '0'))
      .join('')
  }

  const encryptionRoundCount = 64
  const encryptionTerminationCode = [17, 31, 73, 47, 23]
  const parsedInput = word
    .split('')
    .map((char) => char.charCodeAt(0))
  const terminatedInput = parsedInput
    .concat(encryptionTerminationCode)
  // log('terminatedInput', terminatedInput)
  const _sparseHash = getSparseHash(terminatedInput, encryptionRoundCount, LIST_LENGTH)
  // log('sparseHash', sparseHash)
  const _denseHash = getDenseHash(_sparseHash)
  // log('denseHash')

  return _denseHash
}

// Part A
const rowCount = 128
const hashSources = range(rowCount - 1)
  .map((num) => `${input}-${num}`)
  .map((word) => knotHash(word))
  .map((row) => parseInt(row, 16).toString(2))

// const result = hashSources[0]
// const result = typeof hashSources[0]


const result = hashSources
  .map((row) => row
    .split('')
    .map((bit) => parseInt(bit, 10))
    .reduce(sum, 0)
  )
  .reduce(sum, 0)



// Part B




log(`The result is: '${result}'.`)
