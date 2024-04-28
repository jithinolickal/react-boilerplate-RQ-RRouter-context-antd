export interface TRoute {
  path: string
  element?: React.ReactNode
  name?: string
  children?: TRoute[]
  fullPath?: string
}
