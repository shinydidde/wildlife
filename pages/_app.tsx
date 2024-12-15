// /pages/_app.tsx
import Head from 'next/head';
import '../styles/globals.css';
import type { AppProps } from 'next/app'; // Import AppProps

export default function MyApp({ Component, pageProps }: AppProps) { // Use AppProps to type props

  return (
    <>
    <Head>
                <title>Animal Atlas</title>
                <meta name="description" content="Explore fascinating animals and their habitats. Join us in learning about wildlife conservation." />

                {/* Open Graph Tags */}
                <meta property="og:title" content="Animal Atlas" />
                <meta property="og:description" content="Explore fascinating animals and their habitats. Join us in learning about wildlife conservation." />
                <meta property="og:image" content="/logo-colorful.png" />
                <meta property="og:url" content="https://wildlife-2pl7.onrender.com" />
                <meta property="og:type" content="website" />

                {/* Twitter Card Tags (optional but recommended) */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Animal Atlas" />
                <meta name="twitter:description" content="Explore fascinating animals and their habitats. Join us in learning about wildlife conservation." />
                <meta name="twitter:image" content="/logo-colorful.png" />

                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
            </Head>
      <Component {...pageProps} />
    </>
  );
}
