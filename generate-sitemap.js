import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import axios from "axios"; // ✅ uncommented for dynamic data

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = process.env.VITE_SITE_DOMAIN || "https://www.asiaskyblue.com";
const API_BASE_URL = process.env.VITE_API_URL;

// Helper function to generate a <url> entry
const generateUrlEntry = (loc, changefreq = "weekly", priority = "0.8") => `
  <url>
    <loc>${loc}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>
`;

// Fetch helper for dynamic data
const fetchDynamicData = async (endpoint) => {
  try {
    const { data } = await axios.get(endpoint);
    return data;
  } catch (error) {
    console.error(`❌ Error fetching ${endpoint}:`, error.message);
    return [];
  }
};

const generateSitemap = async () => {
  console.log("🔄 Generating sitemap...");

  // --- Static routes (public only, no /dashboard, /login, etc.)
  const staticRoutes = [
    { path: "/", changefreq: "daily", priority: "1.0" },
    { path: "/about", changefreq: "yearly", priority: "0.7" },
    { path: "/blogs", changefreq: "weekly", priority: "0.8" },
    { path: "/packages", changefreq: "weekly", priority: "0.8" },
  ];

  // --- Fetch dynamic data for detail pages
  const blogs = await fetchDynamicData(`${API_BASE_URL}/api/blogs`);
  const packages = await fetchDynamicData(`${API_BASE_URL}/api/packages`);

  // --- Start XML
  let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  sitemapContent += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // --- Add static routes
  staticRoutes.forEach(({ path, changefreq, priority }) => {
    sitemapContent += generateUrlEntry(
      `${BASE_URL}${path}`,
      changefreq,
      priority
    );
  });

  // --- Add blogs (/blogs/:slug)
  if (Array.isArray(blogs)) {
    blogs.forEach((b) => {
      if (b.slug) {
        sitemapContent += generateUrlEntry(
          `${BASE_URL}/blogs/${b.slug}`,
          "weekly",
          "0.8"
        );
      }
    });
  }

  // --- Add packages (/packages/:id)
  if (Array.isArray(packages)) {
    packages.forEach((pkg) => {
      if (pkg.id) {
        sitemapContent += generateUrlEntry(
          `${BASE_URL}/packages/${pkg.id}`,
          "weekly",
          "0.8"
        );
      }
    });
  }

  sitemapContent += "</urlset>";

  // --- Save to public folder
  const sitemapPath = path.join(__dirname, "public", "sitemap.xml");
  fs.mkdirSync(path.dirname(sitemapPath), { recursive: true });
  fs.writeFileSync(sitemapPath, sitemapContent, "utf8");

  console.log("✅ Sitemap generated successfully:", sitemapPath);
};

generateSitemap();
