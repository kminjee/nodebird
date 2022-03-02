import { useRef, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { UPLOAD_IMAGES_REQUEST, REMOVE_IMAGE, ADD_POST_REQUEST } from '../reducers/post'

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

  const onSubmit = useCallback(() => {
    if (!text || !text.trim()) {
      return alert('게시글을 작성하세요.')
    }
    const formData = new FormData();
    imagePaths.forEach((p) => {
      formData.append('image', p);
    })
    formData.append('content', text);
    return dispatch({
      type: ADD_POST_REQUEST,
      data: formData
    })
  }, [text, imagePaths])

  const imageInput = useRef()
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click()
  }, [imageInput.current]) 

  const onChangeImages = useCallback((e) => {
    console.log('images', e.target.files);
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => { 
      imageFormData.append('image', f)
    })
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData
    })
  })

  // 고차함수
  const onRemoveImage = useCallback((index) => () => {
    dispatch({
      type: REMOVE_IMAGE,
      data: index
    })
  });

  return (
    <StyledForm encType="multipart/form-data" onFinish={onSubmit}>
      <Input.TextArea 
        value={text} 
        onChange={onChangeText} 
        maxLength={140} 
        placeholder="How was your day?" 
      />
      <div>
        <input type="file" name="imgae" multiple hidden ref={imageInput} onChange={onChangeImages} />
        <Button onClick={onClickImageUpload}>이미지 선택</Button>
        <Button type="primary" style={{ float: 'right '}} htmlType="submit">등록</Button>
      </div>
      <div>
        {imagePaths.map((v, i) => (
          <div key={v} style={{ display: 'inline-block' }}>
            <img src={`http://localhost:3030/${v}`} style={{ width: '200px' }} alt={v} />
            <div>
              <Button onClick={onRemoveImage(i)}>삭제</Button>
            </div>
          </div>
        )
          )}
      </div>
    </StyledForm>
  )
}

export default PostForm;