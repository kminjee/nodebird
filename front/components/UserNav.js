import Link from "next/link";
import { Menu, Input, Button } from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { logoutRequestAction } from "../reducers/user";

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

const UserNav = () => {

  const dispatch = useDispatch()
  const { logoutLoading } = useSelector((state) => state.user) 

  const onLogout = useCallback(() => {
    dispatch(logoutRequestAction())
  }, [])

  return (
    <Menu mode="horizontal">
      <Menu.Item key="home">
        <Link href="/"><a>홈</a></Link>
      </Menu.Item>
      <Menu.Item key="search">
        <SearchInput />
      </Menu.Item>
      <Menu.Item key="profile">
        <Link href="/profile"><a>프로필</a></Link>
      </Menu.Item>
      <Menu.Item key="signup">
        <Button onClick={onLogout} loading={logoutLoading}>로그아웃</Button>
      </Menu.Item>
    </Menu>
  )
}

export default UserNav;