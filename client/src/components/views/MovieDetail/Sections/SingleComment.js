import React from 'react';
import { List, Avatar, Button } from 'antd';

const SingleComment = ({ comments }) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={comments}
      renderItem={comment => (
        <List.Item
          actions={[
            <Button key="reply">Reply</Button>,
            <Button key="edit">Edit</Button>,
            <Button key="delete" type="danger">Delete</Button>,
          ]}
        >
          <List.Item.Meta
            avatar={<Avatar src={comment.avatar} />}
            title={comment.author}
            description={comment.content}
          />
        </List.Item>
      )}
    />
  );
};

export default SingleComment;
