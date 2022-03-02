import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout";

import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { LOAD_POSTS_REQUEST } from "../reducers/post";
import { LOAD_USER_REQUEST } from "../reducers/user";

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
    dispatch({
      type: LOAD_USER_REQUEST
    })
    dispatch({
      type: LOAD_POSTS_REQUEST,
    });
  }, [])

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

export default Home;