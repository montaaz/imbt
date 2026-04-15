-- Migration: Add Blog System
-- Description: Creates blog_posts table for managing blog content

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image VARCHAR(500),
  author_id INTEGER REFERENCES users(id),
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_at TIMESTAMP,
  views INTEGER DEFAULT 0,
  tags TEXT[],
  meta_title VARCHAR(255),
  meta_description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_author_id ON blog_posts(author_id);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_blog_posts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_update_blog_posts_updated_at ON blog_posts;
CREATE TRIGGER trigger_update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_blog_posts_updated_at();

-- Insert sample blog posts (optional)
INSERT INTO blog_posts (title, slug, excerpt, content, author_id, status, published_at, tags, meta_title, meta_description)
VALUES
  (
    'Les 5 tendances de la transformation digitale en 2025',
    'tendances-transformation-digitale-2025',
    'Découvrez les principales tendances qui vont façonner la transformation digitale des entreprises en 2025.',
    E'<h2>Introduction</h2>\n<p>La transformation digitale continue d''évoluer rapidement. Voici les 5 tendances majeures pour 2025.</p>\n\n<h3>1. Intelligence Artificielle Générative</h3>\n<p>L''IA générative révolutionne la création de contenu et l''automatisation des processus.</p>\n\n<h3>2. Cloud Hybride</h3>\n<p>Les entreprises adoptent des architectures cloud hybrides pour plus de flexibilité.</p>\n\n<h3>3. Cybersécurité Avancée</h3>\n<p>La sécurité devient une priorité absolue avec l''augmentation des cyberattaques.</p>\n\n<h3>4. Automatisation Intelligente</h3>\n<p>L''automatisation des workflows permet de gagner en productivité.</p>\n\n<h3>5. Expérience Client Personnalisée</h3>\n<p>Les données permettent de créer des expériences ultra-personnalisées.</p>',
    1,
    'published',
    CURRENT_TIMESTAMP - INTERVAL '2 days',
    ARRAY['Transformation Digitale', 'Tendances', 'IA'],
    'Les 5 tendances de la transformation digitale en 2025 | IMBT Consulting',
    'Découvrez les principales tendances qui vont façonner la transformation digitale des entreprises en 2025.'
  ),
  (
    'Comment choisir le bon CRM pour votre entreprise',
    'choisir-crm-entreprise',
    'Guide complet pour sélectionner le CRM qui correspond le mieux aux besoins de votre entreprise.',
    E'<h2>Pourquoi un CRM est essentiel</h2>\n<p>Un CRM (Customer Relationship Management) est crucial pour gérer vos relations clients efficacement.</p>\n\n<h3>Critères de sélection</h3>\n<ul>\n<li>Budget disponible</li>\n<li>Nombre d''utilisateurs</li>\n<li>Fonctionnalités nécessaires</li>\n<li>Intégrations requises</li>\n<li>Facilité d''utilisation</li>\n</ul>\n\n<h3>Les meilleurs CRM du marché</h3>\n<p>Salesforce, HubSpot, Microsoft Dynamics, et Zoho sont parmi les leaders du marché.</p>',
    1,
    'published',
    CURRENT_TIMESTAMP - INTERVAL '5 days',
    ARRAY['CRM', 'Gestion Client', 'Outils'],
    'Comment choisir le bon CRM pour votre entreprise | IMBT Consulting',
    'Guide complet pour sélectionner le CRM qui correspond le mieux aux besoins de votre entreprise.'
  ),
  (
    'L''importance de la formation digitale en entreprise',
    'importance-formation-digitale',
    'Pourquoi investir dans la formation digitale de vos équipes est crucial pour la réussite de votre transformation.',
    E'<h2>La formation, clé de la transformation</h2>\n<p>Sans formation adéquate, même les meilleurs outils digitaux ne seront pas utilisés efficacement.</p>\n\n<h3>Bénéfices de la formation digitale</h3>\n<ol>\n<li>Meilleure adoption des outils</li>\n<li>Productivité accrue</li>\n<li>Réduction des erreurs</li>\n<li>Innovation facilitée</li>\n</ol>\n\n<h3>Comment mettre en place un programme de formation</h3>\n<p>Identifiez les besoins, choisissez les formats adaptés (présentiel, e-learning, blended), et mesurez les résultats.</p>',
    1,
    'published',
    CURRENT_TIMESTAMP - INTERVAL '7 days',
    ARRAY['Formation', 'Digital', 'RH'],
    'L''importance de la formation digitale en entreprise | IMBT Consulting',
    'Pourquoi investir dans la formation digitale de vos équipes est crucial pour la réussite de votre transformation.'
  )
ON CONFLICT (slug) DO NOTHING;

-- Success message
DO $$
BEGIN
  RAISE NOTICE 'Blog system migration completed successfully!';
END $$;
