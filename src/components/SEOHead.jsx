import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEOHead({ title, description, keywords, canonical, type = 'website', schema }) {
  const base = 'https://poolcalculator.electropool.online';
  const fullUrl = `${base}${canonical || ''}`;
  const ogImage = `${base}/og-image.png`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph */}
      <meta property="og:site_name" content="PoolCalculator" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD Schema */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
      
      {!schema && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "PoolCalculator",
            "url": base,
            "description": "Professional electronics calculators and tools.",
            "applicationCategory": "EducationalApplication",
            "operatingSystem": "All"
          })}
        </script>
      )}
    </Helmet>
  );
}
