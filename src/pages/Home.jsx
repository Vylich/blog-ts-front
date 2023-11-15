import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import axios from '../axios';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchComments, fetchPosts, fetchTags } from '../redux/slices/posts';

export const Home = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const { posts, tags, comments } = useSelector((state) => state.posts);
  const [tabsHandler, setTabsHandler] = React.useState(0)



  const isPostsLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';
  const isCommentsLoading = tags.status === 'loading';




  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
    dispatch(fetchComments());

  }, []);

  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={tabsHandler}
        aria-label="basic tabs example"
      >
        <Tab label="Новые" onClick={() => {
          setTabsHandler(0)
          dispatch(fetchPosts('new'));
          }}/>
        <Tab label="Популярные" onClick={() => {
          setTabsHandler(1)
          dispatch(fetchPosts('populate'));
          }}/>
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) =>
            isPostsLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Post
                id={obj._id}
                title={obj.title}
                imageUrl={obj.imageUrl ? `http://localhost:5000${obj.imageUrl}` : ''}
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={obj.comments.length}
                tags={obj.tags ? obj.tags : ''}
                isEditable={userData?._id === obj.user._id}
              />
            )
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock
            items={tags.items ? tags.items : ''}
            isLoading={isTagsLoading}
          />
          <CommentsBlock
            items={comments.items ? comments.items : ''}
            isLoading={isCommentsLoading}
          />
        </Grid>
      </Grid>
    </>
  );
};
