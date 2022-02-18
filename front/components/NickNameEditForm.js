import { Form, Input } from 'antd';
import styled from 'styled-components';


const StyledForm = styled(Form)`
  marginBottom: 20px;
  border: 1px solid #D9D9D9;
  padding: 20px;
`

const NicnameEditForm = () => {
  return (
    <StyledForm>
      <Input.Search addonBefore="nickname" enterButton="edit" />
    </StyledForm>
  )
}

export default NicnameEditForm;