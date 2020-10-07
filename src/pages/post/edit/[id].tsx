import { Box, Button } from '@chakra-ui/core';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import { InputField } from '../../../components/InputField';
import { Layout } from '../../../components/Layout';
import {
  usePostQuery,
  useUpdatePostMutation,
} from '../../../generated/graphql';
import { useGetIntId } from '../../../utils/useGetIntId';
import { withApollo } from '../../../utils/withApollo';

const EditPost: React.FC = () => {
  const router = useRouter();
  const [updatePost] = useUpdatePostMutation();
  const postId = useGetIntId();
  const { data, loading } = usePostQuery({ variables: { id: postId } });
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
    <Layout variant="small">
      <Formik
        initialValues={{ title: data.post.title, text: data.post.text }}
        onSubmit={async (values) => {
          const { errors } = await updatePost({
            variables: { id: postId, title: values.title, text: values.text },
          });
          if (!errors) {
            router.back();
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="title" placeholder="title" label="Title" />
            <Box mt={4}>
              <InputField
                textarea
                name="text"
                placeholder="text..."
                label="Body"
              />
            </Box>
            <Button
              mt={4}
              type="submit"
              variantColor="teal"
              isLoading={isSubmitting}
            >
              update post
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withApollo({ ssr: false })(EditPost);
