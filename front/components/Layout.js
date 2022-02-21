import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Input, Row, Col } from 'antd';
import styled from 'styled-components';
import LoginForm from './LoginForm';
import UserProfile from './UserProfile';
import { createGlobalStyle } from 'styled-components';

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;
const Global = createGlobalStyle`
  .ant-row {
    margin-right: 0 !important;
    margin-left: 0 !important;
  }
  .ant-col:first-child {
    padding-left: 0 !important;
  }
  .ant-col:last-child {
    padding-right: 0 !important;
  }
`;


const Layout = ({ children }) => {
  
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn)

  return (
    <div>
      <Global />
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
          {isLoggedIn ? <UserProfile /> : <LoginForm />}
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