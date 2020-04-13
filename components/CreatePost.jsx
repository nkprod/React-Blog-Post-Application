import React, { useState } from 'react';
import { PageHeader, Input, Button } from 'antd';
import db from '../firebase';
import { useHistory } from 'react-router-dom';

const { TextArea } = Input;

const CreatePost = (props) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  let history = useHistory();

  const onTitleChange = (e) => setTitle(event.target.value);
  const onContentChange = (e) => setContent(event.target.value);
  const onCreatePost = () => {
    let postRef = db.collection('post');

    let payload = {
      title,
      content,
    };

    postRef.add(payload).then((docRef) => {
      console.log('The post was susccessfully added to the document');
    });

    setTitle('');
    setContent('');
    history.push('/posts');
  };
  return (
    <div className='create_post_container'>
      <div className='page_header_container'>
        <PageHeader
          style={{
            border: '1px solid rgb(235, 237, 240)',
          }}
          className='site-page-header'
          title={'Create Post'}
        />
      </div>
      <div className='post_inputs_container'>
        <div className='post_input_container'>
          <div className='post_input_title'>
            <h2>Post Title</h2>
          </div>
          <div className='post_input'>
            <Input
              placeholder='Post Title'
              value={title}
              onChange={onTitleChange}
            />
          </div>
        </div>
        <div className='post_input_container'>
          <div className='post_input_title'>
            <h2>Post Content</h2>
          </div>
          <div className='post_input'>
            <TextArea
              value={content}
              rows={12}
              placeholder='Post Content'
              onChange={onContentChange}
            />
          </div>
          <div className='post_input_button'>
            <Button type='primary' size='large' onClick={onCreatePost}>
              Create Post
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
