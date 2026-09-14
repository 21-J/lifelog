import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Clock, MessageCircle, ShoppingBag } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { posts, stats, initialMoments, goods } from '@/lib/data'

export default function HomePage() {
  const [featured, ...rest] = posts

  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <header className="flex flex-col gap-2">
        <p className="text-sm font-medium text-primary">最新文章</p>
        <h1 className="font-serif text-3xl leading-tight md:text-4xl">
          记录思考，也记录生活
        </h1>
        <p className="max-w-lg text-sm text-muted-foreground">
          这里收录我认真写下的长文，以及一些正在发生的片刻。慢慢读，不着急。
        </p>
      </header>

      {/* Featured post */}
      <Link href="#" className="group block">
        <Card className="overflow-hidden transition-shadow hover:shadow-md">
          <div className="grid md:grid-cols-2">
            <div className="relative aspect-[16/11] overflow-hidden md:aspect-auto">
              <Image
                src={featured.cover || '/placeholder.svg'}
                alt={featured.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority
              />
            </div>
            <div className="flex flex-col justify-center gap-4 p-6 md:p-8">
              <div className="flex items-center gap-2">
                <Badge className="bg-primary/10 text-primary">
                  {featured.category}
                </Badge>
                <span className="text-xs text-muted-foreground">置顶推荐</span>
              </div>
              <h2 className="font-serif text-2xl leading-snug transition-colors group-hover:text-primary md:text-3xl">
                {featured.title}
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {featured.excerpt}
              </p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>{featured.date}</span>
                <span className="flex items-center gap-1">
                  <Clock className="size-3.5" />
                  {featured.readTime}
                </span>
                <span className="ml-auto flex items-center gap-1 font-medium text-primary">
                  阅读全文
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </div>
          </div>
        </Card>
      </Link>

      {/* Article list */}
      <section className="flex flex-col gap-5">
        <div className="flex items-baseline justify-between">
          <h2 className="font-serif text-xl">更多文章</h2>
          <Link
            href="#"
            className="text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            查看全部
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {rest.map((post) => (
            <Link key={post.id} href="#" className="group block">
              <Card className="h-full overflow-hidden transition-shadow hover:shadow-md">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={post.cover || '/placeholder.svg'}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col gap-3 p-5">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Badge className="bg-accent">{post.category}</Badge>
                    <span>{post.date}</span>
                  </div>
                  <h3 className="font-serif text-lg leading-snug transition-colors group-hover:text-primary">
                    {post.title}
                  </h3>
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {post.tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs text-muted-foreground"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="p-4">
            <p className="font-serif text-2xl">{s.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
          </Card>
        ))}
      </section>

      {/* Cross-links */}
      <section className="grid gap-5 md:grid-cols-2">
        <Card className="flex flex-col gap-4 p-6">
          <div className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <MessageCircle className="size-4.5" />
            </span>
            <div>
              <h3 className="text-sm font-semibold">最近动态</h3>
              <p className="text-xs text-muted-foreground">碎碎念一下</p>
            </div>
            <Link
              href="/moments"
              className="ml-auto text-xs text-primary hover:underline"
            >
              全部
            </Link>
          </div>
          <ul className="flex flex-col gap-3">
            {initialMoments.slice(0, 2).map((m) => (
              <li key={m.id} className="text-sm">
                <p className="leading-relaxed text-foreground/90">{m.content}</p>
                <p className="mt-1 text-xs text-muted-foreground">{m.time}</p>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="flex flex-col gap-4 p-6">
          <div className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <ShoppingBag className="size-4.5" />
            </span>
            <div>
              <h3 className="text-sm font-semibold">好物推荐</h3>
              <p className="text-xs text-muted-foreground">用过才敢分享</p>
            </div>
            <Link
              href="/goods"
              className="ml-auto text-xs text-primary hover:underline"
            >
              全部
            </Link>
          </div>
          <ul className="flex flex-col gap-3">
            {goods.slice(0, 3).map((g) => (
              <li key={g.id} className="flex items-center gap-3 text-sm">
                <span className="text-xl">{g.emoji}</span>
                <span className="flex-1 truncate">{g.name}</span>
                <span className="text-xs font-medium text-primary">
                  {g.price}
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </section>
    </div>
  )
}
