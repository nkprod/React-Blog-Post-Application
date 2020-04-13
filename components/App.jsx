import React, { useState } from 'react';
import Posts from './Posts';
import Post from './Post';
import CreatePost from './CreatePost';
import UpdatePost from './UpdatePost';
import SignUp from './SignUp';
import SignIn from './SignIn';
import 'antd/dist/antd.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import { Menu } from 'antd';
import { EditFilled, ReadFilled } from '@ant-design/icons';
import { auth } from '../firebase';

function App(props) {
  const [user, setUser] = useState(false);

  auth.onAuthStateChanged(function (user) {
    if (user) {
      setUser(user);
    } else {
      console.log('user is not signed in');
    }
  });

  const onSignOut = () => {
    auth.signOut();
    setUser(false);
  };

  return (
    <div className='app_container'>
      <Router>
        <div className='app_main_navigation'>
          <Menu mode='horizontal'>
            <Menu.Item key='posts'>
              <ReadFilled />
              <Link to='/posts'>Posts</Link>
            </Menu.Item>
            {user && (
              <Menu.Item key='create_post'>
                <EditFilled />
                <Link to='/create_post'>Create Post</Link>
              </Menu.Item>
            )}
            <Menu.Item style={{ float: 'right' }}>
              {!user ? (
                <Link to='/sign_in'>Sign In</Link>
              ) : (
                <a onClick={onSignOut}>Sign Out</a>
              )}
            </Menu.Item>
          </Menu>
        </div>

        <Switch>
          <Route exact path='/posts'>
            <Posts user={user} />
          </Route>
          <Route path='/sign_in'>
            <SignIn />
          </Route>
          <Route path='/sign_up'>
            <SignUp />
          </Route>

          <Route path='/post/:id'>
            <Post />
          </Route>
          <Route path='/create_post'>
            <CreatePost />
          </Route>
          <Route path='/update_post/:id'>
            <UpdatePost />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
