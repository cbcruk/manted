import React, { Suspense } from 'react'
import { Maps, Memo, Overlay } from './components'
import Loading from './components/Loading/Loading'

function App() {
  return (
    <div className="relative">
      <Suspense fallback={<Loading />}>
        <Maps />
      </Suspense>
      <Memo />
      <Overlay />
    </div>
  )
}

export default App
