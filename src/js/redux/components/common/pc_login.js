import React from 'react';
import { Form, Icon, Button, Input } from 'antd';
const FormItem = Form.Item;
import { createHistory } from 'history';
import { post } from 'utils/request';
var md5 = require('md5')

const history = createHistory();

class NormalLoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      err_msg: '',
    }
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    let company_name = "";
    let user_name = "";
    if (localStorage.getItem("company_name") != null && localStorage.getItem("user_name") != null) {
      company_name = localStorage.getItem("company_name");
      user_name = localStorage.getItem("user_name");
    }
    let { err_msg } = this.state;
    return (
      <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
        <FormItem>
          {getFieldDecorator('companyName', {
            rules: [{ required: true, message: '请输入公司名称!' }],
            initialValue:company_name,
          })(
            <Input prefix={<Icon type="solution" style={{ fontSize: 13 }} />} placeholder="公司名称" maxLength="64" />
            )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入用户名!' }],
            initialValue:user_name,
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" maxLength="20" />
            )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" onKeyDown={this.handleKeyDown} maxLength="32" />
            )}
        </FormItem>
        <FormItem>
          <span style={{ color: 'red' }}>{err_msg}</span>
          <Button type="primary" htmlType="submit" className="login-btn">
            登 录
          </Button>
        </FormItem>
      </Form>
    );
  }

  handleKeyDown(event) {
    if (event.key == 'Enter') {
      handleSubmit(event);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let { companyName, userName, password } = values;
        password = password;//md5(password);
        post("http://120.79.128.100/device-manager", "user_login_with_user_name", { company_name: companyName, user_name: userName, pwhsh: password })
          .done((data) => {
            localStorage.setItem("company_name", companyName);
            localStorage.setItem("user_name", userName);
            sessionStorage.setItem("username", data.name);
            sessionStorage.setItem("userid", data.role_id);
            sessionStorage.setItem("login", "Y");
            sessionStorage.setItem('token', data.token);
            sessionStorage.setItem('companyid', data.company_id);
            sessionStorage.setItem('org_id', data.org_id);
            sessionStorage.setItem('_id', data.id);
            if (data.length && data.role_id == '[201]') {
              sessionStorage.setItem("role", 'productmanager')
            }
            // else if(data.length && data.roles == '[203]'){
            //   sessionStorage.setItem("role", 'productmanager')
            // }

            let result = getPermission(data.token);
            if (result.result.code == "0") {
              if (result.data.length == 0) {
                this.setState({ err_msg: "暂无权限！" });
              } else {
                let datas = result.data;
                let id_array = [];
                for (let i = 0; i < datas.length; i++) {
                  id_array.push(datas[i].id);
                }
                if (in_array(13, id_array) == true) { //数据大屏ID为13，存在，则跳转到数据大屏
                  location.href = "/dtm/datashow";
                } else {
                  location.reload();
                }

              }
            } else {
              this.setState({ err_msg: result.result.msg });
              sessionStorage.setItem("login", "N")
            }

            setTimeout(() => {
              this.setState({ err_msg: "" });
            }, 2000);


          })
          .fail((err) => {
            let err_msg = "";
            if (JSON.parse(err).result.msg == null) {   //接口部分返回错误信息为null时
              err_msg = "用户名或密码无效";
            } else {
              err_msg = JSON.parse(err).result.msg;
            }
            this.setState({ err_msg: err_msg });
            setTimeout(() => {
              this.setState({ err_msg: "" });
            }, 2000);
            sessionStorage.setItem("login", "N")
          })
      }
    });

    //获取用户权限
    function getPermission(token) {
      var param = {
        "header": {
          "token": token
        },
        "data": {
          "payload_type": "api",
          "description": {
            "type": "auth",
            "id": "company_admin_get_user_permission",
            "params": {
            }
          }
        }
      };
      let result;
      $.ajax({
        url: "http://120.79.128.100/device-manager",
        type: "POST",
        async: false,
        cache: false,
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(param),
        success: function (data) {
          result = data;
        },
        error: function (err) {
          result = 0;
        }
      });

      return result;
    }

    //数组中的某个字符是否存在
    function in_array(stringToSearch, arrayToSearch) {
      for (let s = 0; s < arrayToSearch.length; s++) {
        let thisEntry = arrayToSearch[s];
        if (thisEntry == stringToSearch) {
          return true;
        }
      }

      return false;
    }
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default class Login extends React.Component {
  render() {
    return (
      <div ref="me" className="login-container">
        <div className="container">
          <div className="form-signin">
            <div className="form-signin-heading text-center">
              {/*<img src="./src/images/logo.png" alt="" />*/}
              <span>Bear</span>
            </div>
            <div className="login-wrapper">
              <WrappedNormalLoginForm />
            </div>
          </div>
        </div>
      </div>
    )
  }
  login() {
    var user = {
      username: 'admin',
      userNickname: 'Super Admin',
    }
    /*localStorage.login = true;*/
    /*sessionStorage.setItem('username', )*/
    /*localStorage.setItem('user', JSON.stringify(user));*/
    location.reload()
  }
}