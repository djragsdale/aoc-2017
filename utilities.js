module.exports = {
	log: (...params) => console.log(`${new Date().toTimeString()}> `, ...params),
	sum: (val0, val1) => val0 + val1,
	sumStr: (val0, val1) => ~~val0 + ~~val1,
};
