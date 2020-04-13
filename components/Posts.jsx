import React, { useState, useEffect } from 'react';
import { PageHeader } from 'antd';
import PostSnippet from './PostSnippet';
import 'antd/dist/antd.css';
import _ from 'lodash';

import db from '../firebase';

function Posts(props) {
  const [posts, setPosts] = useState([]);
  console.log('started the user log');
  console.log(props.user);
  console.log('ended the user log');

  useEffect(() => {
    let postRef = db.collection('post');

    postRef.get().then((posts) => {
      posts.forEach((post) => {
        let data = post.data();
        let { id } = post;
        let payload = { id, ...data };

        setPosts((posts) => [...posts, payload]);
      });
    });
  }, []);

  return (
    <div className='posts_container'>
      <div className='page_header_container'>
        <PageHeader
          style={{
            border: '1px solid rgb(235, 237, 240)',
          }}
          className='site-page-header'
          title='Posts'
        />
      </div>
      <div className='articles_conatiner'>
        {_.map(posts, (article, idx) => {
          return (
            <PostSnippet
              key={idx}
              id={article.id}
              title={_.capitalize(article.title)}
              content={article.content.substring(1, 1000)}
              user={props.user}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Posts;
