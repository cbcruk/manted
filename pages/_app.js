import { Provider } from 'jotai'
import 'tailwindcss/tailwind.css'
import '../styles/globals.css'

function App({ Component, pageProps }) {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  )
}

export default App
