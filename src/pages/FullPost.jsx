import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from '../axios';
import { useDispatch } from 'react-redux';
import { fetchRemoveComment } from '../redux/slices/posts';

import { Post } from '../components/Post';
import { AddComment } from '../components/AddComment';
import { CommentsBlock } from '../components/CommentsBlock';
import ReactMarkdown from 'react-markdown';

export const FullPost = () => {
  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);
  const [comments, setComments] = React.useState([]);
  const userData = useSelector((state) => state.auth.data);

  const { id } = useParams();
  const dispatch = useDispatch();

  const onSubmit = async (text, setText) => {
    try {
      const field = {
        text: text,
      };
      await axios.post(`/comments/${id}`, field);
      const {data} = await axios.get(`/posts/${id}`);
      setComments(data.comments)
      setText('');
    } catch (err) {
      console.warn(err);
      alert('Bad create comment');
    }
  };

  const onRemoveComment = async (commentId) => {
    if (window.confirm('Are you sure you want remove comment?')) {
      dispatch(fetchRemoveComment(commentId));
      const {data} = await axios.get(`/posts/${id}`);
      setComments(data.comments)
    }
  }

  React.useEffect(() => {
    setComments([])
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setComments(res.data.comments);
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert('Error');
      });
  }, []);

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `http://localhost:5000${data.imageUrl}` : ''}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={comments.length}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock
        onRemoveComment={onRemoveComment}
        isEditable
        items={comments}
        isLoading={isLoading}
      >
        <AddComment user={userData} onSubmit={onSubmit} postId={id}/>
      </CommentsBlock>
    </>
  );
};
