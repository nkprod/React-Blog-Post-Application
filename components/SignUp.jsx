import React, { useState } from 'react';
import { PageHeader, Input, Button } from 'antd';
import { auth } from '../firebase';

const SignUp = (props) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const onEmailChange = (event) => setEmail(event.target.value);
  const onPasswordChange = (event) => setPassword(event.target.value);
  const onSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .catch(function (error) {
        // Handle Errors here.
        console.log('error in sign-up', error);
        setEmail('');
        setPassword('');
      });
    setEmail('');
    setPassword('');
  };

  return (
    <div className='sign-up-container'>
      <div className='page_header_container'>
        <PageHeader
          style={{
            border: '1px solid rgb(235, 237, 240)',
          }}
          className='site-page-header'
          title='Sign Up'
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
            <a href='sign_in'>Already have an account? </a>
          </div>

          <div className='post_input_button'>
            <Button type='primary' size='large' onClick={onSignUp}>
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
