import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function FirstPost() {
  const router = useRouter()

  const handleDisconnect = (e) => {
    // setLikes(likes + 1);
    // Pass data to a backend api to connect to IoT Hub
    // Navigate to a different page
    console.log('hello')
    e.preventDefault()
    router.push('/')
  }

  return (
    <>
      <Head>
        <title>Device</title>
      </Head>
      <h1>Device</h1>

      <label>Connected!</label>
      <button type="button" onClick={handleDisconnect}>Disconnect</button>

      <button type="checkbox">Ghost Mode</button>

      <hr></hr>
      <label>DTMI: </label>
      <label>Digital Twin Model ID (DTDL)</label>

      <hr></hr>
      <label>Property Name: </label>
      <label>Property Type: </label>
      <label>Property Value: </label>

      <hr></hr>
      <label>Property Name: </label>
      <label>Property Type: </label>
      <label>Property Value: </label>

      {/* <h2>
        <Link href="/">Back to homes</Link>
      </h2> */}
      
      {/* <h2>
        <a href="https://www.google.com">Go to google</a>
      </h2> */}
    </>
  );
}

