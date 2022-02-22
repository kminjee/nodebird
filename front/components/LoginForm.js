import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { Button, Form, Input } from 'antd';
import styled from 'styled-components';

import useInput from '../hooks/useInput';
import { loginRequestAction } from '../reducers/user';



const BtnWrap = styled.div`
  margin-top: 10px;
`

const FormWrap = styled(Form)`
  padding: 10px;
`

const LoginForm = () => {

  const dispatch = useDispatch();
  const { loginLoading } = useSelector((state) => state.user)

  const [email, onChangeemail] = useInput('')
  const [password, onChangePassword] = useInput('')

  const onSubmitForm = useCallback(() => {
    dispatch(loginRequestAction({ email, password }));
  }, [email, password])

  return (
    <FormWrap onFinish={onSubmitForm}>
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
      <BtnWrap>
        <Button type="primary" htmlType="submit" loading={loginLoading}>로그인</Button>
        <Link href="/signup"><a><Button>회원가입</Button></a></Link>
      </BtnWrap>
    </FormWrap>
  )
}

export default LoginForm;