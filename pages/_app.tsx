// /pages/_app.tsx
import '../styles/globals.css';
import type { AppProps } from 'next/app'; // Import AppProps

export default function MyApp({ Component, pageProps }: AppProps) { // Use AppProps to type props

  return (
    <>
      <Component {...pageProps} />
    </>
  );
}
