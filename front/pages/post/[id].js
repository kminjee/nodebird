import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import axios from "axios";
import Head from 'next/head';
import wrapper from "../../store/configureStore";
import { END } from "redux-saga";
import { LOAD_POST_REQUEST } from "../../reducers/post";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import Layout from "../../components/Layout";
import PostCard from "../../components/PostCard";

const Post = () => {
  const { singlePost } = useSelector((state) => state.post);
  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout>
      <Head>
        <title>{singlePost.User.nickname}님의 글</title>
        <meta name="description" content={singlePost.content} />
        <meta property="og:title" content={`${singlePost.User.nickname}님의 게시글`} />
        <meta property="og:description" content={singlePost.content} />
        <meta property="og:image" content={singlePost.Images[0] ? singlePost.Images[0].src : 'https://nodebird.com/favicon.ico'} />
        <meta property="og:url" content={`https://nodebird.com/post/${id}`} />
      </Head>
      <PostCard post={singlePost} />
    </Layout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie: '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({      // 내 정보 불러오기
    type: LOAD_MY_INFO_REQUEST
  });
  context.store.dispatch({      // 단일 게시글 불러오기
    type: LOAD_POST_REQUEST, 
    data: context.params.id
  })
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default Post;