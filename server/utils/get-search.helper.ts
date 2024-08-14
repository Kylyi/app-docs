export function getSearch(
  search?: string,
  searchFields: string[] = [],
  alreadyAdjusted = true,
) {
  return { q: search, fields: searchFields, alreadyAdjusted }
}
