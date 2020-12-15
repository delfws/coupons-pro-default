'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)

	const db = uniCloud.database();
	// 获取 `user` 集合的引用
	let res = await db.collection('t_log').get()

	//返回数据给客户端
	return res
};
