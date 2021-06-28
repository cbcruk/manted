import { ICONS } from './constants'

function Feature({ icon, label, children }) {
  return (
    <span className="inline-flex items-center gap-1 text-sm">
      <img src={icon} width="16" alt={label} title={label} />
      {children}
    </span>
  )
}

function Features({ avg_day, avg_rate, like_count }) {
  return (
    <div className="flex items-center gap-2 p-2 md:p-4 border-t border-b">
      <Feature icon={ICONS.alarm_on} label="평균응답일">
        {avg_day}일
      </Feature>
      <Feature icon={ICONS.reply} label="평균응답률">
        {avg_rate}%
      </Feature>
      <Feature icon={ICONS.favorite} label="좋아요">
        {like_count}
      </Feature>
    </div>
  )
}

export default Features
