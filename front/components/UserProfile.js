import { Card, Avatar } from 'antd';
import { useSelector } from 'react-redux';
import Layout from './Layout';
import styled from "styled-components";

const UserProfile = () => {

  const { me } = useSelector((state) => state.user) 

  return (
    <Layout>
      <Card
        actions={[
          <div key="twit">피드<br />{me.Posts.length}</div>,
          <div key="following">팔로잉<br />{me.Followings.length}</div>,
          <div key="follower">팔로워<br />{me.Followers.length}</div>
        ]}
      >
        <Card.Meta 
          avatar={<Avatar>{me.nickname[0]}</Avatar>}
          title={me.nickname}
        />
      </Card>
    </Layout>
  )
}

export default UserProfile;