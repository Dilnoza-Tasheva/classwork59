import * as React from 'react';

interface Props {
  title: string;
  author: string;
  onClick: React.MouseEventHandler;
}

const PostCard: React.FC<Props> = React.memo(({title, author, onClick}) => {

  return (
    <div className="PostCard" onClick={onClick}>
      <div><h4>{title}</h4></div>
      <div><p className="Auhtor">{author}</p></div>
    </div>
  );
}, (prevProps, nextProps) => {
  return prevProps.title === nextProps.title && prevProps.author === nextProps.author;
});

export default PostCard;