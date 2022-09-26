import React from 'react';

const Posts = ({ posts, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <ul className='list-group mb-4'>
      {posts.map(post => (
        <li key={post.id} className='list-group-item'>
          <img className="avatar" src={post.image} alt="User" />
          <div>
            <p>{post.name}</p>
            <p>{post.phone}   |    {post.email}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Posts;
