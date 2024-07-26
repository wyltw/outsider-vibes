export type WikiArticleIntroApiResponse = {
  type: string;
  title: string;
  displaytitle: string;
  namespace: Namespace;
  wikibase_item: string;
  titles: Titles;
  pageid: number;
  lang: string;
  dir: string;
  revision: string;
  tid: string;
  timestamp: string;
  description: string;
  description_source: string;
  content_urls: ContentUrls;
  extract: string;
  extract_html: string;
};

export type Namespace = {
  id: number;
  text: string;
};

export type Titles = {
  canonical: string;
  normalized: string;
  display: string;
};

export type ContentUrls = {
  desktop: Desktop;
  mobile: Mobile;
};

export type Desktop = {
  page: string;
  revisions: string;
  edit: string;
  talk: string;
};

export type Mobile = {
  page: string;
  revisions: string;
  edit: string;
  talk: string;
};
