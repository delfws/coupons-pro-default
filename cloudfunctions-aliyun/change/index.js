'use strict';
exports.main = async (event, context) => {
	const db = uniCloud.database();
	let res = await db.collection('t_open').doc('5fd2452f6463510001f93845').update({
		banner: event.queryStringParameters.banner ? true : false,
		coupons: event.queryStringParameters.coupons ? true : false,
		message: event.queryStringParameters.message ? true : false,
	});

	return res
};
