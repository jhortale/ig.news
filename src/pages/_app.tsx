import { AppProps } from 'next/dist/next-server/lib/router/router'
import { Provider as NextAuthProvider } from 'next-auth/client'
import { Header } from '../components/Header'
import '../styles/global.scss'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <NextAuthProvider session={pageProps.session}>
      <Header />
      <Component {...pageProps} />
    </NextAuthProvider>
  )
}

export default MyApp
