import { useSelector } from "react-redux";
import Layout from "../components/Layout";

import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';

const Home = () => {

  const { me } = useSelector((state) => state.user)
  const { mainPosts } = useSelector((state) => state.post)

  return (
    <Layout>
      {me && <PostForm /> }
      {mainPosts.map(post => <PostCard key={post.id} post={post} />)}
    </Layout>
  )
}

export default Home;