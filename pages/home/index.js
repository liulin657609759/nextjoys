import React, {useState, useEffect, useRef, useContext} from 'react'
import { Layout, Dropdown, Space, Statistic, Badge, Menu, Popover, Button } from 'antd';
const { Header, Content, Footer } = Layout;
import { SmileTwoTone, DownOutlined } from '@ant-design/icons';
import md5 from 'js-md5';
import Image from 'next/image';
import { Base64 } from 'js-base64';
import { useRouter } from 'next/router';
import MyContext from '../../lib/context';
import PhoTable from '../component/PhoTable';
import Selector from '../component/Selector';
import style from './index.module.css';
import { logout } from '../../lib/auth';
import { fetchTaskHistory, fetchGameData } from '../api/index';
export default function Home(){
  const { user, isLoggedIn, setUser } = useContext(MyContext)
  const [start, setStart] = useState(false);
  const [showPic, setShowPic] = useState(true);
  const [num, setNum] = useState(1);
  const [timers, setTimers] = useState([]);
  const [level, setLevel] = useState(1)
  const [result, setResult] = useState([])
  const [gameData, setGameData] = useState([])
  const saveCallBack = useRef();
  const router = useRouter()
  const callBack = () => {
    setNum(num + 1);
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
    const val = JSON.stringify({
      "level": level,
      "verification": "GET_MIX_256"
    });
    const key = md5(val);
    fetchGameData({level:1,getKey: key}).then(
      res=>{
        const data = JSON.parse(Base64.decode(res.msg.data))
        console.log(123,data);
        setGameData(data)
      }
    )
  },[level]);
  
  useEffect(() => {
    // const taskHistory = fetchTaskHistory();
    // console.log(333,gameData);
    if(start && num <= 40){
      const tick = () => {
        saveCallBack.current();
        setShowPic(!showPic)
      };
      const timer = setInterval(tick, !showPic ? 2000 : 500);
      timers.push(timer);
      setTimers(timers);
      return () => {
        clearInterval(timer);
      };
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [num,start,isLoggedIn]);

  const selectRes = ({picRes, textRes})=>{
    result[Math.trunc(num/2)][colorJudge] = picRes
    result[Math.trunc(num/2)][posJudge] = picRes
    setResult(

    )
  }
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
          value={Math.trunc(num/2)} 
          suffix="/ 20"
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
        {showPic && <PhoTable data={gameData[Math.trunc(num/2)]} />}
        {!showPic && num>2 && <Selector />}
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
      <div>
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