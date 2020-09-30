import { Box, IconButton, Link } from '@chakra-ui/core';
import React from 'react';
import { useDeletePostMutation, useMeQuery } from '../generated/graphql';
import NextLink from 'next/link';

interface EditDeletePostButtonProps {
  id: number;
  creatorId: number;
}

const EditDeletePostButton: React.FC<EditDeletePostButtonProps> = ({
  id,
  creatorId,
}) => {
  const [, deletePost] = useDeletePostMutation();
  const [{ data: meData }] = useMeQuery();

  if (meData?.me?.id !== creatorId) {
    return null;
  }

  return (
    <Box>
      <NextLink href="/post/edit/[id]" as={`/post/edit/${id}`}>
        <IconButton
          as={Link}
          icon="edit"
          aria-label="Edit post"
          mr={4}
          onClick={() => {}}
        />
      </NextLink>
      <IconButton
        icon="delete"
        aria-label="Delete post"
        onClick={() => {
          deletePost({ id });
        }}
      />
    </Box>
  );
};

export default EditDeletePostButton;
