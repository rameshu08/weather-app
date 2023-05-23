import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import WeatherPage from './weather'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return <QueryClientProvider client={queryClient}>
      {/* <Component {...pageProps} /> */}
      <WeatherPage />
    </QueryClientProvider>
}

export default MyApp
