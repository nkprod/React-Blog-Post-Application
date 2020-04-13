import React, { useState } from 'react';
import { PageHeader, Input, Button } from 'antd';
import { auth } from '../firebase';

const SignIn = (props) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const onEmailChange = (event) => setEmail(event.target.value);
  const onPasswordChange = (event) => setPassword(event.target.value);

  const onSignIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(function (result) {
        console.log('user has successfully sign in');
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className='sign-up-container'>
      <div className='page_header_container'>
        <PageHeader
          style={{
            border: '1px solid rgb(235, 237, 240)',
          }}
          className='site-page-header'
          title='Sign In'
        />
      </div>
      <div className='sign-up-container-inputs' style={{ marginTop: '20px' }}>
        <div className='post_input_container'>
          <div className='post_input_title'>
            <h2>Email</h2>
          </div>
          <div className='post_input'>
            <Input placeholder='Email' onChange={onEmailChange} />
          </div>
        </div>
        <div className='post_input_container'>
          <div className='post_input_title'>
            <h2>Password</h2>
          </div>
          <div className='post_input'>
            <Input.Password
              placeholder='Password'
              onChange={onPasswordChange}
            />
          </div>
        </div>
        <div style={{ width: '100%' }}>
          <div style={{ float: 'left' }}>
            <a href='/sign_up'>Don't have an account? </a>
          </div>

          <div className='post_input_button'>
            <Button type='primary' size='large' onClick={onSignIn}>
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
