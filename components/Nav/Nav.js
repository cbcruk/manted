import clsx from 'clsx'

const ITEMS = {
  newcareerpangyo: {
    theme: 'rose',
    latlng: [37.394776, 127.11116],
  },
  newcareergangnam: {
    theme: 'green',
    latlng: [37.497952, 127.027619],
  },
  newcareerjamsil: {
    theme: 'emerald',
    latlng: [37.5132612, 127.1001336],
  },
  newcareermapo: {
    theme: 'purple',
    latlng: [37.549626, 126.914032],
  },
}

function NavButton({ id, className, children }) {
  const { latlng } = ITEMS[id]

  return (
    <button
      className={clsx(
        'inline-flex justify-center items-center p-2 py-1 rounded-2xl text-xs text-neutral-100/90 font-medium whitespace-nowrap transition-all',
        className
      )}
      onClick={() => {
        window.kakaoMap.setLevel(4)
        window.kakaoMap.setCenter(new window.kakao.maps.LatLng(...latlng))
      }}
    >
      {children}
    </button>
  )
}

export function Nav() {
  return (
    <div className="fixed right-2 top-2 z-10 rounded-full">
      <div className="overflow-auto flex gap-1 w-full md:w-80 p-2 rounded-xl shadow-3xl bg-white">
        <NavButton
          id="newcareerpangyo"
          className="bg-rose-700 hover:bg-rose-900"
        >
          판교/분당
        </NavButton>
        <NavButton
          id="newcareergangnam"
          className="bg-green-700 hover:bg-green-900"
        >
          강남/역삼/삼성
        </NavButton>
        <NavButton
          id="newcareerjamsil"
          className="bg-emerald-700 hover:bg-emerald-900"
        >
          잠실/성수
        </NavButton>
        <NavButton
          id="newcareermapo"
          className="bg-purple-700 hover:bg-purple-900"
        >
          마포/여의도/광화문
        </NavButton>
      </div>
    </div>
  )
}
