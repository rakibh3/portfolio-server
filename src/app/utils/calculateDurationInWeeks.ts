export const calculateDurationInWeeks = (
  startDateStr: string,
  endDateStr: string,
): number => {
  const startDate = new Date(startDateStr)
  const endDate = new Date(endDateStr)

  const durationInMilliseconds = endDate.getTime() - startDate.getTime()
  const durationInWeeks = Math.ceil(
    durationInMilliseconds / (1000 * 60 * 60 * 24 * 7),
  )
  return durationInWeeks
}
