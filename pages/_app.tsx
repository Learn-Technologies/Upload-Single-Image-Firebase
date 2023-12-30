import { initFirebase } from "@/src/components/services/FirebaseService";
import "@/styles/globals.css";
import { ThemeProvider } from "@material-tailwind/react";
import type { AppProps } from "next/app";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  React.useEffect(() => {
    initFirebase();
  }, []);
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
