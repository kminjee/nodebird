import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';
import useInput from '../hooks/useInput';

const BtnWrap = styled.div`
  margin-top: 10px;
`

const FormWrap = styled(Form)`
  padding: 10px;
`

const LoginForm = ({ setIsLoggedIn }) => {

  const [email, onChangeEmail] = useInput('')
  const [password, onChangePassword] = useInput('')

  const onSubmitForm = useCallback(() => {
    setIsLoggedIn(true)
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

LoginForm.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired
}

export default LoginForm;