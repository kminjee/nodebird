import Head from 'next/head';
import Layout from '../components/Layout';
import FollowList from '../components/FollowList';
import NicknameEditForm from '../components/NickNameEditForm';
import { useSelector } from 'react-redux';

const Profile = () => {

  const { me } = useSelector((state) => state.user)

  return (
    <>
      <Head>
        <meta charSet='utf-8' />
        <title>Profile | NodeBird</title>
      </Head>
      <Layout>
        <NicknameEditForm />
        <FollowList header="팔로잉" data={me.Followings} />
        <FollowList header="팔로워" data={me.Followers} />
      </Layout>
    </>
  
  )
};

export default Profile;