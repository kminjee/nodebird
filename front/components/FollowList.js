import { List, Button, Card } from 'antd';
import { StopOutlined } from '@ant-design/icons';
import PropTypes  from 'prop-types';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { UNFOLLOW_REQUEST, REMOVE_FOLLOWER_REQUEST } from '../reducers/user';


const StyledList = styled(List)`
  marginBottom: 20px;
  width: 100%;
  max-width: 686.5px;
  margin: 0 auto;
`
const StyledDiv = styled.div`
  text-align: center;
  margin: 10px 0;
`
const StyledListItem = styled(List.Item)`
  marginTop: 20px;
`
const StyledCardMeta = styled(Card.Meta)`
  text-align: center;
`

const FollowList = ({ header, data }) => {

  const dispatch = useDispatch()
  const onCancel = (id) => () => {
    if (header === '팔로잉') {
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: id
      })
    }
    dispatch({
      type: REMOVE_FOLLOWER_REQUEST,
      data: id
    })
  }

  return (
    <StyledList 
      header={<div>{header}</div>}
      size="small"
      grid={{ gutter: 4, xs: 2, md: 3 }}
      loadMore={<StyledDiv><Button>더보기</Button></StyledDiv>}
      bordered
      dataSource={data}
      renderItem={(item) => (
        <StyledListItem>
          <Card actions={[<StopOutlined key="stop" onClick={onCancel(item.id)} />]}>
            <StyledCardMeta description={item.nickname} />
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