export interface INews {
  id?: string
  title: string
  image: string
  month: string
  content: string
  date: Date
  source: string
}

export interface IListNews {
  items: Array<INews>
  onEditButton: Function
}