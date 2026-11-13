import { createFileRoute } from "@tanstack/react-router";
import { getRouterInstance } from "@tanstack/react-start";
import { isSitemapRouteIncluded, sitemapPathForLocation, sitemapStaticPaths, sitemapXML, type SitemapEntry } from "@/lib/sitemap";
import { projects, services } from "@/lib/teamlex";

const BASE_URL = "https://studio-echo-testimonials.lovable.app";

export const Route = createFileRoute("/sitemap.xml")({
  staticData: { sitemap: false },
  server: {
    handlers: {
      GET: async () => {
        const router = await getRouterInstance();
        const entries: SitemapEntry[] = sitemapStaticPaths(router).map((path) => ({ path }));
        const dynamic = [
          { routeId: "/services/$slug", to: "/services/$slug", slugs: services.map((s) => s.slug) },
          { routeId: "/portfolio/$slug", to: "/portfolio/$slug", slugs: projects.map((p) => p.slug) },
        ] as const;
        for (const { routeId, to, slugs } of dynamic) {
          if (!isSitemapRouteIncluded(router.routesById[routeId])) continue;
          for (const slug of slugs) {
            const location = router.buildLocation({ to, params: { slug }, search: () => ({}), hash: "" });
            const path = sitemapPathForLocation(router, location, routeId);
            if (path) entries.push({ path });
          }
        }
        return new Response(sitemapXML(BASE_URL, entries), {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
