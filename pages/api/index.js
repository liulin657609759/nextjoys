import superagent from 'superagent'
import Cookie from 'js-cookie'

const headers = {
	Authorization: Cookie.get('jwt'),
	'Access-Control-Allow-Origin': '*',
}
const headersImg = {
	Authorization: Cookie.get('jwt'),
	'Access-Control-Allow-Origin': '*',
	'Cache-Control': 'max-age=315360000',
}

async function fetchTaskHistory() {
	return superagent
		.get('/api/task/history')
		.set(headers)
		.then((res) => res.body)
}

async function fetchGamePush(params) {
	return superagent
		.post(`/api/game/push`)
		.send(params)
		.set(headers)
		.then((res) => res.body)
}

// 获取当前用户今日上次关卡数据-/task/last
async function fetchTaskLast() {
	return superagent
		.get('/api/task/last')
		.set(headers)
		.then((res) => res.body)
}

// 获得关卡数据-/game/data
async function fetchGameData(params) {
	return superagent
		.get('/api/game/data')
		.set(headers)
		.query(params)
		.then((res) => res.body)
}
async function fetchBmpImg(num) {
	return superagent
		.get(`/imgs/neutral/NEUTRAL_${num}.bmp`)
		.set(headersImg)
		.then((res) => res.body)
}
async function fetchJpgImg(num) {
	return superagent
		.get(`/imgs/negative/NEGATIVE_${num}.JPG`)
		.set(headersImg)
		.then((res) => res.body)
}

export {
	fetchTaskHistory,
	fetchTaskLast,
	fetchGameData,
	fetchGamePush,
	fetchBmpImg,
	fetchJpgImg,
}
