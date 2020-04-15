import React, { useState, useEffect } from 'react';
import { PageHeader, Card } from 'antd';
import db from '../firebase';
import { useParams } from 'react-router-dom';

const Post = (props) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
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

  return (
    <div className='post_container'>
      <div className='page_header_container'>
        <PageHeader
          style={{
            border: '1px solid rgb(235, 237, 240)',
          }}
          className='site-page-header'
          title={title}
        />
      </div>

      <div className='post_content_container'>
        <Card style={{ marginTop: '20px' }}>
          {content.split('\n').map((line, idx) => {
            return <p key={idx}>{line}</p>;
          })}
        </Card>
      </div>
    </div>
  );
};

export default Post;
