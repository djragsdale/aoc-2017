module.exports = {
	anyAreTrue: (arr) => arr.reduce((acc, next) => acc || next, false),
	isNull: (val) => typeof val === 'null',
	isNullOrUndefined: (val) => typeof val === 'null' || typeof val === 'undefined',
	isUndefined: (val) => typeof val === 'undefined',
	log: (...params) => console.log(`${new Date().toTimeString()} >>>`, ...params),
	sum: (val0, val1) => val0 + val1,
	sumStr: (val0, val1) => ~~val0 + ~~val1,
};
