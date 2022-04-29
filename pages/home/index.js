import React, {useState, useEffect, useRef, useContext} from 'react'
import { Layout, Dropdown, Space, Statistic, Badge, Menu, Popover, Button } from 'antd';
const { Header, Content, Footer } = Layout;
import { SmileTwoTone, DownOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { useRouter } from 'next/router';
import MyContext from '../../lib/context';
import PhoTable from '../component/PhoTable';
import Selector from '../component/Selector';
import style from './index.module.css';
import { logout } from '../../lib/auth'
import { fetchTaskHistory, fetchGameData } from '../api/index'
export default function Home(){
  const { user, isLoggedIn, setUser } = useContext(MyContext)
  const [start, setStart] = useState(false);
  const [showPic, setShowPic] = useState(true);
  const [num, setNum] = useState(1);
  const [timers, setTimers] = useState([]);
  const saveCallBack = useRef();
  const router = useRouter()
  const callBack = () => {
    const random = (Math.random() * 10) | 0;
    setNum(num + random);
  };
  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/')
    }
  }, [isLoggedIn])

  useEffect(() => {
    saveCallBack.current = callBack;
    return () => {};
  });
  useEffect(() => {
    const taskHistory = fetchTaskHistory();
    const gameData = fetchGameData({level:1})
    console.log(333,gameData);
    if(start){
      const tick = () => {
        saveCallBack.current();
        setShowPic(!showPic)
      };
      const timer = setInterval(tick, 2000);
      timers.push(timer);
      setTimers(timers);
      return () => {
        clearInterval(timer);
      };
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [num,start,isLoggedIn]);
  const menu = (
    <Menu>
      <Menu.Item
        key={2}
        danger={true}
        onClick={()=>{
          logout();
          setUser(null)
          }
        }
      >
        退出登陆
      </Menu.Item>
    </Menu>
  );
  const content = (
    <div>
      <Badge status="success" text="Success" />
      <br />
      <Badge status="error" text="Error" />
      <br />
      <Badge status="default" text="Default" />
      <br />
    </div>
  );
  return(
  <Layout style={{height: '100vh'}}>
    <style jsx>{`
        .logo {
            float: left;
            width: 120px;
            height: 31px;
            margin: 16px 24px 16px 0;
            background: #1890ff;
        }
        .site-layout-background {
            background: #fff;
        }
        .button {
          width: 100%;
          display: ${!start ? 'flex' : 'none'};
          padding: 20px;
          justify-content: center;
        }
    `}</style>
    <Header
      style={{
        position: 'fixed',
        zIndex: 1,
        width: '100%',
        padding: '0 30px',
        background: '#fff'
      }}
    >
      <div className={style.headerContent}>
        <div className='logo' />
        <Statistic
          title="进度"
          value={0} 
          suffix="/ 10"
          style={{
            textAlign: 'center'
          }}
          prefix={<SmileTwoTone />}
        />
        <Dropdown overlay={menu}>
          <a onClick={e => e.preventDefault()}>
            <Space>
              {user?.name}
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
      
    </Header>
    <Content
      className="site-layout"
      style={{
        padding: '0 30px',
        marginTop: 84,
      }}
    >
      <div
        className="site-layout-background"
        style={{
          padding: 24,
          height: '100%',
        }}
      >
        {showPic && <PhoTable />}
        {!showPic && <Selector />}
        <div className='button'>
          <button
            className={style.button}
            onClick={()=>{
              setStart(true)
            }}
          >开始！</button>
        </div>
      </div>
    </Content>
    <Footer
      style={{
        textAlign: 'center',
      }}
    >
      记忆测试 ©2018 Created by Ant UED
    </Footer>
    <div className={style.fixed}>
    <Popover placement="topRight" content={content} title="Title">
      <div
        style={{
          opacity: '.7'
        }}
      >
        <Image
          alt='ll'
          width={50}
          height={50}
          src={'/images/hover.png'}
          style={{
            opacity: '.7'
          }}
        />
        </div>
    </Popover>
    </div>
  </Layout>
);
}