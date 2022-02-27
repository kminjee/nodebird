import { useCallback } from 'react';
import useInput from "../hooks/useInput";
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from 'antd';
import styled from 'styled-components';
import { CHANGE_NICKNAME_REQUEST } from '../reducers/user';


const StyledForm = styled(Form)`
  marginBottom: 20px;
  border: 1px solid #D9D9D9;
  padding: 20px;
`

const NicnameEditForm = () => {

  const { me } = useSelector((state) => state.user)
  const [nickname, onChangeNickname] = useInput(me?.nickname || '')
  const dispatch = useDispatch()


  const onSubmit = useCallback(() => {
    dispatch({
      type: CHANGE_NICKNAME_REQUEST,
      data: nickname
    })
  }, [nickname])

  return (
    <StyledForm>
      <Input.Search
        value={nickname}
        onChange={onChangeNickname}
        onSearch={onSubmit}
        addonBefore="닉네임" 
        enterButton="수정"
      />
    </StyledForm>
  )
}

export default NicnameEditForm;