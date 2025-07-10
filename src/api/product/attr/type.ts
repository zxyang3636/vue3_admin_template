import { type ApiResponse } from '@/api/type'

export interface Category {
  id: string
  name: string
}

export interface Attribute {
  attributeKeysId?: string
  name: string
  value: string
}

export type CategoryResponse = ApiResponse<Category[]>

export type AttributeResponse = ApiResponse<Attribute[]>
