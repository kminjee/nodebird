import { List, Button, Card } from 'antd';
import { StopOutlined } from '@ant-design/icons';
import PropTypes  from 'prop-types';
import styled from 'styled-components';


const StyledList = styled(List)`
  marginBottom: 20px;
`
const StyledDiv = styled.div`
  text-align: center;
  margin: 10px 0;
`
const StyledListItem = styled(List.Item)`
  marginTop: 20px;
`


const FollowList = ({ header, data }) => {
  return (
    <StyledList 
      header={<div>{header}</div>}
      size="small"
      grid={{ gutter: 4, xs: 2, md: 3 }}
      loadMore={<StyledDiv><Button>more</Button></StyledDiv>}
      bordered
      dataSource={data}
      renderItem={(item) => (
        <StyledListItem>
          <Card actions={[<StopOutlined key="stop" />]}>
            <Card.Meta description={item.nickname} />
          </Card>
        </StyledListItem> 
      )}
    />
  )
}

FollowList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired
}

export default FollowList;