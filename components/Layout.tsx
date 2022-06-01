import NavBar from './NavBar'
import Footer from './Footer'
import styles from '../styles/Home.module.css'
import Head from 'next/head'

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Inter-Bridge Explorer</title>
        <meta name="description" content="Insights and analytics for cross-chain bridges" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/bridge.png" />
      </Head>
      <main className={styles.main}>
        <NavBar />
        {children}
        <Footer />
      </main>
    </div>
  )
}