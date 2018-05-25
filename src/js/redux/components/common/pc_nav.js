import React, { Component } from 'react';

import { Link } from 'react-router';

import nav_config from 'config/nav.config';
import * as _Util from 'utils/index';

import { Menu, Icon } from 'antd';
const { SubMenu, Item } = Menu;


const Util = _Util.default;

const check_active = function (link, path) {
  return link == path || path.startsWith(link);
}

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: "",
      openKeys: [],
    };
  }
  render() {
    /*console.warn(location)*/
    var role = sessionStorage.getItem("role");
    var trans_nav_config = nav_config;
    if (role == 'visitor') {
      trans_nav_config = nav_config.filter(m => m.role == 'visitor')
    }

    var treeDOM = trans_nav_config.map(firstLevelItem => {
      if (Util.core.isArray(firstLevelItem.link)) {
        let secondLevels = firstLevelItem.link.map(secondLevelItem => {
          if (Util.core.isArray(secondLevelItem.link)) {
            let thirdLevels = secondLevelItem.link.map(thirdLevelItem => {
              return (
                <Item key={thirdLevelItem.key}>
                  <Link to={thirdLevelItem.link}>{thirdLevelItem.name}</Link>
                </Item>
              )
            })
            return (
              <SubMenu key={secondLevelItem.key} title={<span className="nav-text">{secondLevelItem.name}</span>}>
                {thirdLevels}
              </SubMenu>
            )
          }
          return (
            <Item key={secondLevelItem.key}>
              <Link to={secondLevelItem.link}>{secondLevelItem.name}</Link>
            </Item>
          )
        })

        return (
          <SubMenu key={firstLevelItem.key} title={<span><Icon type="appstore" /><span className="nav-text">{firstLevelItem.name}</span></span>}>
            {secondLevels}
          </SubMenu>
        )
      }
      else {
        return (
            <Item key={firstLevelItem.key}>
              <Link to={firstLevelItem.link}>{firstLevelItem.name}</Link>
            </Item>
          )
      }
    })
    return (  
      <Menu
        mode="inline"
        openKeys={this.state.openKeys}  //点击当前节点，默认选中当前节点
        selectedKeys={[this.state.current]}
        onOpenChange={this.onOpenChange.bind(this)}
        onClick={this.handleClick.bind(this)}
        style={{ height: '100%', paddingTop: 0 }}
      >

        {treeDOM}
      </Menu>
    );
  }
  componentDidMount() {
    var current_path = location.pathname;

    nav_config.forEach(firstLevelItem => {
      firstLevelItem.link.forEach(secondLevelItem => {
        if (Util.core.isArray(secondLevelItem.link)) {
          secondLevelItem.link.forEach(thirdLevelItem => {
            if (current_path === (thirdLevelItem.link)) {
              var { openKeys } = this.state;
              openKeys.push(firstLevelItem.key);
              openKeys.push(secondLevelItem.key);
              this.setState({ current: thirdLevelItem.key, openKeys })
            }
          })
        }else{
          if (current_path === (secondLevelItem.link)) {
            var { openKeys } = this.state;
            openKeys.push(firstLevelItem.key);
            this.setState({ current: secondLevelItem.key, openKeys })
          }
        }
       
      })
    })
  }
  handleClick(e) {
    // console.log('Clicked: ', e);
    this.setState({ current: e.key });
  }
  onOpenChange(openKeys) {

    this.setState({ openKeys: openKeys });
  }
  getAncestorKeys(key) {
    const map = {
      sub3: ['sub2'],
    };
    return map[key] || [];
  }
}

Nav.defaultProps = {
  onRender: function (role) {
    return true;
  }
}

export default Nav;