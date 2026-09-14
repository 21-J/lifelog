import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Clock, MessageCircle, Heart, MapPin } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { posts, initialMoments } from '@/lib/data'

const messages = [
  { id: 'msg1', name: '小林', text: '这篇专注的文章太戳我了，已经收藏。', time: '1 小时前' },
  { id: 'msg2', name: '阿茶', text: '露营装备清单很实用，下周就去试试！', time: '昨天' },
  { id: 'msg3', name: 'Yuki', text: '河边跑步那条动态好治愈，一起加油。', time: '2 天前' },
]

export default function HomePage() {
  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <header className="flex flex-col gap-2">
        <h1 className="font-serif text-3xl leading-tight md:text-4xl">
          你好，我是片刻
        </h1>
        <p className="max-w-lg text-sm text-muted-foreground">
          在这里记录正在发生的动态、认真写下的文章，也收下你留下的每一句话。
        </p>
      </header>

      {/* Moments feed */}
      <section className="flex flex-col gap-5">
        <div className="flex items-baseline justify-between">
          <h2 className="font-serif text-xl">最近动态</h2>
          <Link
            href="/moments"
            className="text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            全部动态
          </Link>
        </div>
        <div className="flex flex-col gap-3">
          {initialMoments.map((m) => (
            <Card key={m.id} className="flex flex-col gap-3 p-5">
              <p className="text-sm leading-relaxed text-foreground/90">
                {m.content}
              </p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span>{m.time}</span>
                {m.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="size-3.5" />
                    {m.location}
                  </span>
                )}
                <Badge className="bg-accent">{m.mood}</Badge>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Article list */}
      <section className="flex flex-col gap-5">
        <div className="flex items-baseline justify-between">
          <h2 className="font-serif text-xl">最新文章</h2>
          <Link
            href="#"
            className="text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            查看全部
          </Link>
        </div>
        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <Link key={post.id} href="#" className="group block">
              <Card className="flex gap-4 overflow-hidden p-4 transition-shadow hover:shadow-md">
                <div className="relative aspect-[4/3] w-28 shrink-0 overflow-hidden rounded-lg sm:w-40">
                  <Image
                    src={post.cover || '/placeholder.svg'}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex min-w-0 flex-col gap-2 py-1">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Badge className="bg-primary/10 text-primary">
                      {post.category}
                    </Badge>
                    <span>{post.date}</span>
                    <span className="hidden items-center gap-1 sm:flex">
                      <Clock className="size-3.5" />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg leading-snug transition-colors group-hover:text-primary">
                    {post.title}
                  </h3>
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <span className="mt-auto flex items-center gap-1 text-xs font-medium text-primary">
                    阅读全文
                    <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Messages */}
      <section className="flex flex-col gap-5">
        <div className="flex items-center gap-2">
          <MessageCircle className="size-4.5 text-primary" />
          <h2 className="font-serif text-xl">最新留言</h2>
        </div>
        <Card className="flex flex-col divide-y divide-border">
          {messages.map((msg) => (
            <div key={msg.id} className="flex items-start gap-3 p-4">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                {msg.name.slice(0, 1)}
              </span>
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{msg.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {msg.time}
                  </span>
                </div>
                <p className="text-sm text-foreground/90">{msg.text}</p>
              </div>
              <Heart className="size-4 shrink-0 text-muted-foreground/50" />
            </div>
          ))}
        </Card>
      </section>
    </div>
  )
}
