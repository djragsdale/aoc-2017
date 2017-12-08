const { log, sum } = require('./utilities')
log('Beginning program...')
const input = require('./day07_input')
	.split('\n')
	.map((str) => str.split(/[\s,\(\)\->]+/))

// Part A
// const tree = {}
// input.forEach
// const result = input[0]
// let children = []
// input.forEach((arr) => {
// 	if (arr[2]) {
// 		arr.slice(2).forEach((name) => children.push(name))
// 	}
// })
// const result = input.filter((arr) => children.indexOf(arr[0]) < 0)

// Part B
const tree = {}
input.forEach((arr) => {
	tree[arr[0]] = {
		weight: parseInt(arr[1], 10),
	}
	if (arr[2]) {
		tree[arr[0]].children = arr.slice(2)
	}
})

const weightCache = {}
function getWeight(name) {
	if (!weightCache[name]) {
		let weight = tree[name].weight
		if (tree[name].children) {
			weight += tree[name].children
				.map((child) => getWeight(child))
				.reduce(sum, 0)
		}
		weightCache[name] = weight
	}
	return weightCache[name]
}

function findProgram(parent) {
	if (!tree[parent].children) {
		return null
	}

	let childWeights = tree[parent].children
		.map((child) => getWeight(child))
	log('childWeights', tree[parent].children, childWeights)

	const uniqueWeights = [...new Set(childWeights)]
	if (uniqueWeights.length === 1) {
		return parent
	} else {
		if (childWeights.length > 2) {
			const weights = {}
			tree[parent].children.forEach((childName) => {
				const childWeight = getWeight(childName)
				if (!weights[childWeight]) {
					weights[childWeight] = 0
				}
				weights[childWeight]++
			})
			log('weights', weights, tree[parent].children, tree[parent].children.map((child) => weights[getWeight(child)]))
			const oddChild = tree[parent].children.filter((child) => weights[getWeight(child)] === 1)[0]
			log('odd child', oddChild)
			return findProgram(oddChild) || oddChild
		} else {
			log('run on both and return one with problem')
			return tree[parent].children
				.map((child) => findProgram(child))
				.reduce((acc, next) => acc || next, null)
		}
	}
}

const result = findProgram('dgoocsw')




log(`The result is: '${result}'.`)