import axios from '../../axios';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Post } from '../Post';

import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

export const CurrentTagBlock = ({key}) => {
  const { id } = useParams();
  const userData = useSelector((state) => state.auth.data);
  const [posts, setPosts] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const isPostsLoading = posts.status === 'loading';
  React.useEffect(() => {
    axios
      .get(`/tags/${id}`)
      .then((res) => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert('bad posts');
      });
  }, []);

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }

  return (
    <>
      <Typography variant="h3" marginBottom={2}>
        {id}
      </Typography>
      <Grid container spacing={3}>
        {(isPostsLoading ? [...Array(5)] : posts).map((obj, index) =>
          isPostsLoading ? (
            <Post key={index} isLoading={true} />
          ) : (
            <Grid xs={6} item>
              <Post
                key={index}
                id={obj._id}
                title={obj.title}
                imageUrl={
                  obj.imageUrl ? `${obj.imageUrl}` : ''
                }
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={obj.comments.length}
                tags={obj.tags ? obj.tags : ''}
                isEditable={userData?._id === obj.user._id}
              />
            </Grid>
          )
        )}
      </Grid>
    </>
  );
};
