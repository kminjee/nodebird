import { useState, useCallback, useEffect } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { Form, Input, Button, Checkbox } from 'antd';
import Layout from '../components/Layout';
import useInput from '../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { SIGN_UP_REQUEST } from '../reducers/user';
import Router from "next/router";

const ErrorMessage = styled.div`
  color: red;
`
const StyledForm = styled(Form)`
  margin-top: 60px;

  & h1 {
    margin-top: 50px;
    text-align: center;
    color: #1890ff;
  }

  & div {
    text-align: center;
  }

  .termbox {
    max-width: 500px;
    margin: 0 auto;
    padding: 15px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  & div > input {
    max-width: 500px;
  }

  & Button {
    margin-top: 10px;
  }
`

const Signup = () => {

  const dispatch = useDispatch()
  const { signupLoading, signupDone, signupError } = useSelector((state) => state.user)

  useEffect(() => {
    if (signupDone) {
      Router.push('/');
    }
  }, [signupDone])

  useEffect(() => {
    if (signupError) {
      alert(signupError);
    }
  }, [signupError])

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
      <StyledForm onFinish={onSubmit}>
        <h1>회원가입</h1>
        <div>
          <label htmlFor="user-email"></label>
          <br />
          <Input name="user-email" type="text" value={email} onChange={onChangeEmail} placeholder="이메일" autoComplete='off' required />
        </div>
        <div>
          <label htmlFor="user-nick"></label>
          <br />
          <Input name="user-nick" type="text" value={nickname} onChange={onChangeNickname} placeholder="닉네임" autoComplete='off' required />
        </div>
        <div>
          <label htmlFor="user-pw"></label>
          <br />
          <Input name="user-pw" type="password" value={password} onChange={onChangePassword}placeholder="비밀번호" autoComplete="off" required />
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
            autoComplete="off" 
            required 
          />
          {passwordError && <ErrorMessage>비밀번호가 다릅니다.</ErrorMessage>}
        </div>
        <div className="termbox">
          <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>만 14세 이상입니다. (필수)</Checkbox>
          {termError && <ErrorMessage>이용 약관에 동의하세요.</ErrorMessage>}
          <Button type="primary" htmlType="submit" loading={signupLoading}>회원가입</Button>
        </div>
      </StyledForm>
    </Layout>
  )
  
}

export default Signup;