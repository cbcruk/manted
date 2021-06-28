import { Suspense } from 'react'
import Head from 'next/head'
import { Maps, Memo, Overlay, Loading } from '../components'

function App() {
  const isBrowser = typeof window !== 'undefined'

  return (
    <div className="relative">
      <Head>
        <title>manted</title>
        <meta
          name="description"
          content="w를 돌리면 m, 그래서 map을 곁들인..."
        />
      </Head>
      {isBrowser && (
        <Suspense fallback={<Loading />}>
          <Maps />
        </Suspense>
      )}
      <Memo />
      {isBrowser && <Overlay />}
    </div>
  )
}

export default App
