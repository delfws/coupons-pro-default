'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)

	const db = uniCloud.database();
	let open = await db.collection('t_open').get();
	if (open.data[0].wallpaper) {

		let res = await db.collection('t_wallpaper')
			.aggregate()
			.skip(0)
			.limit(20)
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
