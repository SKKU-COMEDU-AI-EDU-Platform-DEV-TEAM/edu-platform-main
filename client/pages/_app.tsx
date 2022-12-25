import "../styles/globals.css";
import type { AppProps } from "next/app";

import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      suspense: true
    }
  }
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <ChakraProvider>
          <ReactQueryDevtools initialIsOpen={true} />
          <Component {...pageProps} />
        </ChakraProvider>
      </RecoilRoot>
    </QueryClientProvider>
  );
}
