import ContentLoader from 'react-content-loader'

export function Skeleton() {
  return (
    <div className="hidden md:flex flex-col bg-neutral-50">
      <div className="relative sticky top-0 min-w-[120px] max-w-[120px] max-w-full rounded-3xl overflow-hidden aspect-[400/279] bg-neutral-800">
        <div className="absolute bottom-[32px] w-[320px] h-[40px] p-4">
          <ContentLoader
            viewBox="0 0 288 40"
            width={288}
            height={40}
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            speed={2}
          >
            <rect x="0" y="0" rx="6" ry="6" width="200" height="20" />
            <rect x="0" y="24" rx="5" ry="5" width="140" height="12" />
            <circle cx="268" cy="20" r="20" />
          </ContentLoader>
        </div>
      </div>
      <div className="overflow-hidden flex flex-col gap-2 flex-1 p-4 text-neutral-600 transition-all">
        <ContentLoader
          viewBox="0 0 288 64"
          width={288}
          height={64}
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
          speed={2}
        >
          <rect x="0" y="0" rx="6" ry="6" width="244" height="20" />
          <rect x="0" y="28" rx="5" ry="5" width="144" height="12" />
          <rect x="0" y="42" rx="5" ry="5" width="122" height="12" />
        </ContentLoader>
      </div>
    </div>
  )
}
