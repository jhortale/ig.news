import * as React from 'react'

export function Async(): JSX.Element {
  const [isShowing, setIsShowing] = React.useState(false)

  async function onToggle(): Promise<void> {
    setTimeout(() => setIsShowing((prev) => !prev), 1000)
  }

  React.useEffect(() => {
    setTimeout(() => setIsShowing((prev) => !prev), 1000)
  }, [])

  return (
    <div>
      <button onClick={onToggle}>Toggle</button>
      {isShowing && <p>Dialog</p>}
    </div>
  )
}
