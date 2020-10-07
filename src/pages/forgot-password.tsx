import { Box, Button } from '@chakra-ui/core';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { InputField } from '../components/InputField';
import { Wrapper } from '../components/Wrapper';
import { useForgotPasswordMutation } from '../generated/graphql';
import { withApollo } from '../utils/withApollo';

const ForgotPassword: React.FC<{}> = ({}) => {
  const [forgotPassword, { loading }] = useForgotPasswordMutation();
  const [completed, setCompleted] = useState(false);
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ email: '' }}
        onSubmit={async (values) => {
          await forgotPassword({ variables: { email: values.email } });
          setCompleted(true);
        }}
      >
        {() =>
          completed ? (
            <Box>We sent you an email.</Box>
          ) : (
            <Form>
              <InputField name="email" placeholder="email" label="Email" />
              <Button
                mt={4}
                type="submit"
                variantColor="teal"
                isLoading={loading}
              >
                Send email
              </Button>
            </Form>
          )
        }
      </Formik>
    </Wrapper>
  );
};

export default withApollo({ ssr: false })(ForgotPassword);
