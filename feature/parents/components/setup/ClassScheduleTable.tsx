'use client'

import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useState } from 'react'
import { useParentsSetupStore } from '../../store/useParentsSetupStore'
import CustomButton from '@/components/global/CustomButton'

const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
]

const timeSlots = [
  { label: '10:00-11:00', startTime: '10:00', endTime: '11:00' },
  { label: '11:00-12:00', startTime: '11:00', endTime: '12:00' },
  { label: '12:00-13:00', startTime: '12:00', endTime: '13:00' },
  { label: '13:00-14:00', startTime: '13:00', endTime: '14:00' },
  { label: '14:00-15:00', startTime: '14:00', endTime: '15:00' },
  { label: '15:00-16:00', startTime: '15:00', endTime: '16:00' },
  { label: '16:00-17:00', startTime: '16:00', endTime: '17:00' },
]

export default function ClassScheduleTable() {
  const subjects = useParentsSetupStore((s) => s.subjects)
  const toggle = useParentsSetupStore((s) => s.toggleSubjectSchedule)

  const [selectedSubjectId, setSelectedSubjectId] = useState(subjects[0].id)

  return (
    <div className="space-y-6 w-full max-w-[1170px]">
      <div className="flex flex-col items-center gap-4">
        <p className='font-bold text-white text-[min(12vw,24px)]'>Class Registration</p>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-6 '>
          {subjects.map((sub) => (
            <CustomButton
              key={sub.id}
              onClick={() => setSelectedSubjectId(sub.id)}
              active={selectedSubjectId === sub.id}
              className={`max-w-[120px] h-[min(10vw,40px)] text-[min(10vw,16px)] font-semibold text-white cursor-pointer`}
            >
              {sub.subject_name}
            </CustomButton>
          ))}
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow className='bg-brand-color'>
            <TableHead className='h-16 border-r-1 border-b-1 px-2 border-r-[#034663] border-b-[#034663] rounded-tl-lg w-[100px]'>
              Time/Day
            </TableHead>
            {days.map((d) => (
              <TableHead
                key={d}
                className={`w-[100px] h-16 border-r-1 border-b-0 px-2 border-r-[#034663] ${d === days[days.length - 1] ? 'rounded-tr-lg' : ''}`}
              >
                {d}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {timeSlots.map(({ label, startTime, endTime }) => (
            <TableRow key={label}>
              <TableCell className={`font-medium bg-brand-color h-12 text-white text-center border-b-1 border-b-[#034663] ${label === timeSlots[timeSlots.length - 1].label ? 'rounded-bl-lg' : ''}`}>
                {label}
              </TableCell>

              {days.map((day) => {
                const currentSubject = subjects.find((s) => s.id === selectedSubjectId)!
                const isActive = currentSubject.schedule.some(
                  (sch) =>
                    sch.day === day &&
                    sch.startTime === startTime &&
                    sch.endTime === endTime
                )

                const isTakenByOther = subjects
                  .filter((s) => s.id !== selectedSubjectId)
                  .some((s) =>
                    s.schedule.some(
                      (sch) =>
                        sch.day === day &&
                        sch.startTime === startTime &&
                        sch.endTime === endTime
                    )
                  )

                const handleClick = () => {
                  if (isTakenByOther && !isActive) return
                  toggle(selectedSubjectId, { day, startTime, endTime })
                }

                return (
                  <TableCell key={`${day}-${label}`} className="p-0">
                    <div
                      onClick={handleClick}
                      className={[
                        'h-12 w-full transition-colors border-1',
                        isActive
                          ? 'bg-brand-color border-primary-bg-color'
                          : 'bg-transparent border-brand-color',

                          !isActive && !isTakenByOther && "hover:bg-brand-color hover:border-primary-bg-color",

                        isTakenByOther && !isActive
                          ? 'cursor-not-allowed bg-white opacity-15 hover:bg-white  hover:opacity-15'
                          : 'cursor-pointer',
                        (day === 'Sunday' && label === '16:00-17:00')
                          ? 'rounded-br-lg'
                          : '',
                      ].join(' ')}
                    />
                  </TableCell>
                )
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
