'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { Calendar, User, Eye, ArrowLeft, Share2, Tag } from 'lucide-react'
import { Button } from '@/components/ui/button'
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
  content: string
  content_en: string | null
  content_ar: string | null
  featured_image: string | null
  author_name: string
  author_email: string
  published_at: string
  views: number
  tags: string[]
  meta_title: string
  meta_title_en: string | null
  meta_title_ar: string | null
  meta_description: string
  meta_description_en: string | null
  meta_description_ar: string | null
}

export default function BlogPostPage() {
  const params = useParams()
  const slug = params?.slug as string
  const [post, setPost] = useState<BlogPost | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showShareMenu, setShowShareMenu] = useState(false)
  const { t, dir, language } = useLanguage()

  const getLocalizedValue = (post: BlogPost, field: 'title' | 'excerpt' | 'content' | 'meta_title' | 'meta_description') => {
    if (language === 'ar' && post[`${field}_ar` as keyof BlogPost]) return post[`${field}_ar` as keyof BlogPost] as string
    if (language === 'en' && post[`${field}_en` as keyof BlogPost]) return post[`${field}_en` as keyof BlogPost] as string
    return post[field as keyof BlogPost] as string // Fallback to French
  }

  useEffect(() => {
    if (slug) {
      fetchPost()
    }
  }, [slug])

  // Update meta tags when language or post changes
  useEffect(() => {
    if (post) {
      const metaTitle = getLocalizedValue(post, 'meta_title')
      const metaDesc = getLocalizedValue(post, 'meta_description')
      
      if (metaTitle) {
        document.title = metaTitle
      }
      if (metaDesc) {
        const metaDescription = document.querySelector('meta[name="description"]')
        if (metaDescription) {
          metaDescription.setAttribute('content', metaDesc)
        }
      }
    }
  }, [post, language])

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/blog/${slug}`)
      if (!response.ok) {
        if (response.status === 404) {
          setPost(null)
        }
        throw new Error('Failed to fetch post')
      }

      const data = await response.json()
      setPost(data.post)
    } catch (error) {
      console.error('Error fetching post:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const shareOnFacebook = () => {
    const url = encodeURIComponent(window.location.href)
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`
    window.open(facebookUrl, '_blank', 'width=600,height=400')
  }

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(window.location.href)
    const title = encodeURIComponent(post?.title || '')
    const summary = encodeURIComponent(post?.excerpt || '')
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
    window.open(linkedInUrl, '_blank', 'width=600,height=400')
  }

  const shareOnTwitter = () => {
    const url = encodeURIComponent(window.location.href)
    const text = encodeURIComponent(post?.title || '')
    const twitterUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`
    window.open(twitterUrl, '_blank', 'width=600,height=400')
  }

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    alert(t.blog.linkCopied)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(language === 'ar' ? 'ar-TN' : language === 'fr' ? 'fr-FR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center" dir={dir}>
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
          <p className="mt-4 text-foreground/60">{t.blog.loadingArticle}</p>
        </div>
      </main>
    )
  }

  if (!post) {
    return (
      <main className="min-h-screen bg-background" dir={dir}>
        <Navigation />
        <div className="container mx-auto px-6 py-32 text-center">
          <h1 className="text-4xl font-bold mb-4">{t.blog.articleNotFound}</h1>
          <p className="text-foreground/60 mb-8">
            {t.blog.articleNotFoundDesc}
          </p>
          <Link href="/blog">
            <Button>
              <ArrowLeft className={`mr-2 h-4 w-4 ${dir === 'rtl' ? 'rotate-180 ml-2 mr-0' : ''}`} />
              {t.blog.backToBlog}
            </Button>
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background" dir={dir}>
      <ParticleField />
      <Navigation />

      {/* Article Header */}
      <section className="relative pt-32 pb-12">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            {/* Back Button */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-foreground/60 hover:text-foreground mb-8 transition-colors"
            >
              <ArrowLeft className={`h-4 w-4 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
              {t.blog.backToBlog}
            </Link>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 rounded-full text-sm bg-primary/20 text-primary flex items-center gap-2"
                  >
                    <Tag className="h-3 w-3" />
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{getLocalizedValue(post, 'title')}</h1>

            {/* Excerpt */}
            {getLocalizedValue(post, 'excerpt') && (
              <p className="text-xl text-foreground/70 mb-8">{getLocalizedValue(post, 'excerpt')}</p>
            )}

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-foreground/60 mb-8">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span>{post.author_name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>{formatDate(post.published_at)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                <span>{post.views} {t.blog.views}</span>
              </div>
            </div>

            {/* Share Buttons - Prominent Section */}
            <div className="p-6 rounded-2xl glass glow-accent mb-8">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Share2 className="h-5 w-5 text-accent" />
                {t.blog.shareTitle}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={shareOnFacebook}
                  className="px-6 py-4 rounded-xl bg-[#1877F2] text-white hover:bg-[#1877F2]/90 hover:scale-105 transition-all flex items-center justify-center gap-3 font-medium shadow-lg"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  {t.blog.shareOnFacebook}
                </button>

                <button
                  onClick={shareOnLinkedIn}
                  className="px-6 py-4 rounded-xl bg-[#0A66C2] text-white hover:bg-[#0A66C2]/90 hover:scale-105 transition-all flex items-center justify-center gap-3 font-medium shadow-lg"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  {t.blog.shareOnLinkedIn}
                </button>
              </div>

              <div className="mt-3 text-center text-sm text-foreground/60">
                {t.blog.shareDesc}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      {post.featured_image && (
        <section className="py-8">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-4xl mx-auto rounded-3xl overflow-hidden"
            >
              <img
                src={post.featured_image}
                alt={getLocalizedValue(post, 'title')}
                className="w-full h-auto"
              />
            </motion.div>
          </div>
        </section>
      )}

      {/* Article Content */}
      <section className="py-12 pb-20">
        <div className="container mx-auto px-6">
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <div
              className={`prose prose-lg prose-invert max-w-none
                prose-headings:font-bold prose-headings:text-foreground
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                prose-p:text-foreground/80 prose-p:leading-relaxed prose-p:mb-6
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-ul:text-foreground/80 prose-ul:mb-6
                prose-ol:text-foreground/80 prose-ol:mb-6
                prose-li:mb-2
                prose-strong:text-foreground prose-strong:font-semibold
                prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                prose-img:rounded-2xl prose-img:my-8 ${dir === 'rtl' ? 'text-right' : ''}`}
              dangerouslySetInnerHTML={{ __html: getLocalizedValue(post, 'content') }}
            />

            {/* Share Again at Bottom - Simple & Clean */}
            <div className="mt-16 pt-8 border-t border-border/30">
              <div className="p-6 rounded-2xl glass text-center">
                <h3 className="text-xl font-bold mb-4">{t.blog.didYouLike}</h3>
                <p className="text-foreground/60 mb-6">{t.blog.shareWithNetwork}</p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button
                    onClick={shareOnFacebook}
                    className="px-8 py-4 rounded-xl bg-[#1877F2] text-white hover:bg-[#1877F2]/90 hover:scale-105 transition-all flex items-center justify-center gap-3 font-semibold text-lg shadow-xl"
                  >
                    <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    {t.blog.shareOnFacebook}
                  </button>

                  <button
                    onClick={shareOnLinkedIn}
                    className="px-8 py-4 rounded-xl bg-[#0A66C2] text-white hover:bg-[#0A66C2]/90 hover:scale-105 transition-all flex items-center justify-center gap-3 font-semibold text-lg shadow-xl"
                  >
                    <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    {t.blog.shareOnLinkedIn}
                  </button>
                </div>
              </div>
            </div>

            {/* Back to Blog */}
            <div className="mt-12 text-center">
              <Link href="/blog">
                <Button variant="outline" size="lg">
                  <ArrowLeft className={`mr-2 h-4 w-4 ${dir === 'rtl' ? 'rotate-180 ml-2 mr-0' : ''}`} />
                  {t.blog.backToBlog}
                </Button>
              </Link>
            </div>
          </motion.article>
        </div>
      </section>

      <Footer />
    </main>
  )
}
