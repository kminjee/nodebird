import { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Input, Row, Col } from 'antd';
import styled from 'styled-components';

import LoginForm from './LoginForm';
import UserProfile from './UserProfile';

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`

const Layout = ({ children }) => {
  console.log(children)
  // LoginForm.js 에서 setIsLoggedIn을 true로 변경하면 아래 삼항연산자에서 true값일 때 넘어가는 UserProfile을 보여준다.
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item key="itme-1">
          <Link href="/"><a>HOME</a></Link>
        </Menu.Item>
        <Menu.Item key="itme-2">
          <Link href="/profile"><a>Profile</a></Link>
        </Menu.Item>
        <Menu.Item key="itme-3">
          <SearchInput />
        </Menu.Item>
        <Menu.Item key="itme-4">
          <Link href="/signup"><a>SignUp</a></Link>
        </Menu.Item>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {isLoggedIn ? <UserProfile setIsLoggedIn={setIsLoggedIn} /> : <LoginForm setIsLoggedIn={setIsLoggedIn} />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a href="https://github.com/minkim94" target="_blank" rel="noreferrer noopener">MINJI GITHUB</a>
        </Col>
      </Row>
    </div>
  )
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};


export default Layout;