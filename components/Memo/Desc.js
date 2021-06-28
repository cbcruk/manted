function Details({ summary, children }) {
  return (
    <details>
      <summary className="cursor-pointer">{summary}</summary>
      <p className="py-1">{children}</p>
    </details>
  )
}

function Desc({ main_tasks, requirements }) {
  return (
    <div className="hidden md:block p-4 text-sm whitespace-pre-wrap">
      <Details summary="주요업무">{main_tasks}</Details>
      <Details summary="요구사항">{requirements}</Details>
    </div>
  )
}

export default Desc
