import Cookie from 'js-cookie'
const API_URL = '124.223.223.225:80/api/'
export const login = async (identifier, password) => {
  try {
    let response = await fetch(`${API_URL}/user/login`, {
      method: 'POST',
      body: JSON.stringify({ email: identifier, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    response = await response.json()

    if (response.accessToken) {
      Cookie.set('jwt', response.accessToken)
    }

    return response
  } catch (e) {
    return { error: '登录失败，请稍后重试' }
  }
}