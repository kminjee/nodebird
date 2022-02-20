import { useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addPost } from '../reducers/post'

import { Form, Button, Input } from 'antd';
import styled from 'styled-components';


const StyledForm = styled(Form)`
  margin: 10px 0 20px
`

const PostForm = () => {

  const dispatch = useDispatch()
  const imageInput = useRef()

  const { imagePaths } = useSelector((state) => state.post)
  const [text, setText] = useState('')

  const onChangeText = useCallback((e) => {
    setText(e.target.value)
  }, [])

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click()
  }, [imageInput.current]) 

  const onSubmit = useCallback(() => {
    dispatch(addPost)
    setText('')
  }, [])

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
        <Button onClick={onClickImageUpload}>Image Upload</Button>
        <Button type="primary" style={{ float: 'right '}} htmlType="submit">짹짹</Button>
      </div>
      <div>
        {imagePaths.map(v => (
          <div key={v} style={{ display: 'inline-block' }}>
            <img src={v} style={{ width: '200px' }} alt={v} />
            <div>
              <Button>remove</Button>
            </div>
          </div>
        )
          )}
      </div>
    </StyledForm>
  )
}

export default PostForm;