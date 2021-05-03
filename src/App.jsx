import React, { Suspense } from 'react'
import { Maps, Memo, Overlay } from './components'

function App() {
  return (
    <div className="relative">
      <Suspense fallback={null}>
        <Maps />
      </Suspense>
      <Memo />
      <Overlay />
    </div>
  )
}

export default App
