import React from 'react'

// export interface IMyContextProps {
// 	// 是否登录标记
//   isLoggedIn: boolean
// 	// 用户信息
//   user: {
//     name: string
//     email: string
//   } | null
// 	// useState 创建的函数 ， 用于设置用户信息
//   setUser?: any
// }

const MyContext = React.createContext({
  isLoggedIn: false,
  user: null,
})

export default MyContext