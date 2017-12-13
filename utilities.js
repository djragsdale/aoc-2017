const log = (...params) => console.log(`${new Date().toTimeString()} >>>`, ...params)

function range (min, max, step = 1) {
	let _min = min
	let _max = max
	if (!max) {
		_min = 0
		_max = min
	}
	let arr = []
	for (let i = _min; i <= _max; i += step) {
		arr.push(i)
	}
	return arr
}

module.exports = {
	anyAreTrue: (arr) => arr.reduce((acc, next) => acc || next, false),
	isNull: (val) => typeof val === 'null',
	isNullOrUndefined: (val) => typeof val === 'null' || typeof val === 'undefined',
	isUndefined: (val) => typeof val === 'undefined',
	log,
	range,
	sum: (val0, val1) => val0 + val1,
	sumStr: (val0, val1) => ~~val0 + ~~val1,
};
