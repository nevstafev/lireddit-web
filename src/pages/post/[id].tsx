import { Box, Heading } from '@chakra-ui/core';
import React from 'react';
import EditDeletePostButton from '../../components/EditDeletePostButtons';
import { Layout } from '../../components/Layout';
import { useGetPostFromUrl } from '../../utils/useGetPostFromUrl';
import { withApollo } from '../../utils/withApollo';

const Post: React.FC<{}> = () => {
  const { data, loading } = useGetPostFromUrl();
  if (loading) {
    return (
      <Layout>
        <div>loading...</div>
      </Layout>
    );
  }

  if (!data?.post) {
    return (
      <Layout>
        <Box>Couldn't find post</Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Heading mb={4}>{data?.post?.title}</Heading>
      {data?.post?.text}
      <EditDeletePostButton
        id={data.post.id}
        creatorId={data.post.creator.id}
      />
    </Layout>
  );
};

export default withApollo({ ssr: true })(Post);
