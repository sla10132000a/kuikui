import '../styles/globals.css'
import { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { useState, useEffect } from 'react'
import { store } from '../app/store'
import { Provider } from 'react-redux'


function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())
  
  useEffect(() => {

    window.addEventListener("error", event => {
      alert(event.error);
    });
    window.addEventListener("unhandledrejection", event => {
      alert(event.reason);
    });

    return () => {
     window.removeEventListener("error", event => {
      alert(event.error);
    });
     window.removeEventListener("unhandledrejection", event => {
      alert(event.reason);
    });
    }
  },[]);

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default MyApp
