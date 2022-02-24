import Head from 'next/head';
import UserProfile from "../components/UserProfile";
import FollowList from '../components/FollowList';
import NicknameEditForm from '../components/NickNameEditForm';
import { useSelector } from 'react-redux';
import Router from "next/router";
import { useEffect } from "react";
import styled from "styled-components";


const FollowBox = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: 700px;
  display: flex;
  justify-content: space-between;
`


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
      <UserProfile />
      {/* <NicknameEditForm /> */}
      <FollowBox>
        <FollowList header="팔로잉" data={me.Followings} />
        <FollowList header="팔로워" data={me.Followers} />
      </FollowBox>

    </>
  
  )
};

export default Profile;