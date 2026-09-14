'use client'

import { MapPin, User } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { courses, timeSlots, weekDays, type Course } from '@/lib/data'

const colorMap: Record<string, string> = {
  primary: 'bg-primary/10 text-primary border-primary/20',
  'chart-2': 'bg-chart-2/12 text-chart-2 border-chart-2/25',
  'chart-3': 'bg-chart-3/12 text-chart-3 border-chart-3/25',
  'chart-4': 'bg-chart-4/15 text-chart-4 border-chart-4/25',
  'chart-5': 'bg-chart-5/12 text-chart-5 border-chart-5/25',
}

function courseAt(day: number, slot: number): Course | undefined {
  return courses.find((c) => c.day === day && c.start === slot)
}

export default function SchedulePage() {
  const days = weekDays.slice(0, 5)
  const todayCount = courses.filter((c) => c.day === 1).length

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <p className="text-sm font-medium text-primary">个人课表</p>
        <h1 className="font-serif text-3xl leading-tight md:text-4xl">
          这一周的安排
        </h1>
        <p className="text-sm text-muted-foreground">
          本周共 {courses.length} 节课，周一 {todayCount} 节。合理安排时间，别忘了休息。
        </p>
      </header>

      {/* Timetable */}
      <Card className="overflow-x-auto p-2 sm:p-4">
        <div className="min-w-[640px]">
          <div
            className="grid gap-1.5"
            style={{ gridTemplateColumns: `64px repeat(5, 1fr)` }}
          >
            {/* Header row */}
            <div />
            {days.map((d) => (
              <div
                key={d}
                className="pb-2 text-center text-sm font-medium text-foreground"
              >
                {d}
              </div>
            ))}

            {/* Slot rows */}
            {timeSlots.map((time, slot) => (
              <FragmentRow key={time}>
                <div className="flex flex-col items-center justify-center py-2 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground/70">
                    第 {slot + 1} 节
                  </span>
                  <span>{time}</span>
                </div>
                {days.map((_, di) => {
                  const day = di + 1
                  const course = courseAt(day, slot)
                  if (!course) {
                    return (
                      <div
                        key={day}
                        className="min-h-20 rounded-xl bg-secondary/40"
                      />
                    )
                  }
                  return (
                    <div
                      key={day}
                      className={
                        'flex min-h-20 flex-col gap-1 rounded-xl border p-2.5 text-left ' +
                        (colorMap[course.color] ?? colorMap.primary)
                      }
                    >
                      <span className="text-sm font-semibold leading-tight">
                        {course.name}
                      </span>
                      <span className="flex items-center gap-1 text-xs opacity-80">
                        <User className="size-3" />
                        {course.teacher}
                      </span>
                      <span className="flex items-center gap-1 text-xs opacity-80">
                        <MapPin className="size-3" />
                        {course.location}
                      </span>
                    </div>
                  )
                })}
              </FragmentRow>
            ))}
          </div>
        </div>
      </Card>

      {/* Today list */}
      <section className="flex flex-col gap-4">
        <h2 className="font-serif text-xl">今日课程（周一）</h2>
        <div className="flex flex-col gap-3">
          {courses
            .filter((c) => c.day === 1)
            .sort((a, b) => a.start - b.start)
            .map((c) => (
              <Card key={c.id} className="flex items-center gap-4 p-4">
                <div
                  className={
                    'flex w-16 shrink-0 flex-col items-center rounded-xl border py-2 text-xs ' +
                    (colorMap[c.color] ?? colorMap.primary)
                  }
                >
                  <span className="font-semibold">第 {c.start + 1} 节</span>
                  <span>{timeSlots[c.start]}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium">{c.name}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {c.teacher} · {c.location}
                  </p>
                </div>
              </Card>
            ))}
        </div>
      </section>
    </div>
  )
}

function FragmentRow({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
