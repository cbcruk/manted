import { Skeleton } from '../Skeleton'
import Hero from './Hero'
import { Category, MemoItem, Position, TagList } from './MemoItem'
import { useJobs } from './useJobs'

function Memo() {
  const { data, isLoading, fetchStatus } = useJobs()

  if (fetchStatus === 'idle' && !data) {
    return null
  }

  return (
    <div className="fixed inset-0 top-auto md:top-12 left-0 md:left-auto z-10 max-h-screen p-2">
      <div className="overflow-auto w-full w-full md:w-80 max-h-[50vh] md:max-h-[calc(100vh-40px-32px)] rounded-3xl shadow-2xl">
        {isLoading && <Skeleton />}
        {data && (
          <div className="flex flex-col bg-neutral-50">
            <Hero {...data[0]} />
            <div className="overflow-hidden flex flex-col gap-2 flex-1 p-4 text-neutral-600 transition-all">
              {data?.map(
                ({ id, position, like_count, category_tags, due_time }) => {
                  return (
                    <MemoItem key={id}>
                      <Position {...{ id, position }} />
                      <div className="mt-1 text-xs">
                        <div className="overflow-auto flex flex-col gap-1 border-neutral-400">
                          <TagList {...{ due_time, like_count }} />
                          <Category {...{ category_tags }} />
                        </div>
                      </div>
                    </MemoItem>
                  )
                }
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Memo
