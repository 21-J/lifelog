'use client'

import { useMemo, useState } from 'react'
import { Check, Plus, Flame } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { initialTasks, habits, type Task } from '@/lib/data'

const tagColors: Record<Task['tag'], string> = {
  工作: 'bg-primary/10 text-primary',
  学习: 'bg-chart-2/15 text-chart-2',
  生活: 'bg-chart-3/15 text-chart-3',
  健康: 'bg-chart-5/15 text-chart-5',
}

const tagOptions: Task['tag'][] = ['工作', '学习', '生活', '健康']

export default function LifePage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [title, setTitle] = useState('')
  const [tag, setTag] = useState<Task['tag']>('生活')

  const done = tasks.filter((t) => t.done).length
  const progress = tasks.length ? Math.round((done / tasks.length) * 100) : 0

  function toggle(id: string) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    )
  }

  function add() {
    const text = title.trim()
    if (!text) return
    setTasks((prev) => [
      ...prev,
      { id: `t-${Date.now()}`, title: text, done: false, tag },
    ])
    setTitle('')
  }

  const sorted = useMemo(
    () => [...tasks].sort((a, b) => Number(a.done) - Number(b.done)),
    [tasks],
  )

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <p className="text-sm font-medium text-primary">生活管理</p>
        <h1 className="font-serif text-3xl leading-tight md:text-4xl">
          今天，把重要的事做好
        </h1>
        <p className="text-sm text-muted-foreground">
          管理你的待办清单，追踪坚持中的习惯，让日子有条不紊。
        </p>
      </header>

      {/* Progress overview */}
      <Card className="flex flex-col gap-4 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">今日完成</p>
            <p className="font-serif text-2xl">
              {done}
              <span className="text-base text-muted-foreground">
                {' '}
                / {tasks.length}
              </span>
            </p>
          </div>
          <div className="text-right">
            <p className="font-serif text-3xl text-primary">{progress}%</p>
            <p className="text-xs text-muted-foreground">完成率</p>
          </div>
        </div>
        <div className="h-2.5 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Todo list */}
        <section className="flex flex-col gap-4 lg:col-span-3">
          <h2 className="font-serif text-xl">待办清单</h2>

          <Card className="flex flex-col gap-3 p-4">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => {
                if (
                  e.key === 'Enter' &&
                  !e.nativeEvent.isComposing &&
                  e.keyCode !== 229
                ) {
                  e.preventDefault()
                  add()
                }
              }}
              placeholder="添加一项新任务……"
              className="w-full rounded-xl bg-secondary/60 px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring/40"
            />
            <div className="flex flex-wrap items-center gap-2">
              {tagOptions.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTag(t)}
                  className={
                    'rounded-full px-2.5 py-1 text-xs transition-colors ' +
                    (tag === t
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-accent')
                  }
                >
                  {t}
                </button>
              ))}
              <Button
                size="sm"
                className="ml-auto"
                onClick={add}
                disabled={!title.trim()}
              >
                <Plus className="size-3.5" />
                添加
              </Button>
            </div>
          </Card>

          <ul className="flex flex-col gap-2">
            {sorted.map((t) => (
              <li key={t.id}>
                <Card
                  className={
                    'flex items-center gap-3 p-4 transition-colors ' +
                    (t.done ? 'bg-secondary/40' : '')
                  }
                >
                  <button
                    type="button"
                    onClick={() => toggle(t.id)}
                    aria-label="切换完成"
                    className={
                      'flex size-5 shrink-0 items-center justify-center rounded-md border transition-colors ' +
                      (t.done
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border hover:border-primary')
                    }
                  >
                    {t.done && <Check className="size-3.5" />}
                  </button>
                  <span
                    className={
                      'flex-1 text-sm ' +
                      (t.done
                        ? 'text-muted-foreground line-through'
                        : 'text-foreground')
                    }
                  >
                    {t.title}
                  </span>
                  <span
                    className={
                      'rounded-full px-2 py-0.5 text-xs ' + tagColors[t.tag]
                    }
                  >
                    {t.tag}
                  </span>
                </Card>
              </li>
            ))}
          </ul>
        </section>

        {/* Habits */}
        <section className="flex flex-col gap-4 lg:col-span-2">
          <h2 className="font-serif text-xl">习惯打卡</h2>
          <div className="flex flex-col gap-3">
            {habits.map((h) => {
              const pct = Math.round((h.done / h.target) * 100)
              return (
                <Card key={h.id} className="flex flex-col gap-3 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{h.name}</span>
                    <span className="flex items-center gap-1 text-xs text-primary">
                      <Flame className="size-3.5" fill="currentColor" />
                      连续 {h.streak} 天
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    本月 {h.done} / {h.target} 天
                  </p>
                </Card>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}
