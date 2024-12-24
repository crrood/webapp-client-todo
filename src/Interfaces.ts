export interface Todo {
  _id?: {
    $oid: string
  }
  name: string
  done: string
  status: string
  urgency: string
  impact: string
  effort: string
  notes: string
}

export interface Column {
  field: string
  component: string
  required: boolean
  order: number
  options?: SelectOptions[]
}

export interface SelectOptions {
  name: string
  color: string
  priority: number
}