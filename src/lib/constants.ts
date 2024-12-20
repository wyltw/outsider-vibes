import { RouteItem } from "./types";

export const DISCOGS_API = "https://api.discogs.com";
export const DEFAULT_PAGE = 1;
export const DEFAULT_PERPAGE = 10;
export const DISCOGS_PAGES_LIMIT = 1000;
export const MAX_SAVED_ITEMS = 5;

export const headerRoutes: RouteItem[] = [
  {
    name: "首頁",
    path: "/home",
    variant: "ghost",
  },
];

export const footerRoutes: RouteItem[] = [
  {
    name: "Home",
    path: "/home",
  },
  {
    name: "Privacy policy",
    path: "/",
  },
  {
    name: "Terms & conditions",
    path: "/",
  },
];

export const featuredGenres: RouteItem[] = [
  {
    name: "Happy hardcore",
    path: "/genres/Happy hardcore",
    variant: "ghost",
  },
  {
    name: "Progressive metalcore",
    path: "/genres/Progressive metalcore",
    variant: "ghost",
  },
  {
    name: "Big beat",
    path: "/genres/Big beat",
    variant: "ghost",
  },
  {
    name: "Broken beat",
    path: "/genres/Broken beat",
    variant: "ghost",
  },
  {
    name: "Disco",
    path: "/genres/Disco",
    variant: "ghost",
  },
];

export const searchTabs: RouteItem[] = [
  {
    name: "專輯",
    path: "?type=release",
    variant: "ghost",
  },
  {
    name: "藝人",
    path: "?type=artist",
    variant: "ghost",
  },
];
