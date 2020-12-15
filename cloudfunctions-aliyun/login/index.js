'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const APPID = "";
	const SECRET = "";

	const apiUrl =
		`https://api.weixin.qq.com/sns/jscode2session?appid=${APPID}&secret=${SECRET}&js_code=${event.code}&grant_type=authorization_code`;
	const userInfo = await uniCloud.httpclient.request(apiUrl, {
		method: 'GET',
		dataType: 'json'
	})

	let token = "";
	const db = uniCloud.database();
	const collection = await db.collection('t_user')
	const user = await collection.where({
		openid: userInfo.data.openid
	}).get()
	if (user.data.length == 0) {
		token = await collection.add(userInfo.data);
	} else {
		token = user.data[0]._id
	}

	//返回数据给客户端
	return token
};
