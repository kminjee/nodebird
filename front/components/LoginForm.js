import { useState, useCallback } from 'react';
import { Button, Form, Input } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';

const BtnWrap = styled.div`
  margin-top: 10px;
`

const FormWrap = styled(Form)`
  padding: 10px;
`

// 'setIsLoggedIn' props에는 Layout.js의 setIsLoggedIn이 넘어온다.
const LoginForm = ({ setIsLoggedIn }) => {

  const [id, setId] = useState('')
  const [password, setPassword] = useState('')

  const onChangeId = useCallback((e) => {
    setId(e.target.value)
  }, []);

  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value)
  }, []);

  // setIsLoggendIn을 true로 넘겨주면 Layout.js에서 만든 isLoggedIn state값이 true로 변경된다.
  // 여기서 [id, password]는 id, password값이 바뀔때마다 onSubmitForm을 실행한다.
  const onSubmitForm = useCallback(() => {
    console.log(id, password);
    setIsLoggedIn(true)
  }, [id, password]);

  return (
    <FormWrap onFinish={onSubmitForm}>
      <div>
        <label htmlFor="user-id">ID</label>
        <br />
        <Input 
          name="user-id" 
          type="text" 
          value={id} 
          onChange={onChangeId} 
          autoComplete="on"
          required 
        />
      </div>
      <div>
        <label htmlFor="user-password">PASSWORD</label>
        <br />
        <Input 
          name="user-password" 
          type="password"
          value={password} 
          onChange={onChangePassword} 
          autoComplete="on"
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