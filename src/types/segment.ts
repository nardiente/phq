export interface Segment {
  id: string;
  name: string;
  filters: { [key: string]: any };
  selectedAttributes?: { [key: string]: boolean };
}
