import * as ReadableAPI from '../utils/ReadableAPI'

export const ALL_CATEGORIES = 'ALL_CATEGORIES'

export function allCategories() {
  const allCategories = ReadableAPI.allCategories()
  return {
    type: ALL_CATEGORIES,
    payload: allCategories
  }
}
