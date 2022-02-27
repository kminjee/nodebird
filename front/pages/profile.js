import Head from 'next/head';
import Layout from '../components/Layout';
import FollowList from '../components/FollowList';
import NicknameEditForm from '../components/NickNameEditForm';
import { useDispatch, useSelector } from 'react-redux';
import Router from "next/router";
import { useEffect } from "react";
import { LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWINGS_REQUEST } from '../reducers/user';


const Profile = () => {

  const dispatch = useDispatch()
  const { me } = useSelector((state) => state.user)

  useEffect(() => {
    dispatch({
      type: LOAD_FOLLOWERS_REQUEST,
    })
    dispatch({
      type: LOAD_FOLLOWINGS_REQUEST
    })
  }, [])

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