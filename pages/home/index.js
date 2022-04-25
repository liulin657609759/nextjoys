import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;
// import style from './index.module.css'
export default function Home(){
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
    `}</style>
    <Header
      style={{
        position: 'fixed',
        zIndex: 1,
        width: '100%',
      }}
    >
      <div className='logo' />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        items={new Array(3).fill(null).map((_, index) => ({
          key: String(index + 1),
          label: `nav ${index + 1}`,
        }))}
      />
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
          minHeight: 380,
        }}
      >
        Content
      </div>
    </Content>
    <Footer
      style={{
        textAlign: 'center',
      }}
    >
      Ant Design ©2018 Created by Ant UED
    </Footer>
  </Layout>
);
}