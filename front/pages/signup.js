import { useState, useCallback, useEffect } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import { Form, Input, Button, Checkbox } from 'antd';
import Layout from '../components/Layout';
import useInput from '../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_MY_INFO_REQUEST, SIGN_UP_REQUEST } from '../reducers/user';
import Router from "next/router";
import axios from 'axios';
import wrapper from '../store/configureStore';
import { END } from 'redux-saga';

const ErrorMessage = styled.div`
  color: red;
`;

const StyledBtn = styled(Button)`
  margin-top: 10px;
`

const Signup = () => {
  const dispatch = useDispatch()
  const { signupLoading, signupDone, signupError, me } = useSelector((state) => state.user)

  useEffect(() => {    // 로그인 성공하면 me에 유저 정보가 담겨서 me에 데이터가 존재하면 메인페이지로 이동하게 하는것
    if (me && me.id) {
      Router.replace('/') // 푸쉬하면 뒤로가기하면 이전페이지로 가지고 replace는 기록에서 사라짐
    }
  }, [me && me.id])

  useEffect(() => {
    if (signupDone) {
      Router.replace('/');
    }
  }, [signupDone]);

  useEffect(() => {
    if (signupError) {
      alert(signupError);
    }
  }, [signupError]);

  const [email, onChangeEmail] = useInput('')
  const [nickname, onChangeNickname] = useInput('')
  const [password, onChangePassword] = useInput('')

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
    Router.push('/')
  }, [password, passwordCheck, term])

  return (
    <Layout>
      <Head>
        <meta charSet='utf-8' />
        <title>회원가입 | NodeBird</title>
      </Head>
      <Form onFinish={onSubmit}>
        <div>
          <label htmlFor="user-email"></label>
          <br />
          <Input 
            name="user-email" 
            type="text" 
            value={email} 
            onChange={onChangeEmail} 
            placeholder="이메일"
            autoComplete="off" 
            required 
          />
        </div>
        <div>
          <label htmlFor="user-nick"></label>
          <br />
          <Input 
            name="user-nick" 
            type="text" 
            value={nickname} 
            onChange={onChangeNickname} 
            placeholder="닉네임" 
            autoComplete="off"
            required 
          />
        </div>
        <div>
          <label htmlFor="user-pw"></label>
          <br />
          <Input 
            name="user-pw" 
            type="password" 
            value={password} 
            onChange={onChangePassword} 
            placeholder="비밀번호" 
            autoComplete="off" 
            required 
          />
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
          {passwordError && <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>}
        </div>
        <div>
          <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>만 14세 이상입니다. (필수)</Checkbox>
          {termError && <ErrorMessage>이용 약관에 동의하세요.</ErrorMessage>}
        </div>
        <StyledBtn type="primary" htmlType="submit" loading={signupLoading}>가입하기</StyledBtn>
      </Form>
    </Layout>
  );
};


export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  console.log('getServerSideProps start');
  console.log(context.req.headers);
  const cookie = context.req ? context.req.headers.cookie: '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST
  });
  context.store.dispatch(END);
  console.log('getServerSideProps end');
  await context.store.sagaTask.toPromise();
});

export default Signup;