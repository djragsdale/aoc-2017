const { log, sum } = require('./utilities');
const input = require('./day02_input')
	.split('\n')
	.map((elem) => elem
		.split('\t')
		.map((elem) => parseInt(elem, 10))
	)

// Part A
// const result = input
// 	.map((arr) => Math.max(...arr) - Math.min(...arr))
// 	.reduce(sum, 0)


// Part B
const result = input
	.map((arr) => arr
		.reduce((acc, val, idx, arr) => {
			if (acc) return acc
			return [...arr.slice(0, idx), ...arr.slice(idx + 1)]
				.reduce((acc, next) => ((val % next === 0) ? val / next : 0) + acc, 0)
		}, null)
	)
	.reduce(sum, 0)





log(`The result is: '${result}'.`)
