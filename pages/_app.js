import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <div className="fixed w-screen h-screen bg-sky-400">
      <Component {...pageProps} />
    </div>
  )
}
