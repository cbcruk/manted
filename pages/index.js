import { Suspense } from 'react'
import Head from 'next/head'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Maps, Memo, Overlay, Loading, ClientOnly } from '../components'
import { handler } from './api/markers'
import { Nav } from '../components/Nav'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

function App({ companies }) {
  return (
    <ClientOnly>
      <QueryClientProvider client={queryClient}>
        <div className="relative">
          <Head>
            <title>manted</title>
            <meta
              name="description"
              content="w를 돌리면 m, 그래서 map을 곁들인..."
            />
          </Head>
          <Suspense fallback={<Loading />}>
            <Maps companies={companies} />
          </Suspense>
          <Memo />
          <Nav />
          <Overlay />
        </div>
      </QueryClientProvider>
    </ClientOnly>
  )
}

export async function getStaticProps() {
  const data = await handler()

  return {
    props: {
      companies: data,
    },
  }
}

export default App
