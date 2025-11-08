import { Badge } from "@/components/ui/badge";

interface Post {
  title: string;
  category: string;
  date: string;
  href: string;
  image?: string;
  imageQuery?: string;
}

interface KeepReadingProps {
  posts: Post[];
  viewAllHref?: string;
}

export function KeepReading({
  posts,
  viewAllHref = "/posts",
}: KeepReadingProps) {
  if (posts.length === 0) return null;

  return (
    <section className="w-[90vw] md:w-full my-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-semibold tracking-tight">Keep reading</h2>
        {viewAllHref && (
          <a
            href={viewAllHref}
            className="text-sm font-medium text-foreground hover:text-muted-foreground transition-colors"
          >
            View all
          </a>
        )}
      </div>

      {/* Desktop: Grid layout, Mobile: Horizontal scroll */}
      <div className="relative md:mx-0 md:px-0">
        <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-3 md:overflow-visible">
          {posts.map((post, index) => (
            <a
              key={index}
              href={post.href}
              className="group flex-shrink-0 w-[65vw] md:w-auto snap-start"
            >
              <article className="flex flex-col h-full">
                {/* Image Container */}
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-muted mb-4">
                  {post.image ? (
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-accent to-muted flex items-center justify-center">
                      <div className="text-4xl text-muted-foreground">📄</div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col gap-3">
                  <h3 className="!text-sm md:!text-lg font-semibold leading-tight text-balance group-hover:text-muted-foreground transition-colors">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs md:text-sm text-muted-foreground">
                    <Badge
                      variant="outline"
                      className="rounded-full font-normal"
                    >
                      {post.category.charAt(0).toUpperCase() +
                        post.category.slice(1)}
                    </Badge>
                    <time dateTime={post.date}>{post.date}</time>
                  </div>
                </div>
              </article>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
