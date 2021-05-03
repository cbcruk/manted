import React from 'react'
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
    <div className="fixed inset-2 top-auto md:top-3 md:right-3 md:bottom-auto md:left-auto z-10 md:w-72 rounded-md overflow-hidden bg-white shadow-md">
      <div className="flex md:flex-col">
        <Hero {...{ id, company_id, logo_img_thumb, title_img_thumb }} />
        <div className="flex-1">
          <Summary {...{ name, industry_name, position }} />
          <Features {...{ avg_day, avg_rate, like_count }} />
        </div>
      </div>
      <Desc {...{ main_tasks, requirements }} />
    </div>
  )
}

export default Memo
