import { useCallback, useEffect, useState } from 'react';
import { APIPost, APIUser, BlogPost } from '../../types';
import PostCard from '../../Components/PostCard/PostCard.tsx';
import MakeRequest from '../../helpers/MakeRequest.ts';
import { BASE_URL, POSTS_LIMIT_URL, POSTS_URL, USERS_URL } from '../../constant.ts';
import axios from 'axios';
import DisplayPost from '../../Components/DisplayPost/DisplayPost.tsx';

const Blog = () => {
  const [count, setCount] = useState<number>(0);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [clickPostId, setClickPostID] = useState<null | number>(null);

  const fetchData = useCallback(async () => {
    const responseReq: {data: APIPost[], status: number} = await axios<APIPost[]>(BASE_URL + POSTS_URL + POSTS_LIMIT_URL);
    const postsResponse = responseReq.data;

    const promises = postsResponse.map(async post => {
      const responseUser = await MakeRequest<APIUser>(BASE_URL + USERS_URL + post.userId);
      return{id: post.id, author: responseUser.name, title: post.title};
    });

  setPosts(await Promise.all(promises));
  }, []);


  useEffect(() => {
      void fetchData();
  }, [fetchData]);


  return (
    <div className="container">
      <div className="Posts">
        {posts.length === 0 ? <p>No posts</p>:
        <>
          {posts.map(post => (
            <PostCard
              key={post.id}
              title={post.title}
              author={post.author}
              onClick={() => setClickPostID(post.id)}/>
          ))}
        </>
        }
      </div>
      <hr/>
      <div className="my-4">
        <p>Count: {count}</p>
        <button className="btn btn-primary" onClick={() => setCount(prevState => prevState + 1)}>Add +1</button>
      </div>
      <div>
        <DisplayPost id={clickPostId}/>
      </div>
    </div>

  );
};

export default Blog;