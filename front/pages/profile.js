import Head from 'next/head';
import Layout from '../components/Layout';
import FollowList from '../components/FollowList';
import NicknameEditForm from '../components/NickNameEditForm';

const Profile = () => {

  const followingList = [
    { nickname: '김낙진' },
    { nickname: '김길순' },
    { nickname: '김민아' }
  ]

  const followerList = [
    { nickname: '김낙진' },
    { nickname: '김길순' },
    { nickname: '김민아' }
  ]


  return (
    <>
      <Head>
        <meta charSet='utf-8' />
        <title>Profile | NodeBird</title>
      </Head>
      <Layout>
        <NicknameEditForm />
        <FollowList header="Following List" data={followingList} />
        <FollowList header="Follower List" data={followerList} />
      </Layout>
    </>
  
  )
};

export default Profile;