import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Houses from './Houses';

class NavBar extends Component {
  rightNavs = () => {
    return <Menu.Menu position="right" />;
  };

  render() {
    return (
      <div>
        <Menu pointing secondary>
          <Link to="/">
            <Menu.Item name="home" />
          </Link>
          <Link to="/houses">
            <Menu.Item name="houses" />
          </Link>
          {this.rightNavs()}
        </Menu>
      </div>
    );
  }
}

export default NavBar;
