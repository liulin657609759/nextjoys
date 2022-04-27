import React, {useState, useEffect, useRef} from 'react'
import { Layout, Dropdown, Space, Statistic, Badge, Menu, Popover, Button } from 'antd';
const { Header, Content, Footer } = Layout;
import { SmileTwoTone, DownOutlined } from '@ant-design/icons';
import Image from 'next/image'
import PhoTable from '../component/PhoTable';
import style from './index.module.css'
export default function Home(){
  const [start, setStart] = useState(false);
  const [showPic, setShowPic] = useState(true);
  const [num, setNum] = useState(1);
  const [timers, setTimers] = useState([]);
  const saveCallBack = useRef();
  const callBack = () => {
    const random = (Math.random() * 10) | 0;
    setNum(num + random);
  };
  useEffect(() => {
    saveCallBack.current = callBack;
    return () => {};
  });
  useEffect(() => {
    if(start){
      const tick = () => {
        saveCallBack.current();
      };
      const timer = setInterval(tick, 2000);
      timers.push(timer);
      setTimers(timers);
      setShowPic(!showPic)
      console.log(timers);
      return () => {
        clearInterval(timer);
      };
    }
  }, [num,start]);
  const menu = (
    <Menu
      items={[
        {
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
              1st menu item
            </a>
          ),
        },
        {
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
              2nd menu item (disabled)
            </a>
          ),
          disabled: true,
        },
        {
          danger: true,
          label: 'a danger item',
        },
      ]}
    />
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
              个人中心
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