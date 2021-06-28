import { useAtom } from 'jotai'
import { markerAtom } from '../../atoms/marker'
import Hero from './Hero'
import Summary from './Summary'
import Features from './Features'
import Desc from './Desc'

function Memo() {
  const [{ selected }] = useAtom(markerAtom)

  if (!selected) {
    return null
  }

  const {
    id,
    company_id,
    logo_img_thumb,
    title_img_thumb,
    name,
    industry_name,
    position,
    avg_day,
    avg_rate,
    like_count,
    main_tasks,
    requirements,
  } = selected

  return (
    <div className="max-h-screen fixed inset-0 md:top-0 top-auto md:bottom-auto md:left-auto z-10 p-2">
      <div className="md:w-72 md:max-h-[calc(100vh-1.5rem)] rounded-md md:overflow-auto overflow-hidden bg-white shadow-md">
        <div className="flex md:flex-col bg-white">
          <Hero {...{ id, company_id, logo_img_thumb, title_img_thumb }} />
          <div className="flex-1 overflow-hidden">
            <Summary {...{ id, company_id, name, industry_name, position }} />
            <Features {...{ avg_day, avg_rate, like_count }} />
          </div>
        </div>
        <Desc {...{ main_tasks, requirements }} />
      </div>
    </div>
  )
}

export default Memo
