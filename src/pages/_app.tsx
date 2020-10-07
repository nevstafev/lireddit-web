import { CSSReset, ThemeProvider } from '@chakra-ui/core';
import theme from '../theme';
import { withApollo } from '../utils/withApollo';

function MyApp({ Component, pageProps }: any) {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default withApollo({ ssr: true })(MyApp);
