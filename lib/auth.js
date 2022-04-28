import Cookie from 'js-cookie'
import {Base64} from "js-base64";
const API_URL = 'http://124.223.223.225:80/api/'
export const login = async (name, pwd) => {
  try {
    let response = await fetch(`${API_URL}/user/login`, {
      method: 'POST',
      body: JSON.stringify({ name, pwd }),
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