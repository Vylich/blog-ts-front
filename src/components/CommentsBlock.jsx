import React from 'react';
import { useSelector } from 'react-redux';

import { SideBlock } from './SideBlock';

import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Skeleton from '@mui/material/Skeleton';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';





export const CommentsBlock = ({
  items,
  children,
  onRemoveComment,
  isLoading = true,
}) => {
  const userData = useSelector((state) => state.auth.data);

  return (
    <SideBlock title="Комментарии">
      <List>
        {(isLoading ? [...Array(5)] : items).map((obj, index) => (
          <React.Fragment key={index}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                {isLoading ? (
                  <Skeleton variant="circular" width={40} height={40} />
                ) : (
                  <Avatar
                    alt={obj.user.fullName}
                    src={`${process.env.REACT_APP_API_URL}${obj.user.avatarUrl}`}
                  />
                )}
              </ListItemAvatar>
              {isLoading ? (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Skeleton variant="text" height={25} width={120} />
                  <Skeleton variant="text" height={18} width={230} />
                </div>
              ) : (
                <>
                  <ListItemText
                    primary={obj.user.fullName}
                    secondary={obj.text}
                  />

                  {userData._id === obj.user._id && (
                    <div>
                      <IconButton aria-label="delete" onClick={() => onRemoveComment(obj._id)} size="small">
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </div>
                  )}
                </>
              )}
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
      {children}
    </SideBlock>
  );
};
