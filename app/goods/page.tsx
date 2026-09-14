'use client'

import { useState } from 'react'
import { Star } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { goods } from '@/lib/data'

const categories = ['全部', '生活', '美食', '健康']

export default function GoodsPage() {
  const [active, setActive] = useState('全部')
  const list =
    active === '全部' ? goods : goods.filter((g) => g.category === active)

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <p className="text-sm font-medium text-primary">好物</p>
        <h1 className="font-serif text-3xl leading-tight md:text-4xl">
          用过才敢分享
        </h1>
        <p className="text-sm text-muted-foreground">
          这些是真正陪伴我日常的小物件，每一件都有推荐它的理由。
        </p>
      </header>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setActive(c)}
            className={
              'rounded-full px-3.5 py-1.5 text-sm transition-colors ' +
              (active === c
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-accent')
            }
          >
            {c}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((g) => (
          <Card
            key={g.id}
            className="flex flex-col gap-4 p-5 transition-shadow hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <span className="flex size-14 items-center justify-center rounded-2xl bg-accent text-3xl">
                {g.emoji}
              </span>
              <Badge className="bg-secondary text-secondary-foreground">
                {g.category}
              </Badge>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="font-serif text-lg leading-snug">{g.name}</h3>
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="size-3.5 text-primary"
                    fill={i < g.rating ? 'currentColor' : 'none'}
                  />
                ))}
              </div>
            </div>
            <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
              {g.reason}
            </p>
            <div className="flex items-center justify-between border-t border-border pt-3">
              <span className="font-serif text-lg text-primary">{g.price}</span>
              <span className="text-xs text-muted-foreground">推荐指数 {g.rating}/5</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
