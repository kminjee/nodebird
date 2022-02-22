import { useRef, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addPost } from '../reducers/post'

import { Form, Button, Input } from 'antd';
import styled from 'styled-components';
import useInput from '../hooks/useInput';


const StyledForm = styled(Form)`
  margin: 10px 0 20px
`

const PostForm = () => {

  const dispatch = useDispatch()

  const { imagePaths, addPostDone } = useSelector((state) => state.post)
  const [text, onChangeText, setText] = useInput('')

  useEffect(() => {
    if (addPostDone) {
      setText('');
    }
  }, [addPostDone])

  const imageInput = useRef()
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click()
  }, [imageInput.current]) 

  const onSubmit = useCallback(() => {
    dispatch(addPost(text))
  }, [text])

  return (
    <StyledForm encType="multipart/form-data" onFinish={onSubmit}>
      <Input.TextArea 
        value={text} 
        onChange={onChangeText} 
        maxLength={140} 
        placeholder="How was your day?" 
      />
      <div>
        <input type="file" multiple hidden ref={imageInput} />
        <Button onClick={onClickImageUpload}>이미지 선택</Button>
        <Button type="primary" style={{ float: 'right '}} htmlType="submit">등록</Button>
      </div>
      <div>
        {imagePaths.map(v => (
          <div key={v} style={{ display: 'inline-block' }}>
            <img src={v} style={{ width: '200px' }} alt={v} />
            <div>
              <Button>삭제</Button>
            </div>
          </div>
        )
          )}
      </div>
    </StyledForm>
  )
}

export default PostForm;