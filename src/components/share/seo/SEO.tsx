// src/components/shared/SEO.tsx
import { Helmet } from "react-helmet-async";
import metaCoverImage from "@assets/metaCover.png";


interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

const SEO = ({
  title = "Asia Blue Sky Asia Sky Blue HAJJ, UMRAH & Tourp",
  description = "Experience a safe and spiritual Hajj & Umrah journey with Asia Blue Sky Travel and Tour. We provide trusted pilgrimage services with guided tours, comfortable accommodation, and complete support for pilgrims from Myanmar & Australia.",
  keywords = "Hajj Packages Myanmar, Umrah Packages Myanmar, Pilgrimage Tours, Makkah Tour, Madinah Tour, Muslim Travel Myanmar, Asia Blue Sky Travel, Makka Tour, Brisbane Hajj Packages, Yangon Umrah",
  image = metaCoverImage,
  url = "https://www.asiabluesky.com/",
}: SEOProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />


      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TravelAndTour",
          name: title,
          url,
          logo: image,
          description,
        })}
      </script>
      <link rel="canonical" href={url}></link>
    </Helmet>
  );
};

export default SEO;
