import { GET, POST } from '../../lib/until';
const fetchTaskHistory =() => GET(
  '/api/task/history'
)

// 获取当前用户今日上次关卡数据-/task/last
const fetchTaskLast = () => GET(
  '/api/task/last'
)

// 获得关卡数据-/game/data
async function fetchGameData(params){
  return GET(
    '/api/game/data',
    params
  )
}


// 关卡数据上报-/game/push
const fetchGamePush = (params) => POST(
  '/api/game/data',
  params
)

export {
  fetchTaskHistory,
  fetchTaskLast,
  fetchGameData,
  fetchGamePush
}