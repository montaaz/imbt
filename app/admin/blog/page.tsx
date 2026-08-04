'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminSidebar from '@/components/admin-sidebar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Calendar,
  User,
  TrendingUp,
  FileText,
  X,
  ChevronUp,
  ChevronDown,
  List,
  Type,
  Heading2,
} from 'lucide-react'

interface BlogPost {
  id: number
  title: string
  title_en: string | null
  title_ar: string | null
  slug: string
  subtitle: string | null
  subtitle_en: string | null
  subtitle_ar: string | null
  excerpt: string
  excerpt_en: string | null
  excerpt_ar: string | null
  content: string
  content_en: string | null
  content_ar: string | null
  featured_image: string | null
  author_name: string
  status: 'draft' | 'published' | 'archived'
  published_at: string | null
  views: number
  tags: string[]
  created_at: string
}

interface ContentSection {
  id: string
  type: 'heading' | 'paragraph' | 'list'
  title?: string
  content: string
  items?: string[]
}

import { useLanguage } from '@/lib/i18n/language-context'

export default function AdminBlogPage() {
  const router = useRouter()
  const { t, dir, language } = useLanguage()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [activeTab, setActiveTab] = useState<'fr' | 'en' | 'ar'>('fr')
  
  const [formData, setFormData] = useState({
    fr: {
      title: '',
      subtitle: '',
      excerpt: '',
      content: '',
    },
    en: {
      title: '',
      subtitle: '',
      excerpt: '',
      content: '',
    },
    ar: {
      title: '',
      subtitle: '',
      excerpt: '',
      content: '',
    },
    slug: '',
    featuredImage: '',
    status: 'draft' as 'draft' | 'published' | 'archived',
    tags: '',
  })
  
  const [contentSections, setContentSections] = useState<{
    fr: ContentSection[],
    en: ContentSection[],
    ar: ContentSection[]
  }>({
    fr: [{ id: '1', type: 'heading', title: 'Introduction', content: '' }],
    en: [{ id: '1', type: 'heading', title: 'Introduction', content: '' }],
    ar: [{ id: '1', type: 'heading', title: 'مقدمة', content: '' }],
  })

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        router.push('/auth/signin')
        return
      }

      // Fetch all posts (including drafts) for admin
      const response = await fetch('/api/blog?status=', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) throw new Error(t.common.error)

      const data = await response.json()
      setPosts(data.posts)
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove accents
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const handleTitleChange = (title: string, lang: 'fr' | 'en' | 'ar') => {
    setFormData((prev) => ({
      ...prev,
      [lang]: { ...prev[lang], title },
      slug: editingPost ? prev.slug : lang === 'fr' ? generateSlug(title) : prev.slug,
    }))
  }

  const convertSectionsToHTML = (lang: 'fr' | 'en' | 'ar') => {
    let html = ''
    if (formData[lang].subtitle) {
      html += `<p class="subtitle">${formData[lang].subtitle}</p>\n\n`
    }
    contentSections[lang].forEach((section) => {
      if (section.type === 'heading') {
        html += `<h2>${section.title}</h2>\n<p>${section.content}</p>\n\n`
      } else if (section.type === 'paragraph') {
        html += `<p>${section.content}</p>\n\n`
      } else if (section.type === 'list' && section.items) {
        html += `<p><strong>${section.title}</strong></p>\n<ul>\n`
        section.items.forEach((item) => {
          html += `  <li>${item}</li>\n`
        })
        html += `</ul>\n\n`
      }
    })
    return html.trim()
  }

  const parseHTMLToSections = (html: string | null): ContentSection[] => {
    if (!html) return [{ id: '1', type: 'heading' as const, title: 'Introduction', content: '' }]
    
    // Simple parser for existing content
    const sections: ContentSection[] = []
    let id = 1

    // Parse sections - simple implementation
    const h2Matches = Array.from(html.matchAll(/<h2>(.*?)<\/h2>\s*<p>(.*?)<\/p>/g))
    for (const match of h2Matches) {
      sections.push({
        id: String(id++),
        type: 'heading' as const,
        title: match[1],
        content: match[2],
      })
    }

    if (sections.length === 0) {
      sections.push({ id: '1', type: 'heading' as const, title: 'Introduction', content: html.replace(/<p class="subtitle">.*?<\/p>/, '').trim() })
    }

    return sections
  }

  const getSubtitleFromHTML = (html: string | null) => {
    if (!html) return ''
    const subtitleMatch = html.match(/<p class="subtitle">(.*?)<\/p>/)
    return subtitleMatch ? subtitleMatch[1] : ''
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const token = localStorage.getItem('token')
      if (!token) {
        router.push('/auth/signin')
        return
      }

      const body = {
        title: formData.fr.title,
        title_en: formData.en.title,
        title_ar: formData.ar.title,
        subtitle: formData.fr.subtitle,
        subtitle_en: formData.en.subtitle,
        subtitle_ar: formData.ar.subtitle,
        slug: formData.slug,
        excerpt: formData.fr.excerpt,
        excerpt_en: formData.en.excerpt,
        excerpt_ar: formData.ar.excerpt,
        content: convertSectionsToHTML('fr'),
        content_en: convertSectionsToHTML('en'),
        content_ar: convertSectionsToHTML('ar'),
        featuredImage: formData.featuredImage || null,
        status: formData.status,
        tags: formData.tags ? formData.tags.split(',').map((t) => t.trim()) : [],
        metaTitle: formData.fr.title,
        metaTitle_en: formData.en.title,
        metaTitle_ar: formData.ar.title,
        metaDescription: formData.fr.excerpt,
        metaDescription_en: formData.en.excerpt,
        metaDescription_ar: formData.ar.excerpt,
      }

      let response
      if (editingPost) {
        response = await fetch(`/api/blog/${editingPost.slug}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ ...body, newSlug: formData.slug }),
        })
      } else {
        response = await fetch('/api/blog', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        })
      }

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || t.admin.errorSave)
      }

      // Reset form and close modal
      resetForm()
      setShowCreateModal(false)
      setEditingPost(null)
      fetchPosts()
      alert(t.admin.successSave)
    } catch (error) {
      console.error('Error saving post:', error)
      alert(error instanceof Error ? error.message : t.admin.errorSave)
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      fr: { title: '', subtitle: '', excerpt: '', content: '' },
      en: { title: '', subtitle: '', excerpt: '', content: '' },
      ar: { title: '', subtitle: '', excerpt: '', content: '' },
      slug: '',
      featuredImage: '',
      status: 'draft',
      tags: '',
    })
    setContentSections({
      fr: [{ id: '1', type: 'heading', title: 'Introduction', content: '' }],
      en: [{ id: '1', type: 'heading', title: 'Introduction', content: '' }],
      ar: [{ id: '1', type: 'heading', title: 'مقدمة', content: '' }],
    })
    setActiveTab('fr')
  }

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post)
    setFormData({
      fr: {
        title: post.title,
        subtitle: post.subtitle || getSubtitleFromHTML(post.content),
        excerpt: post.excerpt || '',
        content: post.content,
      },
      en: {
        title: post.title_en || '',
        subtitle: post.subtitle_en || getSubtitleFromHTML(post.content_en),
        excerpt: post.excerpt_en || '',
        content: post.content_en || '',
      },
      ar: {
        title: post.title_ar || '',
        subtitle: post.subtitle_ar || getSubtitleFromHTML(post.content_ar),
        excerpt: post.excerpt_ar || '',
        content: post.content_ar || '',
      },
      slug: post.slug,
      featuredImage: post.featured_image || '',
      status: post.status,
      tags: post.tags ? post.tags.join(', ') : '',
    })
    
    setContentSections({
      fr: parseHTMLToSections(post.content),
      en: parseHTMLToSections(post.content_en),
      ar: parseHTMLToSections(post.content_ar),
    })
    
    setShowCreateModal(true)
  }

  const addSection = (type: 'heading' | 'paragraph' | 'list') => {
    const newSection: ContentSection = {
      id: String(Date.now()),
      type,
      title: type === 'heading' ? (activeTab === 'ar' ? 'قسم جديد' : 'New Section') : type === 'list' ? (activeTab === 'ar' ? 'قائمة' : 'List') : undefined,
      content: '',
      items: type === 'list' ? [''] : undefined,
    }
    setContentSections({
      ...contentSections,
      [activeTab]: [...contentSections[activeTab], newSection]
    })
  }

  const updateSection = (id: string, updates: Partial<ContentSection>) => {
    setContentSections({
      ...contentSections,
      [activeTab]: contentSections[activeTab].map((section) =>
        section.id === id ? { ...section, ...updates } : section
      )
    })
  }

  const removeSection = (id: string) => {
    setContentSections({
      ...contentSections,
      [activeTab]: contentSections[activeTab].filter((section) => section.id !== id)
    })
  }

  const moveSection = (id: string, direction: 'up' | 'down') => {
    const currentSections = contentSections[activeTab]
    const index = currentSections.findIndex((s) => s.id === id)
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === currentSections.length - 1)
    )
      return

    const newSections = [...currentSections]
    const newIndex = direction === 'up' ? index - 1 : index + 1
    ;[newSections[index], newSections[newIndex]] = [
      newSections[newIndex],
      newSections[index],
    ]
    
    setContentSections({
      ...contentSections,
      [activeTab]: newSections
    })
  }

  const addListItem = (sectionId: string) => {
    setContentSections({
      ...contentSections,
      [activeTab]: contentSections[activeTab].map((section) =>
        section.id === sectionId && section.items
          ? { ...section, items: [...section.items, ''] }
          : section
      )
    })
  }

  const updateListItem = (sectionId: string, itemIndex: number, value: string) => {
    setContentSections({
      ...contentSections,
      [activeTab]: contentSections[activeTab].map((section) =>
        section.id === sectionId && section.items
          ? {
              ...section,
              items: section.items.map((item, i) => (i === itemIndex ? value : item)),
            }
          : section
      )
    })
  }

  const removeListItem = (sectionId: string, itemIndex: number) => {
    setContentSections({
      ...contentSections,
      [activeTab]: contentSections[activeTab].map((section) =>
        section.id === sectionId && section.items
          ? { ...section, items: section.items.filter((_, i) => i !== itemIndex) }
          : section
      )
    })
  }

  const handleDelete = async (slug: string) => {
    if (!confirm(t.admin.confirmDeletePost)) return

    try {
      const token = localStorage.getItem('token')
      if (!token) {
        router.push('/auth/signin')
        return
      }

      const response = await fetch(`/api/blog/${slug}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) throw new Error(t.common.error)

      fetchPosts()
    } catch (error) {
      console.error('Error deleting post:', error)
      alert(t.common.error)
    }
  }

  const getStatusBadge = (status: string) => {
    const colors = {
      draft: 'bg-gray-500/20 text-gray-400',
      published: 'bg-green-500/20 text-green-400',
      archived: 'bg-red-500/20 text-red-400',
    }
    return colors[status as keyof typeof colors] || colors.draft
  }

  return (
    <div className="min-h-screen bg-background flex" dir={dir}>
      <AdminSidebar />

      <main className={`flex-1 p-8 ${dir === 'rtl' ? 'mr-64' : 'ml-64'}`}>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div className={dir === 'rtl' ? 'text-right' : 'text-left'}>
              <h1 className="text-3xl font-bold mb-2">{t.admin.blogManagementTitle}</h1>
              <p className="text-foreground/60">
                {t.admin.blogManagementDesc}
              </p>
            </div>
            <Button
              onClick={() => {
                setEditingPost(null)
                resetForm()
                setShowCreateModal(true)
              }}
              className="glow-primary bg-[#a80202] text-white hover:bg-[#8a0101] border-0"
            >
              <Plus className={`${dir === 'rtl' ? 'ml-2' : 'mr-2'} h-4 w-4`} />
              {t.admin.newArticle}
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="p-6 rounded-2xl glass">
              <div className="flex items-center justify-between mb-2">
                <FileText className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold">
                  {posts.length}
                </span>
              </div>
              <p className="text-sm text-foreground/60">{t.admin.totalArticles}</p>
            </div>
            <div className="p-6 rounded-2xl glass">
              <div className="flex items-center justify-between mb-2">
                <Eye className="h-5 w-5 text-green-500" />
                <span className="text-2xl font-bold">
                  {posts.filter((p) => p.status === 'published').length}
                </span>
              </div>
              <p className="text-sm text-foreground/60">{t.admin.published}</p>
            </div>
            <div className="p-6 rounded-2xl glass">
              <div className="flex items-center justify-between mb-2">
                <Edit className="h-5 w-5 text-yellow-500" />
                <span className="text-2xl font-bold">
                  {posts.filter((p) => p.status === 'draft').length}
                </span>
              </div>
              <p className="text-sm text-foreground/60">{t.admin.drafts}</p>
            </div>
            <div className="p-6 rounded-2xl glass">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="h-5 w-5 text-blue-500" />
                <span className="text-2xl font-bold">
                  {posts.reduce((sum, p) => sum + p.views, 0)}
                </span>
              </div>
              <p className="text-sm text-foreground/60">{t.admin.totalViews}</p>
            </div>
          </div>

          {/* Posts List */}
          <div className="rounded-2xl glass overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-card/50 border-b border-border/50">
                  <tr>
                    <th className={`px-6 py-4 ${dir === 'rtl' ? 'text-right' : 'text-left'} text-sm font-medium text-foreground/70`}>
                      {t.admin.title}
                    </th>
                    <th className={`px-6 py-4 ${dir === 'rtl' ? 'text-right' : 'text-left'} text-sm font-medium text-foreground/70`}>
                      {t.admin.status}
                    </th>
                    <th className={`px-6 py-4 ${dir === 'rtl' ? 'text-right' : 'text-left'} text-sm font-medium text-foreground/70`}>
                      {t.admin.author}
                    </th>
                    <th className={`px-6 py-4 ${dir === 'rtl' ? 'text-right' : 'text-left'} text-sm font-medium text-foreground/70`}>
                      {t.admin.views}
                    </th>
                    <th className={`px-6 py-4 ${dir === 'rtl' ? 'text-right' : 'text-left'} text-sm font-medium text-foreground/70`}>
                      {t.admin.date}
                    </th>
                    <th className={`px-6 py-4 ${dir === 'rtl' ? 'text-left' : 'text-right'} text-sm font-medium text-foreground/70`}>
                      {t.admin.actions}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {posts.map((post) => (
                    <tr key={post.id} className="hover:bg-card/30 transition-colors">
                      <td className={`px-6 py-4 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                        <div>
                          <p className="font-medium">{post.title}</p>
                          <p className="text-sm text-foreground/50">/{post.slug}</p>
                        </div>
                      </td>
                      <td className={`px-6 py-4 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                            post.status
                          )}`}
                        >
                          {t.status[post.status as keyof typeof t.status] || post.status}
                        </span>
                      </td>
                      <td className={`px-6 py-4 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-foreground/40" />
                          <span className="text-sm">{post.author_name}</span>
                        </div>
                      </td>
                      <td className={`px-6 py-4 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                        <div className="flex items-center gap-2">
                          <Eye className="h-4 w-4 text-foreground/40" />
                          <span className="text-sm">{post.views}</span>
                        </div>
                      </td>
                      <td className={`px-6 py-4 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-foreground/40" />
                          <span className="text-sm">
                            {post.published_at
                              ? new Date(post.published_at).toLocaleDateString(language === 'ar' ? 'ar-TN' : 'fr-FR')
                              : t.admin.notPublished}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className={`flex items-center ${dir === 'rtl' ? 'justify-start' : 'justify-end'} gap-2`}>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              window.open(`/blog/${post.slug}`, '_blank')
                            }
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(post)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(post.slug)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Create/Edit Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-card rounded-3xl p-8 max-w-5xl w-full my-8 glass">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">
                  {editingPost ? t.admin.editPost : t.admin.createPost}
                </h2>
                <button onClick={() => setShowCreateModal(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Language Tabs */}
                <div className="flex gap-2 border-b border-border/30 pb-4">
                  {(['fr', 'en', 'ar'] as const).map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => setActiveTab(lang)}
                      className={`px-6 py-2 rounded-xl transition-all ${
                        activeTab === lang
                          ? 'bg-[#a80202] text-white glow-primary'
                          : 'bg-card/50 text-foreground/60 hover:bg-card'
                      }`}
                    >
                      {lang === 'fr' ? 'Français' : lang === 'en' ? 'English' : 'العربية'}
                    </button>
                  ))}
                </div>

                {/* Title and Metadata */}
                <div className="space-y-4 p-6 rounded-2xl bg-card/30 border border-border/20">
                  <h3 className={`text-lg font-semibold flex items-center gap-2 ${activeTab === 'ar' ? 'flex-row-reverse text-right' : 'text-left'}`}>
                    <FileText className="h-5 w-5" />
                    {t.admin.basicInfo} ({activeTab.toUpperCase()})
                  </h3>

                  <div className="grid grid-cols-1 gap-4">
                    <div className={activeTab === 'ar' ? 'text-right' : 'text-left'}>
                      <Label htmlFor="title">{t.admin.mainTitle} *</Label>
                      <Input
                        id="title"
                        value={formData[activeTab].title}
                        onChange={(e) => handleTitleChange(e.target.value, activeTab)}
                        required={activeTab === 'fr'}
                        placeholder={t.admin.articleTitlePlaceholder}
                        className={`bg-card/50 border-border/50 text-lg font-semibold ${activeTab === 'ar' ? 'text-right' : 'text-left'}`}
                      />
                    </div>

                    <div className={activeTab === 'ar' ? 'text-right' : 'text-left'}>
                      <Label htmlFor="subtitle">{t.admin.subtitle}</Label>
                      <Input
                        id="subtitle"
                        value={formData[activeTab].subtitle}
                        onChange={(e) =>
                          setFormData({ 
                            ...formData, 
                            [activeTab]: { ...formData[activeTab], subtitle: e.target.value } 
                          })
                        }
                        placeholder={t.admin.articleSubtitlePlaceholder}
                        className={`bg-card/50 border-border/50 ${activeTab === 'ar' ? 'text-right' : 'text-left'}`}
                      />
                    </div>

                    {activeTab === 'fr' && (
                      <div className="text-left">
                        <Label htmlFor="slug">{t.admin.slug} *</Label>
                        <Input
                          id="slug"
                          value={formData.slug}
                          onChange={(e) =>
                            setFormData({ ...formData, slug: e.target.value })
                          }
                          required
                          placeholder={t.admin.articleSlugPlaceholder}
                          className="bg-card/50 border-border/50 font-mono text-sm text-left"
                        />
                        <p className="text-xs text-foreground/50 mt-1">
                          URL: /blog/{formData.slug || 'slug-de-article'}
                        </p>
                      </div>
                    )}

                    <div className={activeTab === 'ar' ? 'text-right' : 'text-left'}>
                      <Label htmlFor="excerpt">{t.admin.excerpt} *</Label>
                      <Textarea
                        id="excerpt"
                        value={formData[activeTab].excerpt}
                        onChange={(e) =>
                          setFormData({ 
                            ...formData, 
                            [activeTab]: { ...formData[activeTab], excerpt: e.target.value } 
                          })
                        }
                        placeholder={t.admin.articleExcerptPlaceholder}
                        rows={2}
                        required={activeTab === 'fr'}
                        className={`bg-card/50 border-border/50 ${activeTab === 'ar' ? 'text-right' : 'text-left'}`}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className={activeTab === 'ar' ? 'text-right' : 'text-left'}>
                        <Label htmlFor="featuredImage">{t.admin.featuredImage}</Label>
                        <Input
                          id="featuredImage"
                          value={formData.featuredImage}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              featuredImage: e.target.value,
                            })
                          }
                          placeholder="https://example.com/image.jpg"
                          className={`bg-card/50 border-border/50 text-sm ${activeTab === 'ar' ? 'text-right' : 'text-left'}`}
                        />
                      </div>

                      <div className={activeTab === 'ar' ? 'text-right' : 'text-left'}>
                        <Label htmlFor="tags">{t.admin.tags}</Label>
                        <Input
                          id="tags"
                          value={formData.tags}
                          onChange={(e) =>
                            setFormData({ ...formData, tags: e.target.value })
                          }
                          placeholder="Transformation Digitale, Tendances, IA"
                          className={`bg-card/50 border-border/50 ${activeTab === 'ar' ? 'text-right' : 'text-left'}`}
                        />
                      </div>
                    </div>

                    <div className={activeTab === 'ar' ? 'text-right' : 'text-left'}>
                      <Label htmlFor="status">{t.admin.status}</Label>
                      <select
                        id="status"
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                        className={`w-full bg-card/50 border border-border/50 rounded-md p-2 ${activeTab === 'ar' ? 'text-right' : 'text-left'}`}
                      >
                        <option value="draft">{t.status.draft}</option>
                        <option value="published">{t.status.published}</option>
                        <option value="archived">{t.status.archived}</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Content Sections */}
                <div className="space-y-4 p-6 rounded-2xl bg-card/30 border border-border/20">
                  <div className={`flex items-center justify-between ${activeTab === 'ar' ? 'flex-row-reverse' : ''}`}>
                    <h3 className={`text-lg font-semibold flex items-center gap-2 ${activeTab === 'ar' ? 'flex-row-reverse text-right' : 'text-left'}`}>
                      <Heading2 className="h-5 w-5" />
                      {t.admin.articleContent} ({activeTab.toUpperCase()})
                    </h3>
                    <div className={`flex gap-2 ${activeTab === 'ar' ? 'flex-row-reverse' : ''}`}>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => addSection('heading')}
                        className="bg-white/5"
                      >
                        <Heading2 className={`${activeTab === 'ar' ? 'ml-2' : 'mr-2'} h-4 w-4`} />
                        {t.admin.addSection}
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => addSection('paragraph')}
                        className="bg-white/5"
                      >
                        <Type className={`${activeTab === 'ar' ? 'ml-2' : 'mr-2'} h-4 w-4`} />
                        {t.admin.addParagraph}
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => addSection('list')}
                        className="bg-white/5"
                      >
                        <List className={`${activeTab === 'ar' ? 'ml-2' : 'mr-2'} h-4 w-4`} />
                        {t.admin.addList}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {contentSections[activeTab].map((section, index) => (
                      <div
                        key={section.id}
                        className="p-4 rounded-xl bg-card/50 border border-border/30"
                      >
                        <div className={`flex items-start gap-3 ${activeTab === 'ar' ? 'flex-row-reverse' : ''}`}>
                          <div className="flex flex-col gap-1 mt-1">
                            <button
                              type="button"
                              onClick={() => moveSection(section.id, 'up')}
                              disabled={index === 0}
                              className="p-1 rounded hover:bg-muted disabled:opacity-30"
                            >
                              <ChevronUp className="h-4 w-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => moveSection(section.id, 'down')}
                              disabled={index === contentSections[activeTab].length - 1}
                              className="p-1 rounded hover:bg-muted disabled:opacity-30"
                            >
                              <ChevronDown className="h-4 w-4" />
                            </button>
                          </div>

                          <div className={`flex-1 space-y-3 ${activeTab === 'ar' ? 'text-right' : 'text-left'}`}>
                            {section.type === 'heading' && (
                              <>
                                <Input
                                  value={section.title || ''}
                                  onChange={(e) =>
                                    updateSection(section.id, {
                                      title: e.target.value,
                                    })
                                  }
                                  placeholder={t.admin.sectionTitle}
                                  className={`font-semibold text-lg ${activeTab === 'ar' ? 'text-right' : 'text-left'}`}
                                />
                                <Textarea
                                  value={section.content}
                                  onChange={(e) =>
                                    updateSection(section.id, {
                                      content: e.target.value,
                                    })
                                  }
                                  placeholder={t.admin.articleContent}
                                  rows={3}
                                  className={activeTab === 'ar' ? 'text-right' : 'text-left'}
                                />
                              </>
                            )}

                            {section.type === 'paragraph' && (
                              <Textarea
                                value={section.content}
                                onChange={(e) =>
                                  updateSection(section.id, {
                                    content: e.target.value,
                                  })
                                }
                                placeholder={t.admin.articleContent}
                                rows={3}
                                className={activeTab === 'ar' ? 'text-right' : 'text-left'}
                              />
                            )}

                            {section.type === 'list' && (
                              <>
                                <Input
                                  value={section.title || ''}
                                  onChange={(e) =>
                                    updateSection(section.id, {
                                      title: e.target.value,
                                    })
                                  }
                                  placeholder={t.admin.listTitle}
                                  className={`font-semibold ${activeTab === 'ar' ? 'text-right' : 'text-left'}`}
                                />
                                <div className="space-y-2">
                                  {section.items?.map((item, itemIndex) => (
                                    <div
                                      key={itemIndex}
                                      className={`flex gap-2 items-center ${activeTab === 'ar' ? 'flex-row-reverse' : ''}`}
                                    >
                                      <span className="text-foreground/40">•</span>
                                      <Input
                                        value={item}
                                        onChange={(e) =>
                                          updateListItem(
                                            section.id,
                                            itemIndex,
                                            e.target.value
                                          )
                                        }
                                        placeholder={t.admin.listItemPlaceholder}
                                        className={`flex-1 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}
                                      />
                                      <Button
                                        type="button"
                                        size="sm"
                                        variant="ghost"
                                        onClick={() =>
                                          removeListItem(section.id, itemIndex)
                                        }
                                      >
                                        <X className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  ))}
                                  <Button
                                    type="button"
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => addListItem(section.id)}
                                    className={`mt-2 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}
                                  >
                                    <Plus className={`${dir === 'rtl' ? 'ml-2' : 'mr-2'} h-4 w-4`} />
                                    {t.admin.addList}
                                  </Button>
                                </div>
                              </>
                            )}
                          </div>

                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            onClick={() => removeSection(section.id)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`flex gap-4 pt-4 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 glow-primary bg-[#a80202] text-white hover:bg-[#8a0101] border-0"
                  >
                    {isLoading ? t.admin.saving : t.admin.save}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 bg-transparent"
                  >
                    {t.common.cancel}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
