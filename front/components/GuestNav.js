import Link from "next/link";
import { Menu, Input } from 'antd';
import styled from 'styled-components';

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

const GuestNav = () => {
  return (
    <Menu mode="horizontal">
      <Menu.Item key="home">
        <Link href="/"><a>홈</a></Link>
      </Menu.Item>
      <Menu.Item key="search">
        <SearchInput />
      </Menu.Item>
      <Menu.Item key="notice">
        <Link href="/login"><a>로그인</a></Link>
      </Menu.Item>
      <Menu.Item key="signup">
        <Link href="/signup"><a>회원가입</a></Link>
      </Menu.Item>
    </Menu>
  )
}

export default GuestNav;