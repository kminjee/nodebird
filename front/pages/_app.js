import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import Head from 'next/head';

const App = ({ Component }) => {
  return (
    <>
      <Component />
      <Head>
        <meta charSet='utf-8' />
        <title>NodeBird</title>
      </Head>
    </>
  
  )
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
}

export default App;