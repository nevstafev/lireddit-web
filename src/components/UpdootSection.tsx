import { Flex, IconButton } from '@chakra-ui/core';
import React, { useState } from 'react';
import { PostSnippetFragment, useVoteMutation } from '../generated/graphql';

interface UpdootSectionProps {
  post: PostSnippetFragment;
}

const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
  const [loadingState, setLoadingState] = useState<
    'updoot-is-loading' | 'downdoot-is-loading' | 'not-loading'
  >('not-loading');
  const [, vote] = useVoteMutation();

  return (
    <Flex direction="column" alignItems="center" mr={4}>
      <IconButton
        isLoading={loadingState === 'updoot-is-loading'}
        aria-label="updoot the post"
        icon="chevron-up"
        onClick={async () => {
          if (post.voteStatus === 1) {
            return;
          }
          setLoadingState('updoot-is-loading');
          await vote({
            postId: post.id,
            value: 1,
          });
          setLoadingState('not-loading');
        }}
        variantColor={post.voteStatus === 1 ? 'green' : undefined}
      />
      {post.points}
      <IconButton
        aria-label="downdoot the post"
        isLoading={loadingState === 'downdoot-is-loading'}
        icon="chevron-down"
        onClick={async () => {
          if (post.voteStatus === -1) {
            return;
          }
          setLoadingState('downdoot-is-loading');
          await vote({
            postId: post.id,
            value: -1,
          });
          setLoadingState('not-loading');
        }}
        variantColor={post.voteStatus === -1 ? 'red' : undefined}
      />
    </Flex>
  );
};

export default UpdootSection;
