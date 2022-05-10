import React, {useState, useEffect, useRef, useContext} from 'react'
import { Layout, Dropdown, Space, Statistic, Badge, Menu, Popover, Button } from 'antd';
const { Header, Content, Footer } = Layout;
import { RocketTwoTone, DownOutlined } from '@ant-design/icons';
import md5 from 'js-md5';
import Image from 'next/image';
import { Base64 } from 'js-base64';
import { useRouter } from 'next/router';
import MyContext from '../../lib/context';
import PhoTable from '../component/PhoTable';
import Selector from '../component/Selector';
import NextBtn from '../component/NextBtn';
import style from './index.module.css';
import { logout } from '../../lib/auth';
import { fetchTaskHistory, fetchGameData, fetchGamePush, fetchTaskLast } from '../api/index';
export default function Home(){
  const { user, isLoggedIn, setUser } = useContext(MyContext)
  const [start, setStart] = useState(false);
  const [showPic, setShowPic] = useState(true);
  const [num, setNum] = useState(0);
  const [result, setResult] = useState([]);
  const [timers, setTimers] = useState([]);
  const [level, setLevel] = useState(1)
  const [resultObj, setResultObj] = useState({})
  const [gameData, setGameData] = useState([])
  const [historyData, setHistoryData] = useState([])
  const [rate, setRate] = useState('')
  const [startDate, setStartDate] = useState(0)
  const [endDate, setEndDate] = useState(0)
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
    fetchTaskLast().then(
      res=>{
        if(res.success){
          setLevel(res.msg.level)
          const val = JSON.stringify({
            "level": res.msg.level,
            "verification": "GET_MIX_256"
          });
          const key = md5(val);
          fetchGameData({level:res.msg.level, getKey: key}).then(
            res=>{
              const data = JSON.parse(Base64.decode(res.msg.data))
              setStartDate(new Date().getTime())
              setGameData(data)
            }
          )
          fetchTaskHistory().then(
            res=>{
              setHistoryData(res.msg)
            }
          );
        }
      }
    )
  },[level]);
  
  useEffect(() => {
    if(showPic && num>1+(level-1)*2){
      result[Math.trunc(num/2)-2-(level-1)] = resultObj
      setResultObj({});
    }
    if(num===42+(level-1)*2){
      setEndDate(new Date().getTime())
      const val = JSON.stringify({
        "data": result,
        "duration": new Date().getTime()-startDate,
        "level": level,
        "verification": "PUSH_MIX_256"
      });
      fetchGamePush({
        data: result,
        level: level,
        duration: new Date().getTime()-startDate,
        pushKey: md5(val)
      }).then(
        res=>{
          setRate(res.msg.rate)
        }
      )
    }
    if(start && num <= 41+(level-1)*2){
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

  const selectRes = (type,val)=>{
    resultObj[type] = val
  }

  const nextLevel = () =>{
    setLevel(1);
    setNum(0);
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
    <div
      style={{
        maxHeight: '140px',
        overflow: 'scroll'
      }}
    >
      {
        historyData.map(({taskTime,number},index)=>(
          <div 
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '5px'
            }}
          >
            <Badge
              className="site-badge-count-109"
              count={number}
              style={{ 
                margin: '4px',
                backgroundColor: number >= 20 ? '#52c41a' : ''
              }}
            />
            <span className={style.date}>{taskTime} </span>
          </div>
        ))
      }
    </div>
  );
  return(
  <Layout style={{height: '100vh'}}>
    <style jsx>{`
        .site-layout-background {
            background: #fff;
        }
        .button {
          width: 100%;
          display: ${!start ? 'flex' : 'none'};
          padding: 20px;
          justify-content: center;
        }
        .suffix{
          font-size: 18px;
          color: #4aa3f8;
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
        <div className={style.logo}>
          N-Block
        </div>
        <Statistic
          title="进度"
          value={
            ` ${Math.trunc((num+1-level*2)/2) > 0 ?  Math.trunc((num+1-level*2)/2) : 0} /20`
          } 
          suffix= {
            <span className='suffix'>
              {
              ` ^ ${level}`
              }
            </span>
          }
          style={{
            textAlign: 'center'
          }}
          prefix={<RocketTwoTone/>}
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
        marginTop: 74,
      }}
    >
      <div
        className="site-layout-background"
        style={{
          padding: 24,
          height: '100%',
        }}
      >
        {showPic && num<=40+(level-1)*2 && <PhoTable data={gameData[Math.trunc(num/2)]} />}
        {!showPic && num>2*level && <Selector selectRes={selectRes} />}
        { num>40+(level-1)*2 && <NextBtn rate={rate} nextLevel={nextLevel} />}
        <div className='button'>
          <button
            className={style.button}
            onClick={()=>{
              setStartDate(new Date().getTime())
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
      记忆测试 ©2022
    </Footer>
    <div className={style.fixed}>
    <Popover placement="topRight" content={content} title="历史记录">
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