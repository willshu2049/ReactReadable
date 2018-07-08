import * as ReadableAPI from '../utils/ReadableAPI'

import {
  ALL_CATEGORIES
} from './types'

export function allCategories() {
  const allCategories = ReadableAPI.allCategories()
  return {
    type: ALL_CATEGORIES,
    payload: allCategories
  }
}
