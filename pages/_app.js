import Head from 'next/head'
import Cookie from 'js-cookie'
import MyContext from '../lib/context'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {Base64} from "js-base64";
import '../styles/globals.css'
import 'antd/dist/antd.css'

import { AppProps } from 'next/app'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
	// 1. 创建 state ，保存用户信息
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
		// 2. 从 cookie 中获取 登录凭证
    const jwt = Cookie.get('jwt')

    // 3. 如果有登录凭证， 发送请求给后端服务获取用户信息
    if (jwt) {
      // fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
      //   headers: {
      //     Authorization: `Bearer ${jwt}`,
      //   },
      // }).then(async (res) => {
      //   if (!res.ok) {
      //     Cookie.remove('jwt') // 如果请求user 失败， 清理 cookie ，这里可以根据请求的状态码来判断处理
      //     setUser(null)
      //   }
        let res = Base64.decode(jwt)
        const user = JSON.parse(res);
        setUser(user)
      // })
    }else{
      router.push('/')
    }
  }, [])

  return (
    <>
      <Head>
        <title>记忆测试</title>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"
        />
      </Head>
      <MyContext.Provider
        value={{
          user: user,
          setUser,
					// 注意这里，isLoggedIn的值是根据 user 是否为空来决定的， 
					// 所以，我们要将 setUser 函数一并传入 context ，这样做是为了在其他组件中使用这个方法触发 isLoggedIn 的值改变
        	isLoggedIn: !!user, 
				}}
      >
        <Component {...pageProps} />
      </MyContext.Provider>
    </>
  )
}

export default MyApp