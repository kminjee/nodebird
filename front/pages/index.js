import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout";
import { END } from "redux-saga";
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { LOAD_POSTS_REQUEST } from "../reducers/post";
import { LOAD_MY_INFO_REQUEST } from "../reducers/user";

import wrapper from '../store/configureStore';
import axios from "axios";

// 프론트-브라우저 실행
const Home = () => {

  const dispatch = useDispatch()
  const { me } = useSelector((state) => state.user)
  const { mainPosts, hasMorePosts, loadPostsLoading, retweetError } = useSelector((state) => state.post)

  useEffect(() => {
    if (retweetError) {
      alert(retweetError)
    }
  }, [retweetError])

  useEffect(() => {
    function onScroll() {
      if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        if (hasMorePosts && !loadPostsLoading) {
          const lastId = mainPosts[mainPosts.length-1]?.id // 처음 로딩하면 mainPosts.0 -1이라 undefined가 되서 방지하기위해 ? 를 붙임.
          dispatch({
            type: LOAD_POSTS_REQUEST,
            lastId
          })
        }
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [hasMorePosts, loadPostsLoading, mainPosts])

  return (
    <Layout>
      {me && <PostForm /> }
      {mainPosts.map(post => <PostCard key={post.id} post={post} />)}
    </Layout>
  )
}


// 프론트-서버에서 실행되는 부분
export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST
  });
  context.store.dispatch({
    type: LOAD_POSTS_REQUEST
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
})

export default Home;