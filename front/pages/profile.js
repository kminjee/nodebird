import Head from 'next/head';
import Layout from '../components/Layout';
import FollowList from '../components/FollowList';
import NicknameEditForm from '../components/NickNameEditForm';
import { useSelector } from 'react-redux';
import Router from "next/router";
import { useEffect, useState, useCallback } from "react";
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import axios from 'axios';
import wrapper from '../store/configureStore';
import { END } from 'redux-saga';
import useSWR from 'swr';

const fetcher = (url) => axios.get(url, { withCredentials: true }).then((result) => result.data)

const Profile = () => {
  const { me } = useSelector((state) => state.user);
  const [followersLimit, setFollowersLimit] = useState(3);
  const [followingsLimit, setFollowingsLimit] = useState(3);

  const { data: followersData, error: followerError } = useSWR(`http://localhost:3030/user/followers?limit=${followersLimit}`, fetcher);
  const { data: followingsData, error: followingError } = useSWR(`http://localhost:3030/user/followings?limit=${followingsLimit}`, fetcher);

  useEffect(() => {
    if (!(me && me.id)) {
      Router.push('/')
    }
  }, [me && me.id])

  const loadMoreFollowings = useCallback(() => {
    setFollowingsLimit((prev) => prev + 3);
  }, [])

  const loadMoreFollowers = useCallback(() => {
    setFollowersLimit((prev) => prev + 3);
  }, [])

  if (!me) {
    return '내 정보 로딩 중...'
  }

  if (followerError || followingError) {
    console.error(followerError || followingError);
    return <div>팔로잉/팔로워 로딩 중 에러 발생</div>;
  }

  return (
    <>
      <Head>
        <meta charSet='utf-8' />
        <title>Profile | NodeBird</title>
      </Head>
      <Layout>
        <NicknameEditForm />
        <FollowList header="팔로잉" data={followingsData} onClickMore={loadMoreFollowings} loading={!followingsData && !followingError } />
        <FollowList header="팔로워" data={followersData} onClickMore={loadMoreFollowers} loading={!followersData && !followerError } />
      </Layout>
    </>
  )
};


export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  console.log('getServerSideProps start');
  console.log(context.req.headers);
  const cookie = context.req ? context.req.headers.cookie: '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST
  });
  context.store.dispatch(END);
  console.log('getServerSideProps end');
  await context.store.sagaTask.toPromise();
})

export default Profile;