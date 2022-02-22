import { useState, useCallback } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { Form, Input, Button, Checkbox } from 'antd';

import Layout from '../components/Layout';
import useInput from '../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { SIGN_UP_REQUEST } from '../reducers/user';

const ErrorMessage = styled.div`
  color: red;
`

const StyledBtn = styled(Button)`
  margin-top: 10px;
`

const Signup = () => {

  const dispatch = useDispatch()
  const { signupLoading } = useSelector((state) => state.user)

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
    dispatch({
      type: SIGN_UP_REQUEST,
      data: { email, password, nickname }
    })
  }, [password, passwordCheck, term])

  return (
    <Layout>
      <Head>
        <meta charSet='utf-8' />
        <title>Signup | NodeBird</title>
      </Head>
      <Form onFinish={onSubmit}>
        <div>
          <label htmlFor="user-email"></label>
          <br />
          <Input name="user-email" type="text" value={email} onChange={onChangeEmail} placeholder="이메일" required />
        </div>
        <div>
          <label htmlFor="user-nick"></label>
          <br />
          <Input name="user-nick" type="text" value={nickname} onChange={onChangeNickname} placeholder="닉네임" required />
        </div>
        <div>
          <label htmlFor="user-pw"></label>
          <br />
          <Input name="user-pw" value={password} onChange={onChangePassword}placeholder="비밀번호" autoComplete="on" required />
        </div>
        <div>
          <label htmlFor="user-pw"></label>
          <br />
          <Input 
            name="user-pw-check" 
            type="password" 
            value={passwordCheck} 
            onChange={onChangePasswordCheck} 
            placeholder="비밀번호 확인" 
            autoComplete="on" 
            required 
          />
          {passwordError && <ErrorMessage>비밀번호가 다릅니다.</ErrorMessage>}
        </div>
        <div>
          <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>만 14세 이상입니다. (필수)</Checkbox>
          {termError && <ErrorMessage>이용 약관에 동의하세요.</ErrorMessage>}
        </div>
        <StyledBtn type="primary" htmlType="submit" loading={signupLoading}>Signup</StyledBtn>
      </Form>
    </Layout>
  )
  
}

export default Signup;