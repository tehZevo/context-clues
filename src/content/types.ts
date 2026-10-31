export interface Section {
  code: string;
  num: number;
  title: string;
  tagline: string;
  prose(): string;
  slides(): string[];
}
