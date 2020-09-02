import { CSSReset, ThemeProvider } from '@chakra-ui/core';
import theme from '../theme';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';

function MyApp({ Component, pageProps }: any) {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default withUrqlClient(createUrqlClient)(MyApp);
