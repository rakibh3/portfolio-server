const allowedSortFields = [
  'title',
  'price',
  'startDate',
  'endDate',
  'language',
  'durationInWeeks',
]

export const sortByUtils = (sortBy: string) => {
  return allowedSortFields.includes(sortBy) ? sortBy : 'title'
}

export const sortOrderUtils = (sortOrder: string) => {
  return sortOrder?.toLowerCase() === 'desc' ? -1 : 1
}
