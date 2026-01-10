"use client"

type JumpNavigatorProps = {
  galleries: Array<{ title: string }>
}

export function JumpNavigator({ galleries }: JumpNavigatorProps) {
  return (
    <div className="fixed bottom-6 right-6 z-40 hidden lg:block">
      <select
        onChange={(e) => {
          const element = document.getElementById(e.target.value)
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" })
          }
        }}
        className="glass px-4 py-2 rounded-full border border-primary/20 text-sm font-medium bg-background/80 backdrop-blur-xl text-foreground hover:border-primary/40 transition-all cursor-pointer"
        defaultValue=""
      >
        <option value="" disabled>Jump to Event</option>
        {galleries.map((g, i) => (
          <option key={i} value={`gallery-${i}`}>
            {g.title}
          </option>
        ))}
      </select>
    </div>
  )
}

