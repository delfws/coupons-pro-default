'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)

	const db = uniCloud.database();
	const collection = await db.collection('t_evaluation')
	const user = await collection.add(Object.assign({}, event, {
		datetime: new Date(new Date().getTime() + 1000 * 60 * 60 * 8).toLocaleString()
	}))

	//返回数据给客户端
	return {
		msg: event.opera == 'good' ? "感谢老铁的赞(๑•̀ㅂ•́)و✧" : "批评的对！"
	}
};
