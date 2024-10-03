import { Timestamp } from "firebase/firestore";
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

export const discogsReleasesSchema = z.object({
  pagination: z.object({
    page: z.number(),
    pages: z.number(),
    per_page: z.number(),
    items: z.number(),
    urls: z.object({
      first: z.string().optional(),
      last: z.string().optional(),
      prev: z.string().optional(),
      next: z.string().optional(),
    }),
  }),
  results: z.array(
    z.object({
      country: z.string(),
      year: z.string().optional(),
      format: z.array(z.string()),
      label: z.array(z.string()),
      type: z.string(),
      genre: z.array(z.string()),
      style: z.array(z.string()),
      id: z.number(),
      barcode: z.array(z.string()),
      master_id: z.number(),
      master_url: z.string().nullable(),
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
          descriptions: z.array(z.string()).optional(),
        }),
      ),
    }),
  ),
});

export const discogsReleaseSchema = z.object({
  id: z.number(),
  title: z.string(),
  thumb: z.string().optional(),
});

export const discogsArtistSchema = z.object({
  id: z.number(),
  name: z.string(),
  images: z
    .array(
      z.object({
        uri: z.string(),
      }),
    )
    .optional(),
});

export const discogsArtistsSchema = z.object({
  pagination: z.object({
    page: z.number(),
    pages: z.number(),
    per_page: z.number(),
    items: z.number(),
    urls: z.object({
      first: z.string().optional(),
      last: z.string().optional(),
      prev: z.string().optional(),
      next: z.string().optional(),
    }),
  }),
  results: z.array(
    z.object({
      id: z.number(),
      type: z.string(),
      master_id: z.null(),
      master_url: z.null(),
      uri: z.string(),
      title: z.string(),
      thumb: z.string(),
      cover_image: z.string(),
      resource_url: z.string(),
    }),
  ),
});

export const userReleaseSchema = z.object({
  id: z.string(),
  releaseId: z.string(),
  userId: z.string(),
  addedAt: z.instanceof(Timestamp),
});

export const userReleaseArraySchema = z.array(userReleaseSchema);

export const userArtistSchema = z.object({
  id: z.string(),
  artistId: z.string(),
  userId: z.string(),
  addedAt: z.instanceof(Timestamp),
  //從firebase取得資料,getDocs會將Timestamp轉換成Timestamp實例
});

export const userArtistArraySchema = z.array(userArtistSchema);

export const collectionResponseSchema = z.object({
  type: z.enum(["release", "artist"]),
  itemId: z.string(),
});
