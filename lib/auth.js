import Cookie from 'js-cookie'
const login = async (name, pwd) => {
  try {
    let response = await fetch(`/api/user/login?name=${name}&pwd=${pwd}`)

    response = await response.json()
    if (response.msg) {
      Cookie.set('jwt', response.msg.token)
    }

    return response
  } catch (e) {
    return { error: '登录失败，请稍后重试' }
  }
}
const register = async (value) => {
  try {
    let response = await fetch(`/api/user/register`, {
      method: 'POST',
      body: JSON.stringify(value),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    response = await response.json()
    if (response.msg) {
      Cookie.set('jwt', response.msg.token)
    }
    return response
  } catch (e) {
    return { error: '登录失败，请稍后重试' }
  }
}

const logout =async () => {
  try {
    Cookie.remove('jwt')
  } catch (e) {
    return { error: '退出失败，请稍后重试' }
  }
}

export {login, register, logout}