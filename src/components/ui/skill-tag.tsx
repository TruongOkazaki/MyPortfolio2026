type Props = {
  name: string
  highlight?: boolean
}

export default function SkillTag({ name, highlight }: Props) {
  return (
    <span
      className={`inline-block text-[10px] tracking-[1px] uppercase px-2.5 py-1 border font-sans transition-colors ${
        highlight
          ? 'bg-ink text-cream border-ink'
          : 'bg-transparent text-ink-light border-[#e0ddd8] hover:border-[#c8c4bc]'
      }`}
    >
      {name}
    </span>
  )
}
