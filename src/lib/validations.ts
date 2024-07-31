import { z } from "zod";

export const wikiArticleIntroSchema = z.object({
  type: z.string(),
  title: z.string(),
  displaytitle: z.string(),
  namespace: z.object({ id: z.number(), text: z.string() }),
  wikibase_item: z.string(),
  titles: z.object({
    canonical: z.string(),
    normalized: z.string(),
    display: z.string(),
  }),
  pageid: z.number(),
  lang: z.string(),
  dir: z.string(),
  revision: z.string(),
  tid: z.string(),
  timestamp: z.string(),
  description: z.string(),
  description_source: z.string(),
  content_urls: z.object({
    desktop: z.object({
      page: z.string(),
      revisions: z.string(),
      edit: z.string(),
      talk: z.string(),
    }),
    mobile: z.object({
      page: z.string(),
      revisions: z.string(),
      edit: z.string(),
      talk: z.string(),
    }),
  }),
  extract: z.string(),
  extract_html: z.string(),
});

export const discogsReleaseSchema = z.object({
  pagination: z.object({
    page: z.number(),
    pages: z.number(),
    per_page: z.number(),
    items: z.number(),
    urls: z.object({ last: z.string(), next: z.string() }),
  }),
  results: z.array(
    z.object({
      country: z.string(),
      year: z.string(),
      format: z.array(z.string()),
      label: z.array(z.string()),
      type: z.string(),
      genre: z.array(z.string()),
      style: z.array(z.string()),
      id: z.number(),
      barcode: z.array(z.string()),
      master_id: z.number(),
      master_url: z.string(),
      uri: z.string(),
      catno: z.string(),
      title: z.string(),
      thumb: z.string(),
      cover_image: z.string(),
      resource_url: z.string(),
      community: z.object({ want: z.number(), have: z.number() }),
      format_quantity: z.number(),
      formats: z.array(
        z.object({
          name: z.string(),
          qty: z.string(),
          descriptions: z.array(z.string()),
        }),
      ),
    }),
  ),
});
