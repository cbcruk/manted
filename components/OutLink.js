export function OutLink({ children, ...props }) {
  return (
    <a target="_blank" rel="noreferrer" {...props}>
      {children}
    </a>
  )
}
