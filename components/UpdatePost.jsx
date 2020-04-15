import React, { useState, useEffect } from 'react';
import { PageHeader, Input, Button } from 'antd';
import db from '../firebase';
import { useHistory, useParams } from 'react-router-dom';

const { TextArea } = Input;

const UpdatePost = (props) => {
  console.log(props.user);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  let history = useHistory();
  let { id } = useParams();

  useEffect(() => {
    let postRef = db
      .collection('users')
      .doc(props.user.uid)
      .collection('post')
      .doc(id);

    postRef.get().then((doc) => {
      let { content, title } = doc.data();
      setTitle(title);
      setContent(content);
    });
  }, []);

  const onTitleChange = (e) => setTitle(event.target.value);
  const onContentChange = (e) => setContent(event.target.value);

  const onEditPost = () => {
    let postRef = db
      .collection('users')
      .doc(props.user.uid)
      .collection('post')
      .doc(id);

    let payload = {
      title,
      content,
    };

    postRef.update(payload).then((docRef) => {
      console.log('The post was susccessfully updated');
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
            <Button type='primary' size='large' onClick={onEditPost}>
              Edit Post
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePost;
