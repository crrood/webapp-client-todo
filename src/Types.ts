export interface Todo {
  _id?: {
    $oid: string
  }
  data: {
    name: string
    done: string
    status: string
    urgency: string
    impact: string
    effort: string
    notes: string
    snoozeUntil: string
  }
}

export interface Column {
  field: keyof Todo["data"]
  component: string
  required: boolean
  order: number
  width: string
  options?: SelectOptions[]
}

export interface SelectOptions {
  name: string
  color: string
  priority: number
}

export interface ServerResponse {
  success: boolean
  message: string
  id?: string
  updatedExisting?: boolean
}