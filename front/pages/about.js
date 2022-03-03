import { useSelector } from 'react-redux';
import Head from 'next/head';
import { END } from 'redux-saga';

import { Avatar, Card } from 'antd';
import Layout from '../components/Layout';
import wrapper from '../store/configureStore';
import { LOAD_USER_REQUEST } from '../reducers/user';

const Profile = () => {
  const { userInfo } = useSelector((state) => state.user);

  return (
    <Layout>
      <Head>
        <title>MINJI | NodeBird</title>
      </Head>
      {userInfo
        ? (
          <Card
            actions={[
              <div key="twit">
                피드
                <br />
                {userInfo.Posts}
              </div>,
              <div key="following">
                팔로잉
                <br />
                {userInfo.Followings}
              </div>,
              <div key="follower">
                팔로워
                <br />
                {userInfo.Followers}
              </div>,
            ]}
          >
            <Card.Meta
              avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
              title={userInfo.nickname}
              description="노드버드 매니아"
            />
          </Card>
        )
        : null}
    </Layout>
  );
};


export const getStaticProps = wrapper.getStaticProps(async (context) => {
  context.store.dispatch({
    type: LOAD_USER_REQUEST,
    data: 7
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise()
})

export default Profile;