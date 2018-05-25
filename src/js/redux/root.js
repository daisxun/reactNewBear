import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import { createHistory } from 'history';
import history from 'history_instance';
import { Provider } from 'react-redux'
import { store } from './store'
import { Entry, NoPermission } from './components/common/pc_body';
import MediaQuery from 'react-responsive';
import config from 'config/app.config';
import authList from 'config/auth.config';
let components = {};

/**
 * 有无该权限
 * @param  {String} auth 权限名
 */
export default function validate(auth) {
  var role = sessionStorage.getItem("role");
  var login = sessionStorage.getItem("Y");
  var m = config;
  //特殊情况
  if (!config.test_auth || role == 'admin') {
    return true;
  }
  var permissions = authList.auth[role];
  return permissions.some(n => n === auth);
}
/**
 * 注意，路由的权限控制存在于两部分，一部分在react-router当中，一部分在nav当中;
 * 该方法用于react-router当中，进行权限控制
 * @param  {String} auth 权限名
 */
export function onEnter(auth) {
  return function (state, replace) {
    //登录成功之后，才有必要进行validate
    if (sessionStorage.getItem("login") == 'Y') {
      if (!validate(auth)) {
        replace({}, '/403', null);
        return false;
      }
    }
    return true;
  }
}

const getComponents = (routePath, accessControl) => (nexState, replace, callback) => {
  if (accessControl && !accessControl(nexState, replace)) {
    return;
  }
  switch (routePath) {
    case 'workflow':
      require.ensure([], require => {
        components.workflowPannel = require('./components/workflow/design').default;
        callback();
      })
      break;   

  }  
}

const get = componentName => (location, callback) => {
  callback(undefined, components[componentName]);
}

const Root = () => (
  //这里替换了之前的Index,变成了程序的入口
  <Provider store={store}>
    <div>

      <MediaQuery query='(min-device-width: 10px)'>
        <Router history={history}>
          <Route path="/" component={Entry}>
           <Route path="workflow" onEnter={getComponents('workflow')}>
              <Route path='design' getComponents={get('workflowPannel')} />
            </Route> 
            <Route path="403" component={NoPermission} />
          </Route>
        </Router>
      </MediaQuery>
    </div>
  </Provider>
)

ReactDOM.render(<Root />, document.getElementById('mainContainer'));