import Link from 'next/link';
import Head from 'next/head';

export default function FirstPost() {
  return (
    <>
      <Head>
        <title>First Post 2</title>
      </Head>
      <h1>First Post</h1>
      <h2>
        <Link href="/">Back to homes</Link>
      </h2>
      <h2>
        <a href="https://www.google.com">Go to google</a>
      </h2>
    </>
  );
}

