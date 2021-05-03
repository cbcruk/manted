import React from 'react'

function Summary({ name, industry_name, position }) {
  return (
    <div className="flex flex-col p-2 md:p-4">
      <div className="text-lg">{name}</div>
      <p className="text-xs text-gray-500">
        {industry_name} · {position}
      </p>
    </div>
  )
}

export default Summary
