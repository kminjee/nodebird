import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Input } from 'antd';
import styled from 'styled-components';
import Router from "next/router";
import Link from "next/link";

import useInput from '../hooks/useInput';
import { LOG_IN_REQUEST } from '../reducers/user';


const FormWrap = styled(Form)`
  margin-top: 60px;

  & h1 {
    margin-top: 50px;
    text-align: center;
    color: #1890ff;
  }

  & div {
    text-align: center;
  }

  & div > input {
    max-width: 400px;
  }

  & Button {
    display: block;
    width: 100%;
    max-width: 400px;
    margin: 15px auto;
  }
`

const LoginForm = () => {

  const dispatch = useDispatch();
  const { loginLoading } = useSelector((state) => state.user)

  const [email, onChangeemail] = useInput('')
  const [password, onChangePassword] = useInput('')

  const onSubmitForm = useCallback(() => {
    console.log(email, password);
    dispatch({
      type: LOG_IN_REQUEST,
      data: { email, password },
    });
    Router.push('/')
  }, [email, password]);

  return (
    <FormWrap onFinish={onSubmitForm}>
      <h1>로그인</h1>
      <div>
        <label htmlFor="user-email"></label>
        <br />
        <Input 
          name="user-email" 
          type="text" 
          value={email} 
          onChange={onChangeemail} 
          autoComplete="on"
          placeholder="이메일"
          required 
        />
      </div>
      <div>
        <label htmlFor="user-password"></label>
        <br />
        <Input 
          name="user-password" 
          type="password"
          value={password} 
          onChange={onChangePassword}
          autoComplete="on"
          placeholder="비밀번호"
          required 
        />
      </div>
      <Button type="primary" htmlType="submit" loading={loginLoading}>로그인</Button>
      <div><Link href="/signup"><a>아직 회원이 아니신가요?</a></Link></div>
    </FormWrap>
  )
}

export default LoginForm;