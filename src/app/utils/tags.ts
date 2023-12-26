export interface ITag {
  name: string
  isDeleted: boolean
}

export interface IUpdateRequest {
  tags: ITag[]
}

export const updateTags = (
  initialTags: ITag[],
  updateRequest: IUpdateRequest,
): ITag[] => {
  updateRequest.tags.forEach((updateTag) => {
    const existingTagIndex = initialTags.findIndex(
      (tag) => tag.name === updateTag.name,
    )

    if (existingTagIndex !== -1) {
      if (updateTag.isDeleted) {
        initialTags.splice(existingTagIndex, 1)
      } else {
        initialTags[existingTagIndex] = updateTag
      }
    } else if (!updateTag.isDeleted) {
      initialTags.push(updateTag)
    }
  })

  return initialTags
}
