import * as React from 'react';
import { useEffect, useState } from 'react';
import { BASE_URL, POSTS_URL } from '../../constant.ts';
import { APIPost } from '../../types';
import axios from 'axios';

interface Props {
  id: number | null;
}

const URL_TO_GET_ONE_POST = BASE_URL + POSTS_URL;

const DisplayPost: React.FC<Props> = ({id}) => {
const [post, setPost] = useState<APIPost | null>(null);

  useEffect(() => {
    const getPostById = async () => {
      const responseReq: {data: APIPost, status: number} = await axios<APIPost>(URL_TO_GET_ONE_POST + id);
      setPost(responseReq.data);
    };

    if (id !== null) void getPostById();
    console.log('Display post id = ', id);
  }, [id]);


  return post && (
    <div className="border border-block p-4 mt-4 ">
      <h3>{post.title}</h3>
      <p>{post.body}</p>
    </div>
  );
};

export default DisplayPost;