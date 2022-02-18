import { useState, useCallback } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { Form, Input, Button, Checkbox } from 'antd';

import Layout from '../components/Layout';
import useInput from '../hooks/useInput';

const ErrorMessage = styled.div`
  color: red;
`

const StyledBtn = styled(Button)`
  margin-top: 10px;
`

const Signup = () => {

  const [email, onChangeEmail] = useInput('')
  const [nickname, onChangeNickname] = useInput('')
  const [password, onChangePassword] = useInput('')


  // setPasswordError = password값과 비교해서 true/false를 passwordError state에 변경 
  const [passwordCheck, setPasswordCheck] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const onChangePasswordCheck = useCallback((e) => {
    setPasswordCheck(e.target.value)
    setPasswordError(e.target.value !== password)
  }, [password])


  const [term, setTerm] = useState('')
  const [termError, setTermError] = useState(false)
  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked)
    setTermError(false)
  }, [])


  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true)
    } 
    if (!term) {
      return setTermError(true)
    }
    console.log(email, nickname, password)
  }, [password, passwordCheck, term])

  return (
    <Layout>
      <Head>
        <meta charSet='utf-8' />
        <title>Signup | NodeBird</title>
      </Head>
      <Form onFinish={onSubmit}>
        <div>
          <labal htmlFor="user-email"></labal>
          <br />
          <Input name="user-email" type="text" value={email} onChange={onChangeEmail} placeholder='Email' required />
        </div>
        <div>
          <labal htmlFor="user-nick"></labal>
          <br />
          <Input name="user-nick" type="text" value={nickname} onChange={onChangeNickname} placeholder='Nick Name' required />
        </div>
        <div>
          <labal htmlFor="user-pw"></labal>
          <br />
          <Input name="user-pw" value={password} onChange={onChangePassword}placeholder="Password" autoComplete="on" required />
        </div>
        <div>
          <labal htmlFor="user-pw"></labal>
          <br />
          <Input 
            name="user-pw-check" 
            type="password" 
            value={passwordCheck} 
            onChange={onChangePasswordCheck} 
            placeholder="Confirm Password" 
            autoComplete="on" 
            required 
          />
          {passwordError && <ErrorMessage>Passwords do not match</ErrorMessage>}
        </div>
        <div>
          <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>Terms And Conditions (Required)</Checkbox>
          {termError && <ErrorMessage>You must agree to our terms & conditions</ErrorMessage>}
        </div>
        <StyledBtn type="primary" htmlType="submit">Signup</StyledBtn>
      </Form>
    </Layout>
  )
  
}

export default Signup;