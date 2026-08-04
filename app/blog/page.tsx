'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { Calendar, User, Eye, ArrowRight, Search, Tag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useLanguage } from '@/lib/i18n/language-context'

const ParticleField = dynamic(() => import('@/components/three/particle-field'), {
  ssr: false,
})

interface BlogPost {
  id: number
  title: string
  title_en: string | null
  title_ar: string | null
  slug: string
  excerpt: string
  excerpt_en: string | null
  excerpt_ar: string | null
  featured_image: string | null
  author_name: string
  published_at: string
  views: number
  tags: string[]
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { t, dir, language } = useLanguage()

  const getLocalizedValue = (post: BlogPost, field: 'title' | 'excerpt') => {
    if (language === 'ar' && field === 'title' && post.title_ar) return post.title_ar
    if (language === 'ar' && field === 'excerpt' && post.excerpt_ar) return post.excerpt_ar
    if (language === 'en' && field === 'title' && post.title_en) return post.title_en
    if (language === 'en' && field === 'excerpt' && post.excerpt_en) return post.excerpt_en
    return post[field] // Fallback to French
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  useEffect(() => {
    filterPosts()
  }, [searchQuery, selectedTag, posts, language])

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/blog?status=published')
      if (!response.ok) throw new Error('Failed to fetch posts')

      const data = await response.json()
      setPosts(data.posts)
      setFilteredPosts(data.posts)
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterPosts = () => {
    let filtered = posts

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (post) => {
          const title = getLocalizedValue(post, 'title')
          const excerpt = getLocalizedValue(post, 'excerpt')
          return title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                 excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
        }
      )
    }

    // Filter by tag
    if (selectedTag) {
      filtered = filtered.filter((post) => post.tags?.includes(selectedTag))
    }

    setFilteredPosts(filtered)
  }

  // Get all unique tags
  const allTags = Array.from(
    new Set(posts.flatMap((post) => post.tags || []))
  ).sort()

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(language === 'ar' ? 'ar-TN' : language === 'fr' ? 'fr-FR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <main className="min-h-screen bg-background" dir={dir}>
      <ParticleField />
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {t.blog.title.split(' ')[0]} <span className="gradient-text">{t.blog.title.split(' ').slice(1).join(' ') || 'Blog'}</span>
            </h1>
            <p className="text-xl text-foreground/60">
              {t.blog.description}
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="p-6 rounded-3xl glass glow-primary mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className={`absolute ${dir === 'rtl' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/40`} />
                  <Input
                    type="text"
                    placeholder={t.blog.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`${dir === 'rtl' ? 'pr-12' : 'pl-12'} bg-card/50 border-border/50`}
                  />
                </div>
              </div>

              {/* Tags */}
              {allTags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedTag(null)}
                    className={`px-4 py-2 rounded-full text-sm transition-all ${
                      !selectedTag
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-card/50 text-foreground/60 hover:bg-card'
                    }`}
                  >
                    {t.blog.allTags}
                  </button>
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      className={`px-4 py-2 rounded-full text-sm transition-all flex items-center gap-2 ${
                        selectedTag === tag
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-card/50 text-foreground/60 hover:bg-card'
                      }`}
                    >
                      <Tag className="h-3 w-3" />
                      {tag}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12 pb-20">
        <div className="container mx-auto px-6">
          {isLoading ? (
            <div className="text-center py-20">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
              <p className="mt-4 text-foreground/60">{t.blog.loading}</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-foreground/60 text-lg">
                {searchQuery || selectedTag
                  ? t.blog.noArticlesFound
                  : t.blog.noArticles}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="h-full p-6 rounded-3xl glass glow-primary hover:scale-105 transition-transform cursor-pointer">
                      {/* Featured Image */}
                      {post.featured_image && (
                        <div className="mb-4 rounded-2xl overflow-hidden aspect-video">
                          <img
                            src={post.featured_image}
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {post.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 rounded-full text-xs bg-primary/20 text-primary"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Title */}
                      <h3 className="text-xl font-bold mb-3 line-clamp-2">
                        {getLocalizedValue(post, 'title')}
                      </h3>

                      {/* Excerpt */}
                      {getLocalizedValue(post, 'excerpt') && (
                        <p className="text-foreground/60 mb-4 line-clamp-3">
                          {getLocalizedValue(post, 'excerpt')}
                        </p>
                      )}

                      {/* Meta */}
                      <div className="flex items-center gap-4 text-sm text-foreground/50 mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(post.published_at)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          <span>{post.views}</span>
                        </div>
                      </div>

                      {/* Author */}
                      <div className="flex items-center gap-2 pt-4 border-t border-border/30">
                        <User className="h-4 w-4 text-foreground/40" />
                        <span className="text-sm text-foreground/60">
                          {post.author_name}
                        </span>
                      </div>

                      {/* Read More */}
                      <div className="mt-4">
                        <Button variant="ghost" className="w-full group">
                          {t.blog.readArticle}
                          <ArrowRight className={`ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                        </Button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
