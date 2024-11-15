export default eventHandler(async (event) => {
  const name = getRouterParam(event, 'name')
  const image = await useStorage('fs').getItemRaw(`/images/students/${name}`)
  return image
})