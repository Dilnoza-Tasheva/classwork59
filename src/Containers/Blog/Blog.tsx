import { useEffect, useState } from 'react';
import { BlogPost } from '../../types';
import PostCard from '../../Components/PostCard/PostCard.tsx';


const Blog = () => {
  const url = 'https://jsonplaceholder.typicode.com/posts?_limit=10';
  const [count, setCount] = useState<number>(0);
  const [showPostForm, setShowPostForm] = useState<boolean>(true);
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url);

      if (response.ok) {
        let posts = await response.json() as BlogPost[];
        posts = posts.map(post => {
          return {id: post.id, author: 'John Doe', title: post.title}
        });

        setPosts(posts);
      }
    };

    if (posts.length === 0) {
      void fetchData();
    }
  }, [posts.length]);

  const toggleShowPostForm = () => setShowPostForm(prevState => !prevState);


  console.log('[Blog] render');

  const addOnePost = () => {
    setPosts(prevState => [...prevState, {id: String(new Date()), title: 'Happy', author: 'Michael Doe'}])
  };

  let postForm = null;

  if (showPostForm) {
    postForm = (
      <div className="text-center">
        <h4> - Form to add new posts to the page - </h4>
      </div>
    );
  }

  const changeSecondPostCardProps = () => {
    setPosts(prevState => prevState.map((post, index) => {
      if (index === 2) {
        return {
          ...post,
          author: 'Jane Doe'
        }
      }
      return post;
    }))
  };

  return (
    <div className="container">
      <div className="Posts">
        {posts.length === 0 ? <p>No posts</p>:
        <>
          {posts.map(post => (
            <PostCard key={post.id} title={post.title} author={post.author}/>
          ))}
        </>
        }
      </div>
      <hr/>
      <button className="btn btn-primary " onClick={changeSecondPostCardProps}>Change second post author</button>
      <hr/>
      <button onClick={addOnePost} className="btn btn-success m-2">Add one new post</button>
      <button className="btn btn-primary" onClick={toggleShowPostForm}>Toggle form</button>
      {postForm}
      <hr/>
      <div className="my-4">
        <p>Count: {count}</p>
        <button className="btn btn-primary" onClick={() => setCount(prevState => prevState + 1)}>Add +1</button>
      </div>
    </div>

  );
};

export default Blog;