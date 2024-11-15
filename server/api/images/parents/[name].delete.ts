export default eventHandler(async (event) => {
  const baseUrl = useRuntimeConfig(event).baseUrl

  const name = getRouterParam(event, 'name')
  const imagePath = `/images/parents/${name}`
  const imageUrl = `${baseUrl}/api${imagePath}`

  await useStorage('fs').removeItem(`/images/parents/${name}`)

  return {
    message: 'Deleted',
    imageUrl,
    imagePath,
  }
})
