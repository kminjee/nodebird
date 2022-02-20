import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Link from 'next/link';

import { Button, Form, Input } from 'antd';
import styled from 'styled-components';

import useInput from '../hooks/useInput';
import { loginAction } from '../reducers/user';



const BtnWrap = styled.div`
  margin-top: 10px;
`

const FormWrap = styled(Form)`
  padding: 10px;
`

const LoginForm = () => {

  const dispatch = useDispatch();

  const [email, onChangeEmail] = useInput('')
  const [password, onChangePassword] = useInput('')

  const onSubmitForm = useCallback(() => {
    dispatch(loginAction({ email, password }));
  }, [email, password])

  return (
    <FormWrap onFinish={onSubmitForm}>
      <div>
        <label htmlFor="user-id"></label>
        <br />
        <Input 
          name="user-email" 
          type="text" 
          value={email} 
          onChange={onChangeEmail} 
          autoComplete="on"
          placeholder="Email"
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
          placeholder="Password"
          required 
        />
      </div>
      <BtnWrap>
        <Button type="primary" htmlType="submit" loading={false}>Login</Button>
        <Link href="/signup"><a><Button>Signup</Button></a></Link>
      </BtnWrap>
    </FormWrap>
  )
}

export default LoginForm;