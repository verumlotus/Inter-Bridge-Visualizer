import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import NavBar from '../components/NavBar'
import ChartOptions from '../components/ChartOptions'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Inter-Bridge Explorer</title>
        <meta name="description" content="Insights and analytics for cross-chain bridges" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/bridge.png" />
      </Head>

      <main className={styles.main}>
      </main>
    </div>
  )
}

export default Home
