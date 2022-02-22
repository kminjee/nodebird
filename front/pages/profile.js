import Head from 'next/head';
import Layout from '../components/Layout';
import FollowList from '../components/FollowList';
import NicknameEditForm from '../components/NickNameEditForm';
import { useSelector } from 'react-redux';
import Router from "next/router";
import { useEffect } from "react";

const Profile = () => {

  const { me } = useSelector((state) => state.user)

  useEffect(() => {
    if (!(me && me.id)) {
      Router.push('/')
    }
  }, [me && me.id])

  if(!me) {
    return null
  }

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