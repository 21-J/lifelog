'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { MapPin, Send, Heart, MessageSquare, Repeat2, Flame, Clock } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { initialMoments, profile, type Moment } from '@/lib/data'

const moods = ['满足', '轻松', '收获', '开心', '平静', '疲惫']

type SortKey = 'time' | 'hot'

export default function MomentsPage() {
  const [moments, setMoments] = useState<Moment[]>(initialMoments)
  const [content, setContent] = useState('')
  const [mood, setMood] = useState(moods[0])
  const [sort, setSort] = useState<SortKey>('time')
  const [likes, setLikes] = useState<Record<string, boolean>>({})

  function publish() {
    const text = content.trim()
    if (!text) return
    setMoments((prev) => [
      {
        id: `m-${Date.now()}`,
        author: profile.name,
        avatar: profile.avatar,
        content: text,
        time: '刚刚',
        createdAt: Date.now(),
        location: '杭州',
        mood,
        likes: 0,
        comments: 0,
      },
      ...prev,
    ])
    setContent('')
  }

  function toggleLike(id: string) {
    setLikes((p) => ({ ...p, [id]: !p[id] }))
  }

  function likeCount(m: Moment) {
    return m.likes + (likes[m.id] ? 1 : 0)
  }

  const sorted = useMemo(() => {
    const list = [...moments]
    if (sort === 'hot') {
      list.sort(
        (a, b) =>
          likeCount(b) + b.comments * 2 - (likeCount(a) + a.comments * 2),
      )
    } else {
      list.sort((a, b) => b.createdAt - a.createdAt)
    }
    return list
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moments, sort, likes])

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <p className="text-sm font-medium text-primary">广场</p>
        <h1 className="font-serif text-3xl leading-tight md:text-4xl">动态广场</h1>
        <p className="text-sm text-muted-foreground">
          大家在这里分享此刻的想法，你也来说点什么吧。
        </p>
      </header>

      {/* Composer */}
      <Card className="flex flex-col gap-4 p-5">
        <div className="flex gap-3">
          <Image
            src={profile.avatar || '/placeholder.svg'}
            alt={profile.name}
            width={40}
            height={40}
            className="size-10 shrink-0 rounded-full object-cover"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={(e) => {
              if (
                e.key === 'Enter' &&
                (e.metaKey || e.ctrlKey) &&
                !e.nativeEvent.isComposing &&
                e.keyCode !== 229
              ) {
                e.preventDefault()
                publish()
              }
            }}
            placeholder="分享新鲜事……"
            rows={3}
            className="min-h-20 flex-1 resize-none rounded-xl bg-secondary/60 p-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring/40"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted-foreground">心情</span>
          {moods.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMood(m)}
              className={
                'rounded-full px-2.5 py-1 text-xs transition-colors ' +
                (mood === m
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-accent')
              }
            >
              {m}
            </button>
          ))}
          <Button
            size="lg"
            className="ml-auto"
            onClick={publish}
            disabled={!content.trim()}
          >
            <Send className="size-4" />
            发布
          </Button>
        </div>
      </Card>

      {/* Sort toolbar */}
      <div className="flex items-center gap-2 border-b border-border pb-3">
        <span className="mr-1 text-sm text-muted-foreground">排序</span>
        <button
          type="button"
          onClick={() => setSort('time')}
          className={
            'flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition-colors ' +
            (sort === 'time'
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-secondary-foreground hover:bg-accent')
          }
        >
          <Clock className="size-3.5" />
          最新
        </button>
        <button
          type="button"
          onClick={() => setSort('hot')}
          className={
            'flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition-colors ' +
            (sort === 'hot'
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-secondary-foreground hover:bg-accent')
          }
        >
          <Flame className="size-3.5" />
          最热
        </button>
      </div>

      {/* Feed */}
      <div className="flex flex-col gap-4">
        {sorted.map((m) => (
          <Card key={m.id} className="flex gap-3 p-5">
            <Image
              src={m.avatar || '/placeholder.svg'}
              alt={m.author}
              width={44}
              height={44}
              className="size-11 shrink-0 rounded-full object-cover"
            />
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="text-sm font-medium text-foreground">
                  {m.author}
                </span>
                <span>·</span>
                <span>{m.time}</span>
                <Badge className="ml-auto bg-primary/10 text-primary">
                  {m.mood}
                </Badge>
              </div>
              <p className="text-sm leading-relaxed text-foreground/90">
                {m.content}
              </p>
              {m.location && (
                <span className="flex items-center gap-1 text-xs text-primary/80">
                  <MapPin className="size-3.5" />
                  {m.location}
                </span>
              )}
              <div className="mt-1 flex items-center gap-6 text-xs text-muted-foreground">
                <button
                  type="button"
                  className="flex items-center gap-1.5 transition-colors hover:text-foreground"
                >
                  <Repeat2 className="size-4" />
                  转发
                </button>
                <span className="flex items-center gap-1.5">
                  <MessageSquare className="size-4" />
                  {m.comments}
                </span>
                <button
                  type="button"
                  onClick={() => toggleLike(m.id)}
                  className={
                    'flex items-center gap-1.5 transition-colors ' +
                    (likes[m.id] ? 'text-primary' : 'hover:text-foreground')
                  }
                >
                  <Heart
                    className="size-4"
                    fill={likes[m.id] ? 'currentColor' : 'none'}
                  />
                  {likeCount(m)}
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
