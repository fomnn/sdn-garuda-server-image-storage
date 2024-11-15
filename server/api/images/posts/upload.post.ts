import { Buffer } from 'node:buffer'
import { randomUUID } from 'node:crypto'

export default eventHandler(async (event) => {
  // Mengambil data dari formdata
  const formData = await readFormData(event)
  const image = formData.get('image') as File

  // mengubah file image ke arrayBuffer
  const arrayBuffer = await image.arrayBuffer()

  const imageExt = image.type.split('/')[1]
  const imageName = `${randomUUID()}.${imageExt}`
  const imagePath = `/images/posts/${imageName}`

  const baseUrl = useRuntimeConfig(event).baseUrl
  const imageUrl = `${baseUrl}/api${imagePath}`

  // menyimpan buffer image ke storage
  await useStorage('fs').setItemRaw(imagePath, Buffer.from(arrayBuffer))

  return {
    message: 'Uploaded',
    imageUrl,
    imagePath,
  }
})
