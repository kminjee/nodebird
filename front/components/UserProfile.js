import { useCallback } from 'react';
import { Card, Avatar, Button } from 'antd';

const UserProfile = ({ setIsLoggedIn }) => {

  const onLogout = useCallback(() => {
    setIsLoggedIn(false)
  }, [])

  return (
    <Card
      actions={[
        <div key="twit">짹짹<br />0</div>,
        <div key="following">following<br />0</div>,
        <div key="follower">follower<br />0</div>
      ]}
    >
      <Card.Meta 
        avatar={<Avatar>MJ</Avatar>}
        title="MINJI"
      />
      <Button onClick={onLogout}>Logout</Button>
    </Card>
  )
}

export default UserProfile;