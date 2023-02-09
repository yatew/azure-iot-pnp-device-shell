import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Global from './global';

export default function FirstPost() {
  const router = useRouter()

  const handleDisconnect = (e) => {
    // setLikes(likes + 1);
    // Pass data to a backend api to connect to IoT Hub
    // Navigate to a different page
    console.log('hello')

    console.log('Global = ' + JSON.stringify(Global))

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


      {/* client side disconnect cannot get to the server conn obj <button type="button" onClick={handleDisconnect}>Disconnect</button> */}
      <form method="post" action="/api/disconnect">
        {/* <hr></hr>
        <label>Device Certificate: </label>
        <input></input>
        <button type="button">...</button>

        <hr></hr>
        <label>Device ID: </label>
        <input type="text" id="deviceId" name="deviceId"></input>

        <hr></hr>
        <label>DPS ID Scope: </label>
        <input type="text" id="dpsIdScope" name="dpsIdScope"></input>

        <hr></hr>
        <label>Device Model Definition: </label>
        <input></input> */}

        <hr></hr>
        <input type="submit" value="Disconnect"></input>

        <hr></hr>
      </form>

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

