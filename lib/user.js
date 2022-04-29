import Cookie from 'js-cookie'
import {Base64} from "js-base64";

export const getUser = async () => {
  const token = Cookie.get('jwt')

  try {
    let response = Base64.decode(token)
    // let response = await fetch(`${API_URL}/me`, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${token}`,
    //   },
    // })

    // response = await response.json()

    return response;
  } catch (e) {
    return { error: 'An error occured' }
  }
}