import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { OutLink } from '../OutLink'

function useImage(src) {
  const result = useQuery(
    [src],
    () => {
      return new Promise((resolve) => {
        const image = new Image()
        image.src = src
        image.onload = () => {
          setTimeout(() => {
            resolve(src)
          }, 300)
        }
      })
    },
    {
      enabled: Boolean(src),
    }
  )

  return result
}

function HeroImage({ title_thumb_img }) {
  const { data } = useImage(title_thumb_img)
  const imageUrl = data ? `url(${data})` : 'none'

  return (
    <div
      className={clsx('w-full h-full bg-cover transition-opacity', {
        'opacity-0': !data,
      })}
      style={{
        backgroundImage: imageUrl,
      }}
    />
  )
}

function Hero({
  title_thumb_img,
  logo_thumb_img,
  company_id,
  company_name,
  company_application_response_stats,
}) {
  useImage(title_thumb_img)

  return (
    <div className="overflow-hidden relative sticky top-0 min-w-[120px] max-w-[120px] max-w-full rounded-3xl aspect-[400/186] md:aspect-[400/279] bg-neutral-800">
      <style jsx>{`
        .meta {
          background-image: linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.8),
            transparent
          );
        }
      `}</style>
      <HeroImage {...{ title_thumb_img }} />
      <div className="meta absolute bottom-0 left-0 flex justify-between items-end w-full h-full p-4">
        <div className="text-neutral-100">
          <div className="rounded-lg font-bold">
            <OutLink href={`https://www.wanted.co.kr/company/${company_id}`}>
              {company_name}
            </OutLink>
          </div>
          <div className="flex gap-2 text-xs text-neutral-200">
            <span className="inline-flex">
              응답일 {company_application_response_stats?.avg_day}일
            </span>
            <span className="inline-flex">
              응답률 {company_application_response_stats?.avg_rate}%
            </span>
          </div>
        </div>
        <div
          className="overflow-hidden flex w-6 w-10 h-6 h-10 rounded-full bg-neutral-100 bg-cover shadow-md z-10"
          style={{
            backgroundImage: logo_thumb_img ? `url(${logo_thumb_img})` : 'none',
          }}
        />
      </div>
    </div>
  )
}

export default Hero
