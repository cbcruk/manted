import { IconCalendar } from '../Icons/Calendar'
import { IconHeartOutlined } from '../Icons/HeartOutlined'
import { OutLink } from '../OutLink'

export function Position({ id, position }) {
  return (
    <div className="text-ellipsis overflow-hidden whitespace-nowrap font-medium">
      <OutLink
        href={`https://www.wanted.co.kr/wd/${id}`}
        className="hover:text-neutral-900 hover:underline transition-all"
        title={position}
      >
        {position}
      </OutLink>
    </div>
  )
}

export function TagItem({ children }) {
  return <span className="inline-flex items-center gap-0.5">{children}</span>
}

export function TagList({ due_time, like_count }) {
  const dueTime = due_time
    ? `${new Date(due_time).toLocaleDateString('ko-KR')}까지`
    : '상시채용'
  const hasLikeCount = parseInt(like_count, 10) > 0

  return (
    <div className="flex items-center gap-1">
      <TagItem>
        <IconCalendar width={12} height={12} />
        {dueTime}
      </TagItem>
      {hasLikeCount && (
        <TagItem>
          <IconHeartOutlined width={12} height={12} />
          {like_count}
        </TagItem>
      )}
    </div>
  )
}

export function Category({ category_tags }) {
  return (
    <div className="flex gap-1 text-[10px]">
      {category_tags.map(({ parent_id, id, label }, index) => (
        <OutLink
          key={index}
          href={`https://www.wanted.co.kr/wdlist/${parent_id}/${id}`}
          className="hover:font-bold transition-all"
        >{`#${label}`}</OutLink>
      ))}
    </div>
  )
}

export function MemoItem({ children }) {
  return (
    <div className="text-sm border-t pt-2 first:border-0 first:p-0 border-neutral-400 transition">
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  )
}
