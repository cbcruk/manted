import React from 'react'

const WANTED_URL = 'https://www.wanted.co.kr'

function Summary({ company_id, id, name, industry_name, position }) {
  return (
    <div className="flex flex-col p-2 md:p-4">
      <a
        href={`${WANTED_URL}/company/${company_id}`}
        target="_blank"
        rel="noreferrer"
        className="text-lg"
      >
        {name}
      </a>
      <p className="text-xs text-gray-500">
        {industry_name} ·{' '}
        <a href={`${WANTED_URL}/wd/${id}`} target="_blank" rel="noreferrer">
          {position}
        </a>
      </p>
    </div>
  )
}

export default Summary
