'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)

	const db = uniCloud.database();
	let open = await db.collection('t_open').get();
	if (open.data[0].message) {
		let res = await db.collection('t_message').where({
			isOpen: true
		}).get()

		//返回数据给客户端
		return res
	} else {
		return {
			affectedDocs: 1,
			data: [{
				"_id": "shici",
				"title": "今天的诗词也很美！",
				"path": "/pages/index/index",
				"imageUrl": "shici.jpg",
				"isOpen": true
			}]
		}
	}
};
