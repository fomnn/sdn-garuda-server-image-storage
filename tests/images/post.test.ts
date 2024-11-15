import fs from 'node:fs'
import path from 'node:path'
import { $fetchRaw } from 'nitro-test-utils/e2e'
import { describe, expect, it } from 'vitest'

let createdImagePath: string

describe('test posts images', () => {
  it('should upload an image', async () => {
    const fileName = '2.jpeg'
    const mimeType = `image/${fileName.split('.').pop()}`
    const imagePath = path.join(__dirname, './test-assets/', fileName)
    const imageBuffer = fs.readFileSync(imagePath)

    const blob = new Blob([imageBuffer], { type: mimeType })

    const imageFile = new File([blob], fileName, { type: mimeType })

    const formData = new FormData()
    formData.set('image', imageFile)

    const { data, status } = await $fetchRaw('/api/images/posts/upload', {
      method: 'POST',
      body: formData,
    })

    expect(status).toBe(200)
    expect(data).toHaveProperty('message')
    expect(data).toHaveProperty('imageUrl')
    expect(data).toHaveProperty('imagePath')
    createdImagePath = data.imagePath
  })

  it('should return an image', async () => {
    const { status } = await $fetchRaw(`/api${createdImagePath}`)
    expect(status).toBe(200)
  })

  it('should update an image and return some data', async () => {
    const fileName = '3.jpg'
    const mimeType = `image/${fileName.split('.').pop()}`
    const imagePath = path.join(__dirname, './test-assets/', fileName)
    const imageBuffer = fs.readFileSync(imagePath)

    const blob = new Blob([imageBuffer], { type: mimeType })

    const imageFile = new File([blob], fileName, { type: mimeType })

    const formData = new FormData()
    formData.set('image', imageFile)

    const { data, status } = await $fetchRaw(`/api${createdImagePath}`, {
      method: 'PUT',
      body: formData,
    })
    expect(status).toBe(200)
    expect(data).toHaveProperty('message','Updated')
    expect(data).toHaveProperty('imagePath')
    expect(data).toHaveProperty('imageUrl')
    createdImagePath = data.imagePath
  })

  it('should delete an image and return some data', async () => {
    const { data, status } = await $fetchRaw(`/api${createdImagePath}`, {
      method: 'DELETE',
    })
    expect(status).toBe(200)
    expect(data).toHaveProperty('message','Deleted')
    expect(data).toHaveProperty('imagePath')
    expect(data).toHaveProperty('imageUrl')
  })
})
