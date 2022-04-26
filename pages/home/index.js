import { Layout, Dropdown, Space, Statistic, Badge, Menu, Popover, Button } from 'antd';
const { Header, Content, Footer } = Layout;
import { UserOutlined, AppstoreOutlined, SettingOutlined, DownOutlined } from '@ant-design/icons';
import PhoTable from '../component/PhoTable';
import style from './index.module.css'
export default function Home(){
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
            background: rgba(255, 255, 255, 0.2);
        }
        .site-layout-background {
            background: #fff;
        }
        .button {
          width: 100%;
          display: flex;
          padding: 20px;
          justify-content: center;
        }
    `}</style>
    <Header
      style={{
        position: 'fixed',
        zIndex: 1,
        width: '100%',
        padding: '0 30px'
      }}
    >
      <div className={style.headerContent}>
        <div className='logo' />
        <Statistic
          // title="进度"
          value={0} 
          suffix="/ 10"
          valueStyle={{
            color: '#fff'
          }}
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
        <PhoTable />
        <div className='button'>
          <button className={style.button}>开始！</button>
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
      <div style={{
        width: '30px',
        height: '30px'
      }}>
        <img src='https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic3.zhimg.com%2Fv2-e9b02556e56039f616ace2ec90fa4a7a_180x120.jpg&refer=http%3A%2F%2Fpic3.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1653566748&t=8ae75461f4add416ee80b50d6a9a0b3a'></img>
        Hover me</div>
    </Popover>
    </div>
  </Layout>
);
}