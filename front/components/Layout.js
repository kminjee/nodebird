import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import styled, { createGlobalStyle } from 'styled-components';
import GuestNav from './GuestNav';
import UserNav from './UserNav';

const Global = createGlobalStyle`
  .ant-row {
    margin-right: 0 !important;
    margin-left: 0 !important;
  }
  .ant-col:first-child {
    padding-left: 0 !important;
  }
  .ant-col:last-child {
    padding-right: 0 !important;
  }
`;

const StyledFeedBox = styled(Col)`
  margin-top: 20px;
`;



const Layout = ({ children }) => {
  
  const { me } = useSelector((state) => state.user)

  return (
    <div>
      <Global />
      {me ? <UserNav /> : <GuestNav />}
      <Row gutter={8}>
        <Col xs={24} md={6}>
        </Col>
        <StyledFeedBox xs={24} md={12}>
          {children}
        </StyledFeedBox>
        <Col xs={24} md={6}>
        </Col>
      </Row>
    </div>
  )
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};


export default Layout;