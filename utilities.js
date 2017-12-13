const addWrap = (base, toAdd, breakAt) => {
	if (base + toAdd >= breakAt) {
		return (base + toAdd) % breakAt
	} else {
		return base + toAdd
	}
}

const log = (...params) => console.log(`${new Date().toTimeString()} >>>`, ...params)

const range = (min, max, step = 1) => {
	let _max = max
	let _min = min
	if (!max) {
		_max = min
		_min = 0
	}

	const _arr = []
	for (let i = _min; i <= _max; i += step) {
		_arr.push(i)
	}
	return _arr
}

module.exports = {
	addWrap,
	anyAreTrue: (arr) => arr.reduce((acc, next) => acc || next, false),
	isNull: (val) => typeof val === 'null',
	isNullOrUndefined: (val) => typeof val === 'null' || typeof val === 'undefined',
	isUndefined: (val) => typeof val === 'undefined',
	log,
	range,
	sum: (val0, val1) => val0 + val1,
	sumStr: (val0, val1) => ~~val0 + ~~val1,
};
