# 📝 Blog System Guide

## ✅ Installation Complete!

The blog system has been successfully installed and configured. You can now create and manage blog posts from the admin panel.

---

## 🎯 Features

### For Admins:
- ✅ Create, edit, and delete blog posts
- ✅ Draft, publish, or archive posts
- ✅ Rich HTML content support
- ✅ Featured images
- ✅ Tags for categorization
- ✅ SEO meta tags
- ✅ View statistics (views, status)
- ✅ URL-friendly slugs

### For Visitors:
- ✅ View all published blog posts
- ✅ Search articles
- ✅ Filter by tags
- ✅ Read full articles
- ✅ **Share on Facebook**
- ✅ **Share on LinkedIn**
- ✅ **Share on Twitter**
- ✅ Copy link to share

---

## 📍 URLs

### Public Pages:
- **Blog Listing**: http://localhost:3000/blog
- **Individual Post**: http://localhost:3000/blog/[slug]
  - Example: http://localhost:3000/blog/tendances-transformation-digitale-2025

### Admin Pages:
- **Blog Management**: http://localhost:3000/admin/blog

---

## 🚀 How to Use (Admin)

### 1. Access Admin Panel
1. Login to admin: http://localhost:3000/auth/signin
2. Navigate to "Blog" in the sidebar
3. You'll see the blog dashboard with statistics

### 2. Create a New Blog Post

Click the **"Nouvel Article"** button and fill in:

#### Required Fields:
- **Titre**: The title of your article
  - Example: "Les 5 tendances de la transformation digitale en 2025"
- **Slug**: URL-friendly version (auto-generated from title)
  - Example: `tendances-transformation-digitale-2025`
  - URL will be: `/blog/tendances-transformation-digitale-2025`
- **Contenu**: The article content (HTML supported)

#### Optional Fields:
- **Extrait**: Short summary (shown on blog listing page)
- **Image à la une**: URL of the featured image
- **Tags**: Comma-separated tags for categorization
  - Example: "Transformation Digitale, Tendances, IA"
- **Statut**:
  - **Brouillon**: Not visible to public
  - **Publié**: Visible to everyone
  - **Archivé**: Hidden but not deleted

### 3. Write Content with HTML

The content field supports HTML. You can use:

```html
<h2>Main Section Title</h2>
<p>Your paragraph text here...</p>

<h3>Subsection Title</h3>
<p>More content...</p>

<ul>
  <li>Bullet point 1</li>
  <li>Bullet point 2</li>
</ul>

<ol>
  <li>Numbered item 1</li>
  <li>Numbered item 2</li>
</ol>

<strong>Bold text</strong>
<em>Italic text</em>

<a href="https://example.com">Link text</a>

<img src="https://example.com/image.jpg" alt="Description" />
```

### 4. Publish Your Post

1. Set **Statut** to "Publié"
2. Click **"Enregistrer"**
3. Your post is now live at `/blog/your-slug`

### 5. Edit Existing Posts

1. Click the edit icon (✏️) on any post
2. Make your changes
3. Click "Enregistrer"

### 6. Delete Posts

1. Click the trash icon (🗑️) on any post
2. Confirm deletion
3. Post is permanently removed

---

## 👀 Sample Posts

Three sample blog posts were created during migration:

1. **Les 5 tendances de la transformation digitale en 2025**
   - URL: `/blog/tendances-transformation-digitale-2025`
   - Tags: Transformation Digitale, Tendances, IA

2. **Comment choisir le bon CRM pour votre entreprise**
   - URL: `/blog/choisir-crm-entreprise`
   - Tags: CRM, Gestion Client, Outils

3. **L'importance de la formation digitale en entreprise**
   - URL: `/blog/importance-formation-digitale`
   - Tags: Formation, Digital, RH

Visit http://localhost:3000/blog to see them!

---

## 📱 Social Sharing

### How It Works:

On each blog post page, visitors will see share buttons for:

1. **Facebook** 🔵
   - Opens Facebook share dialog
   - Pre-fills with article URL
   - Users can add their own comment

2. **LinkedIn** 💼
   - Opens LinkedIn share dialog
   - Pre-fills with article URL
   - Professional sharing

3. **Twitter** 🐦
   - Opens Twitter tweet dialog
   - Pre-fills with title and URL
   - Quick social sharing

4. **Copy Link** 🔗
   - Copies URL to clipboard
   - Share anywhere

### Where Share Buttons Appear:
- **Top of article**: Right after meta info
- **Bottom of article**: After reading the full content

---

## 🎨 Customization

### Change Featured Image:
When creating/editing a post, add an image URL in the "Image à la une" field:
```
https://images.unsplash.com/photo-1234567890/digital-transformation.jpg
```

### Add Custom Tags:
In the Tags field, enter comma-separated tags:
```
Digital, Innovation, CRM, Formation
```

These tags will appear:
- On the post card (blog listing)
- At the top of the article
- As filters on the blog page

---

## 📊 Database Schema

The `blog_posts` table includes:

| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER | Auto-increment ID |
| title | VARCHAR(255) | Post title |
| slug | VARCHAR(255) | URL-friendly slug (unique) |
| excerpt | TEXT | Short summary |
| content | TEXT | Full HTML content |
| featured_image | VARCHAR(500) | Featured image URL |
| author_id | INTEGER | References users table |
| status | VARCHAR(20) | draft/published/archived |
| published_at | TIMESTAMP | Publication date |
| views | INTEGER | View count (auto-incremented) |
| tags | TEXT[] | Array of tags |
| meta_title | VARCHAR(255) | SEO title |
| meta_description | TEXT | SEO description |
| created_at | TIMESTAMP | Creation date |
| updated_at | TIMESTAMP | Last update (auto-updated) |

---

## 🔧 API Endpoints

### Public Endpoints:
- `GET /api/blog` - List all published posts
  - Query params: `status`, `limit`, `offset`
- `GET /api/blog/[slug]` - Get single post (increments views)

### Admin Endpoints (require authentication):
- `POST /api/blog` - Create new post
- `PUT /api/blog/[slug]` - Update post
- `DELETE /api/blog/[slug]` - Delete post

All admin endpoints require `Authorization: Bearer <token>` header.

---

## 💡 Tips & Best Practices

### 1. Writing Good Titles
- Keep under 60 characters for SEO
- Include keywords
- Make it compelling

### 2. Crafting Excerpts
- 150-160 characters
- Summarize the main point
- End with intrigue

### 3. Using Images
- Use high-quality images (1200x630px ideal)
- Compress images before uploading
- Use Unsplash or similar for free stock photos

### 4. SEO Optimization
- The meta title and description are auto-filled from title and excerpt
- Use relevant tags
- Create unique slugs

### 5. Content Structure
- Start with an introduction
- Use H2 for main sections
- Use H3 for subsections
- Keep paragraphs short (3-4 lines)
- Add bullet points or numbered lists
- Include images throughout

---

## 🎯 Example Workflow

### Creating Your First Blog Post:

1. **Plan Your Content**
   - Choose a topic relevant to your services
   - Research keywords
   - Outline main points

2. **Write the Content**
   - Open a text editor
   - Write in HTML format
   - Include headings, paragraphs, lists

3. **Create the Post**
   - Go to Admin > Blog
   - Click "Nouvel Article"
   - Fill in all fields
   - Save as "Brouillon" first

4. **Review & Edit**
   - Click the view icon to preview
   - Check formatting
   - Proofread content
   - Edit if needed

5. **Publish**
   - Edit the post
   - Change status to "Publié"
   - Save

6. **Share**
   - Visit the public blog page
   - Share on your social media using the buttons

---

## 🔍 Navigation

The blog is accessible from:

### Main Navigation:
- Added "Blog" link in the header navigation
- Appears between "À Propos" and "Notre Cabinet"

### Admin Sidebar:
- "Blog" menu item with 📄 icon
- Shows between "Clients" and "Statistiques"

---

## 📈 Statistics

The admin dashboard shows:
- **Total Articles**: All posts (any status)
- **Publiés**: Published posts only
- **Brouillons**: Draft posts
- **Vues Totales**: Sum of all post views

---

## 🆘 Troubleshooting

### Post not showing on blog page?
- Check status is "Publié" (not "Brouillon")
- Verify published_at date is set

### Share buttons not working?
- Check if you're on the live URL (not localhost for production)
- Ensure browser allows popups

### Can't edit posts?
- Verify you're logged in as admin
- Check authorization token is valid

### Slug already exists error?
- Each slug must be unique
- Modify the slug to make it unique

---

## 🎉 You're Ready!

Your blog system is fully functional. Start creating amazing content and share it with the world!

**Visit your blog:** http://localhost:3000/blog

**Manage posts:** http://localhost:3000/admin/blog

Happy blogging! 📝✨
