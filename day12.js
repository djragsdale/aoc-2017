const { log } = require('./utilities');
log('Beginning program...')
const input = require('./day12_input')
	.split('\n')
	.map((str) => str.split(/[\s,\<\>\-]+/)) // <-> ,



// Part A
let inGroup = ['0']
let newlyAdded = ['0']
const maxRounds = 2000
let roundCount = 0
while (newlyAdded.length > 0 && roundCount < maxRounds) {
	if (roundCount % 100 === 0) {
		log(`entering round ${roundCount} with ${inGroup.length} matches`)
	}
	const _found = []
	newlyAdded.forEach((id) => {
		input
			.filter((arr) => arr.filter((connection) => connection === id).length > 0)
			.forEach((arr) => _found.push(arr[0]))
	})
	newlyAdded = [...new Set(_found.filter((id) => inGroup.indexOf(id) < 0))]
	inGroup = [...inGroup, ...newlyAdded]
	roundCount++
	// log('added id', newlyAdded)
}
const result = `${inGroup.length} in ${roundCount} rounds`


// Part B



log(`The result is: '${result}'.`)
