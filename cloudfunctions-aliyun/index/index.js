'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)

	const db = uniCloud.database();
	let open = await db.collection('t_open').get();
	if (open.data[0].coupons) {

		let res = await db.collection('t_platform').aggregate()
			.match({
				isOpen: true
			})
			.lookup({
				from: 't_coupons',
				localField: '_id',
				foreignField: 'parentId',
				as: 'list',
			})
			.end()

		//返回数据给客户端
		return res
	} else {
		return {
			affectedDocs: 1,
			data: []
		}
	}
};
