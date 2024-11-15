export default eventHandler(async (event) => {
  const baseUrl = useRuntimeConfig(event).baseUrl

  const name = getRouterParam(event, 'name')
  const imagePath = `/images/parents/${name}`
  const imageUrl = `${baseUrl}/api${imagePath}`

  await useStorage('fs').removeItem(`/images/teachers/${name}`)

  return {
    message: 'Deleted',
    imagePath,
    imageUrl
  }
})
