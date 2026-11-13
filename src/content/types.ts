export interface Section {
  code: string;
  num: number;
  title: string;
  titleHtml?: string;
  tagline: string;
  prose(): string;
}
