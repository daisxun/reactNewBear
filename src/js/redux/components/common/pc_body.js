import React, {Component} from 'react';
import Nav from './pc_nav';
import PCHeader from './pc_header';
import Login from './pc_login';
import { Layout, Breadcrumb } from 'antd';


const { Header, Content, Sider } = Layout;

export const Entry = props => {
 return (sessionStorage.getItem("login") == 'Y' ? (<Main>{props.children}</Main>) : <Login />  )
}


class Main extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      collapsed: false,
    };

  }
   render(){
    return (
      <Layout>
        <PCHeader collapsed={this.state.collapsed}
          onCollapse={this.toggle.bind(this)}
         />
      <Layout>
        {/*<Sider
          width={200}
          collapsible
          collapsed={this.state.collapsed}
          style={{background: '#fff'}}
          trigger={null}
        >  
          <Nav />

        </Sider>
        <Layout  style={{ padding: '0 24px 24px' }}>
          {
            this.props.children ?
            this.props.children
            :
            <div>
              <Breadcrumb style={{ margin: '12px 0' }}>
                <Breadcrumb.Item>首页</Breadcrumb.Item>
              </Breadcrumb>
              <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
              </Content>
            </div>
          }
        </Layout>*/}

        <Content style={{padding: '0 50px'}}>
          {/*<Layout style={{padding:'24px 0', background: '#fff' }}>
            <Sider width={200} style={{ background: '#fff' }}>
              <Nav />
            </Sider>
            <Content style={{padding:'0 24px', minHeight: 280 }}>
              {this.props.children}
            </Content>
          </Layout>*/}
          {
            this.props.children
            ?this.props.children
            :
            <div>
              <Breadcrumb style={{ margin: '12px 0' }}>
                <Breadcrumb.Item>首页</Breadcrumb.Item>
              </Breadcrumb>
              <Layout style={{padding:'24px 0', background: '#fff' }}>
                <Sider width={200} style={{ background: '#fff' }}>
                  <Nav />
                </Sider>
                <Content style={{padding:'0 24px', minHeight: '600px' }}>
                </Content>
              </Layout>
            </div>
          }
        </Content>
      </Layout>
      </Layout>
      )
   }
   toggle(){
     this.setState({
       collapsed: !this.state.collapsed,
     });
   }

}



export const NoPermission = () => (<h1><center>没有权限</center></h1>);

/*export const NoPage = () => (<h1><center>404</center></h1>);

export const ComingSoon = () => (<h1><center><i>Coming Soon !</i></center></h1>);*/