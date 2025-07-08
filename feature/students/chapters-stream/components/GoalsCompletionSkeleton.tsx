import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'

const GoalsCompletionSkeleton = () => {
  return (
    <Card className='hidden md:block max-w-[320px] w-full sticky top-10 bg-secondary border gap-2'>
      <CardHeader>
        <Skeleton className='h-6 w-2/3 bg-primary/30 rounded-md' />
      </CardHeader>

      <CardDescription className='px-6'>
        <Skeleton className='h-4 w-1/2 bg-primary/20 rounded-md' />
      </CardDescription>

      <CardContent className='mt-4'>
        <ScrollArea className='h-72 w-full'>
          <div className='relative pr-4'>
            {[...Array(4)].map((_, index) => (
              <div key={index} className='relative flex items-start mb-6'>
                {index < 3 && (
                  <div
                    className='absolute left-3 top-6 w-0.5 bg-gray-400/50'
                    style={{ height: 'calc(100% + 1rem)' }}
                  ></div>
                )}

                <div className='relative z-10 flex-shrink-0 mr-3 sm:mr-4'>
                  <Skeleton className='w-6 h-6 rounded-full bg-gray-400/40' />
                </div>

                <div className='flex-1 pt-0.5'>
                  <Skeleton className='h-4 w-5/6 bg-foreground/20 rounded-md' />
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

export default GoalsCompletionSkeleton
