/* eslint-disable @typescript-eslint/no-explicit-any */
export const filterByUtils = (query: any) => {
  const filter: Record<string, any> = {}

  const startDate = query.startDate
    ? new Date(query.startDate as string)
    : undefined
  const endDate = query.endDate ? new Date(query.endDate as string) : undefined
  const language = query.language as string
  const provider = query.provider as string
  const durationInWeeks = parseInt(query.durationInWeeks as string)
  const level = query.level as string

  if (query.minPrice) {
    filter.price = {
      ...filter.price,
      $gte: parseFloat(query.minPrice as string),
    }
  }

  if (query.maxPrice) {
    filter.price = {
      ...filter.price,
      $lte: parseFloat(query.maxPrice as string),
    }
  }

  if (endDate) {
    filter.endDate = {
      $lte: endDate.toISOString().slice(0, 10),
    }
  }

  if (startDate) {
    filter.startDate = {
      $gte: startDate.toISOString().slice(0, 10),
    }
  }

  if (language) {
    const lowercaseLanguage = language.toLowerCase()
    filter.language = lowercaseLanguage
  }

  if (provider) {
    const lowercaseProvider = provider.toLowerCase()
    filter.provider = lowercaseProvider
  }

  if (durationInWeeks) {
    filter.durationInWeeks = durationInWeeks
  }

  if (query.tags) {
    const lowercaseTags = query.tags.toLowerCase()
    filter.tags = {
      $elemMatch: {
        name: lowercaseTags,
      },
    }
  }

  if (level) {
    const lowercaseLevel = level.toLowerCase()
    filter['details.level'] = lowercaseLevel
  }

  return filter
}
