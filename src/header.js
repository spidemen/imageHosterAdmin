import React, { Component } from "react";
import { Layout, Menu} from "antd";
import { Link } from "react-router-dom";
import Icon from '@ant-design/icons';
const { Header } = Layout;
const { SubMenu } = Menu;
class Header1 extends Component {
  state = {
    current: "myhome",
    menuStyle: "horizontal"
  };

  componentDidMount() {
    this.updateMenu();
    window.addEventListener("resize", this.updateMenu);
  }

  updateMenu = () => {
    if (window.innerWidth > 600) {
      this.setState({ menuStyle: "horizontal" });
    } else {
      this.setState({ menuStyle: "vertical" });
    }
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateMenu);
  }

  handleClick = e => {
    this.setState({ current: e.key });
  };

  render() {
    const horizontalMenu = (
      <Header className="header">
        <Menu
          theme="dark"
          mode="horizontal"
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          style={{ lineHeight: "64px" }}
        >
          <Menu.Item key="myhome" className="menu-left">
            <Link
              to={{
                pathname: "/"
              }}
            >
              <Icon type="home" />
              Home
            </Link>
          </Menu.Item>
          <Menu.Item key="admin" className="menu-left">
            <Link
              to={{
                pathname: "/admin"
              }}
            >
              <Icon type="info-circle" />
               admin user
            </Link>
          </Menu.Item>
          <Menu.Item key="login" className="menu-left">
            <Link
              to={{
                pathname: "/login"
              }}
            >
              <Icon type="info-circle" />
               login
            </Link>
          </Menu.Item>

        </Menu>
      </Header>
    );

    const verticalMenu = (
      <Menu
        theme="dark"
        onClick={this.handleClick}
        style={{ width: window.width }}
        defaultOpenKeys={["sub1"]}
        selectedKeys={[this.state.current]}
        mode="inline"
      >
        <SubMenu
          key="sub1"
          title={
            <span>
              <Icon type="mail" />
              <span>Menu</span>
            </span>
          }
        >
          <Menu.Item key="myhome" className="menu-left">
            <Link
              to={{
                pathname: "/"
              }}
            >
              <Icon type="home" />
              Home
            </Link>
          </Menu.Item>
          <Menu.Item key="admin" className="menu-left">
            <Link
              to={{
                pathname: "/admin"
              }}
            >
              <Icon type="info-circle" />
              admin user
            </Link>
          </Menu.Item>
          <Menu.Item key="login" className="menu-left">
            <Link
              to={{
                pathname: "/login"
              }}
            >
              <Icon type="info-circle" />
              login
            </Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    );
    const menu =
      this.state.menuStyle === "horizontal" ? horizontalMenu : verticalMenu;
    return <div>{menu}</div>;
  }
}

export default Header1;