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
