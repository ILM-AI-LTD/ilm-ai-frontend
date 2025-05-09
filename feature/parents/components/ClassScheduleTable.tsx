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
import { useParentsSetupStore } from '../store/useParentsSetupStore'

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
            <Button
              key={sub.id}
              // variant={selectedSubjectId === sub.id ? 'default' : 'outline'}
              onClick={() => setSelectedSubjectId(sub.id)}
              className={`max-w-[120px] h-[min(10vw,40px)] text-[min(10vw,16px)] bg-primary-bg-color font-semibold text-white/70 border-1 border-parent-chatbox-color cursor-pointer ${selectedSubjectId === sub.id ? 'bg-brand-color-parent hover:bg-brand-color-parent' : 'bg-transparent hover:bg-transparent'}`}
            >
              {sub.subject_name}
            </Button>
          ))}
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow className='bg-parent-inputField-color'>
            <TableHead className='h-16 border-r-1 border-b-1 px-2 border-r-brand-color-parent border-b-brand-color-parent rounded-tl-lg w-[100px]'>Time/Day</TableHead>
            {days.map((d) => (
              <TableHead
                key={d}
                className={`w-[100px] h-16 border-r-1 border-b-0 px-2 border-r-brand-color-parent ${d === days[days.length - 1] ? 'rounded-tr-lg' : ''
                  }`}
              >
                {d}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {timeSlots.map(({ label, startTime, endTime }) => (
            <TableRow key={label}>
              <TableCell className={`font-medium bg-parent-inputField-color h-12 text-white text-center border-b-1 border-b-brand-color-parent ${label === timeSlots[timeSlots.length - 1].label ? 'rounded-bl-lg' : ''}`}>{label}</TableCell>

              {days.map((day) => {
                const isActive = subjects
                  .find((s) => s.id === selectedSubjectId)!
                  .schedule.some(
                    (sch) =>
                      sch.day === day &&
                      sch.startTime === startTime &&
                      sch.endTime === endTime
                  )

                return (
                  <TableCell key={`${day}-${label}`} className="p-0">
                    <div
                      className={`h-12 w-full cursor-pointer transition-colors border-1 border-brand-color-parent ${isActive ? 'bg-brand-color-parent border-1 border-primary-bg-color' : 'bg-transparent'} ${(day === 'Sunday' && label === '16:00-17:00') ? "rounded-br-lg" : ""} `}
                      onClick={() =>
                        toggle(selectedSubjectId, { day, startTime, endTime })
                      }
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
