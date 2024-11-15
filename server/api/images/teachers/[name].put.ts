import { Buffer } from 'node:buffer'

export default eventHandler(async (event) => {
  // mengambil key nama filenya
  const name = getRouterParam(event, 'name')

  // mengambil imagenya dari formdata
  const formData = await readFormData(event)
  const image = formData.get('image') as File

  const arrayBuffer = await image.arrayBuffer()

  const oldImageExt = name.split('.')[1]
  const newImageExt = image.type.split('/')[1]

  const baseUrl = useRuntimeConfig(event).baseUrl

  if (oldImageExt !== newImageExt) {
    const newImageName = `${name.split('.')[0]}.${newImageExt}`
    const imagePath = `/images/teachers/${newImageName}`
    const imageUrl = `${baseUrl}/api${imagePath}`

    // remove old image
    await useStorage('fs').removeItem(`/images/teachers/${name}`)
    // menyimpan buffer image ke storage
    await useStorage('fs').setItemRaw(imagePath, Buffer.from(arrayBuffer))

    return {
      message: 'Updated',
      imageUrl,
      imagePath,
    }
  }

  // menyimpan buffer image ke storage
  await useStorage('fs').setItemRaw(`/images/teachers/${name}`, Buffer.from(arrayBuffer))

  const imagePath = `/images/teachers/${name}`
  const imageUrl = `${baseUrl}/api${imagePath}`

  return {
    message: 'Updated',
    imageUrl,
    imagePath,
  }
})
