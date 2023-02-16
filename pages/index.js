import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';


export default function Home() {
  const router = useRouter()

  // const handleConnect = (e) => {
  //   // setLikes(likes + 1);
  //   // Pass data to a backend api to connect to IoT Hub
  //   // Navigate to a different page
  //   // console.log('hello')
  //   alert('Connecting')
  //   e.preventDefault()
  //   router.push('/device')
  // }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>
          Generic Simulated Azure IoT <Link href="https://learn.microsoft.com/en-us/azure/iot-develop/overview-iot-plug-and-play">Plug and Play</Link> Device
        </h1>

        

        

        

        

        <hr></hr>
        {/* <button type="button" onClick={handleConnect}>Connect to IoT Hub</button> */}
        <form method="post" action="/api/connect">
          <hr></hr>
          <label>Device Connection String: </label>
          <input type="text" id="deviceConnectionString" name="deviceConnectionString"></input>

          <hr></hr>
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
          <label>DTMI: </label>
          <select id="dtmi" name="dtmi">
            {/* <option value="dtmi:com:example:TemperatureController;1">dtmi:com:example:TemperatureController;1</option> */}
            <option value="dtmi:com:example:TemperatureController;2">dtmi:com:example:TemperatureController;2</option>
            {/* <option value="dtmi:com:example:TemperatureController;3">dtmi:com:example:TemperatureController;3</option> */}
            <option value="dtmi:com:example:TemperatureController;100">dtmi:com:example:TemperatureController;100</option>
          </select>

          <hr></hr>
          <label>Device Model Definition: </label>
          <input></input>

          <hr></hr>
          <input type="submit" value="Connect to IoT Hub"></input>

          <hr></hr>
        </form>

        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>

        <hr></hr>
        <h1 className={styles.title}>
          Learn <a href="https://nextjs.org">Next.js!</a>
          OK5. Read <Link href="/posts/first-post">this page!</Link>
        </h1>

        <p className={styles.description}>
          Get started by editing <code>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel" className={styles.logo} />
        </a>
      </footer>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
