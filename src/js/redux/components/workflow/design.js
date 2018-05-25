

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Breadcrumb,Layout ,Input,Button ,Table ,Avatar,Modal,Icon,Pagination } from 'antd';
import axios from 'axios';
const ButtonGroup = Button.Group
import Nav from '../common/pc_nav';
const { Content, Sider } = Layout;
const ajaxUrl = 'http://120.79.128.100/device-manager';
const param = {
   "header": {"token": sessionStorage.token},
         "data": {
         "payload_type": "api",
          "description": {
                         "type": "member_management",
                           "id": "com_member_query",//查询的是当前登录管理员所在公司下的会员
                       "params": {
                                "v_flag": 0,//会员是否注销【0：所有、1：未注销、2：已注销】
                            "v_start_id": 0,//起始会员id
                           "v_page_size": 5,//每页显示的条数(查出的结果会多出一条，此条记录页面不显示，只供前端使用)
                           "v_direction": 1//下一页：1；上一页：2
                                 }
                         }
                 }
             }
const data = [];

class TopHeader extends React.Component {
    render() {
        return (
            <div>
                <Breadcrumb style={{ margin: '12px 0' }}>
                    <Breadcrumb.Item>会员管理</Breadcrumb.Item>
                    <Breadcrumb.Item>会员信息</Breadcrumb.Item>
                </Breadcrumb>
            </div>
        )
    }
}
class SerchModer extends React.Component{
    render(){
            return(
           <div class='searchCss'>
                <span>关键字：</span>
                 <Input placeholder="Basic usage" />
                   &nbsp;
                 <Button type="primary" icon="search" >搜索</Button>
             </div>
                )

    }
}

class ModalBox extends React.Component{
     constructor(props){
          super(props);
          this.state={
             visible: false
          };
        }

      render(){
        return(
          <Modal title="BasicModal" visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          </Modal>
          )
      }
}
class Page extends React.Component{
    constructor(props){
             super(props);
    }
    render(){
      return(
            <div className="PageCss">
               <ButtonGroup>
                <Button type="primary" ghost><Icon type="left" />上一页</Button>
                 <Button type="primary" ghost>下一页<Icon type="right" /></Button>
                 <br/>
              </ButtonGroup>
            </div>
        )
    }
}
class Tables extends React.Component{
    constructor(props){
          super(props);
          this.state={ };
          this.columns = [
            {  title: '昵称', width: 80, dataIndex: 'wx_nickname', key: 'wx_nickname', fixed: 'left' },
            {  title: '头像', 
                 key: 'wx_logo', 
           dataIndex: 'wx_logo',
               fixed: 'left' ,
               width: 50, 
              render: (text) =>(<Avatar  src={text}  className="ant-dropdown-link"/>) 
            },
            { title: '公司名称', dataIndex: 'company_name', key: '1' ,width: 200},
            { title: '用户状态', dataIndex: 'delete_flag', key: '2', width: 80 },
            { title: '余额', dataIndex: 'wallet_mny', key: '3', width: 150 },
            { title: '电话号码', dataIndex: 'phone', key: '4',width: 100 },
            { title: '注册时间', dataIndex: 'register_time', key: '5' ,width: 200},
            { title: '上次登录时间', dataIndex: 'last_login_time', key: '6' ,width: 250},
            { title: '上次登录IP', dataIndex: 'last_login_ip', key: '7' ,width: 150},
            { title: 'openID', dataIndex: 'open_id', key: '8' ,width: 200},
            {
              title: '操作',
                key: 'operation',
              fixed: 'right',
              width: 250,
               render: (text,record) => {
                    return(
                           <span>
                              <a href="#" onClick={(text,record) => this.arrea(text,record)} >欠费记录</a>
                              <span className="ant-divider" />
                              <a href="#" onClick={(text,record) => this.chage(text,record)} >充值记录</a>
                              <span className="ant-divider" />
                              <a href="#" onClick={(text,record) => this.consu(text,record)} className="ant">消费记录 </a>

                          </span>
                          )
                     },
            }

                         ];
    }
      arrea(a,b){
           console.log(a);
           console.log(b);
      
    }
      chage(a,b){
           console.log(a);
           console.log(b);
    }
      consu(a,b){
           console.log(a);
           console.log(b);
    }
    componentDidMount(){
       $.ajax({    
                url: ajaxUrl,
               type: "POST",
              async: false,
              cache: false,
        contentType: "application/json",
           dataType: "json",
               data: JSON.stringify(param),
            success: function (res) {
                 console.log('result:',res);
                 for (let i = 0; i < res.data.length; i++) {
                           data.push({
                                       key: i,
                               wx_nickname:res.data[i].wx_nickname,
                                   wx_logo:res.data[i].wx_logo,
                              company_name:res.data[i].company_name,
                               delete_flag:res.data[i].delete_flag==false?'未注销':'已注销',  
                                wallet_mny:res.data[i].wallet_mny/100+"元",
                                     phone:res.data[i].phone,
                             register_time:res.data[i].register_time,
                           last_login_time:res.data[i].last_login_time,
                             last_login_ip:res.data[i].last_login_ip,
                                   open_id:res.data[i].open_id
                                    });
                                             }
                                   }
            }); 
        }
    render(){
        return(
          <div class="tableCss">
               <Table pagination={false} columns={this.columns} dataSource={data} scroll={{ x: 1800, y: 500 }}  className="tablestyle"  />
               <Page/>
          </div>
             )
    }
}

class Workflow extends React.Component {
     render(){     
        return (
              <div class="menberBox"> 
               <Tables/>
               <ModalBox/>
              </div>      
        )
    }
}


export default class Workflowpage extends React.Component {
        render() {  
            return (
              <div >
                <TopHeader />
                <Layout style={{ padding: '24px 0', background: '#fff' }}>
                    <Sider width={200} style={{ background: '#fff' }}>
                         <Nav />
                    </Sider> 
                    <Workflow />
                </Layout>
            </div>
            )

        }
}
   


