'use client'

import { useState } from 'react'
import Image from 'next/image'
import { MapPin, Send, Heart, MessageSquare } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { initialMoments, profile, type Moment } from '@/lib/data'

const moods = ['满足', '轻松', '收获', '开心', '平静', '疲惫']

export default function MomentsPage() {
  const [moments, setMoments] = useState<Moment[]>(initialMoments)
  const [content, setContent] = useState('')
  const [mood, setMood] = useState(moods[0])
  const [liked, setLiked] = useState<Record<string, boolean>>({})

  function publish() {
    const text = content.trim()
    if (!text) return
    setMoments((prev) => [
      {
        id: `m-${Date.now()}`,
        content: text,
        time: '刚刚',
        location: '杭州',
        mood,
      },
      ...prev,
    ])
    setContent('')
  }

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <p className="text-sm font-medium text-primary">动态</p>
        <h1 className="font-serif text-3xl leading-tight md:text-4xl">碎碎念</h1>
        <p className="text-sm text-muted-foreground">
          随手记录生活里的小事，一句话也值得被留下。
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
            placeholder="此刻的想法是……"
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

      {/* Timeline */}
      <div className="relative flex flex-col gap-5 pl-6">
        <span className="absolute left-2 top-2 bottom-2 w-px bg-border" />
        {moments.map((m) => (
          <div key={m.id} className="relative">
            <span className="absolute -left-[18px] top-5 size-2.5 rounded-full border-2 border-background bg-primary" />
            <Card className="flex flex-col gap-3 p-5">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="font-medium text-foreground">{profile.name}</span>
                <span>·</span>
                <span>{m.time}</span>
                <Badge className="ml-auto bg-primary/10 text-primary">
                  {m.mood}
                </Badge>
              </div>
              <p className="text-sm leading-relaxed text-foreground/90">
                {m.content}
              </p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                {m.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="size-3.5" />
                    {m.location}
                  </span>
                )}
                <button
                  type="button"
                  onClick={() =>
                    setLiked((p) => ({ ...p, [m.id]: !p[m.id] }))
                  }
                  className={
                    'flex items-center gap-1 transition-colors ' +
                    (liked[m.id] ? 'text-primary' : 'hover:text-foreground')
                  }
                >
                  <Heart
                    className="size-3.5"
                    fill={liked[m.id] ? 'currentColor' : 'none'}
                  />
                  {liked[m.id] ? '已赞' : '赞'}
                </button>
                <span className="flex items-center gap-1">
                  <MessageSquare className="size-3.5" />
                  评论
                </span>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}
