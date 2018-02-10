export interface GiphyRequest {
  query: string;
  limit: number;
  offset: number;
}

export interface GiphyResponse {
  data?: (GiphyImage)[] | null;
  pagination: Pagination;
  meta: Meta;
}

export interface GiphyImage {
  type: string;
  id: string;
  slug: string;
  url: string;
  bitly_gif_url: string;
  bitly_url: string;
  embed_url: string;
  username: string;
  source: string;
  rating: string;
  content_url: string;
  source_tld: string;
  source_post_url: string;
  is_indexable: number;
  is_sticker: number;
  import_datetime: string;
  trending_datetime: string;
  images: Images;
  title: string;
}

export interface Images {
  downsized: DownSized;
}

export interface DownSized {
  url: string;
  width: string;
  height: string;
  size: string;
}

export interface Pagination {
  total_count: number;
  count: number;
  offset: number;
}

export interface Meta {
  status: number;
  msg: string;
  response_id: string;
}
