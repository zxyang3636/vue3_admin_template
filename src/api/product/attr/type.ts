import { type ApiResponse } from '@/api/type'

export interface Category {
  id: string
  name: string
}

export interface Attribute {
  attributeKeysId?: string
  name: string
  value: string[]
  thirdLevelId?: string
  flag?: boolean[]
}

export interface AttributeInsert {
  name: string
  value: string[]
  thirdLevelId?: string
}

export type CategoryResponse = ApiResponse<Category[]>

export type AttributeResponse = ApiResponse<Attribute[]>
