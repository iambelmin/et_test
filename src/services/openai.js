import { OpenAIApi, Configuration } from 'openai'
import dotenv from 'dotenv'
dotenv.config()

const { OPENAI_SECRET } = process.env

class OpenAIClass {
  constructor(secret) {
    const openAiConfig = new Configuration({
      apiKey: secret,
    })

    this.openai = new OpenAIApi(openAiConfig)
  }

  static getInstance(secret) {
    if (!this.instance) this.instance = new OpenAIClass(OPENAI_SECRET)

    return this.instance
  }

  async generateImage(product, size = '256x256') {
    if (!this.isSizeValid(size)) throw new Error('Bad size provided, please use 256x256, 512x512 or 1024x1024')

    let prompt = `Generate a photorealistic image of the ${product} product. `
    prompt += 'The background should be solid and in contrast with the product itself. '
    prompt += 'Product should be displayed fully.'

    const { data: images } = await this.openai.createImage({
      prompt,
      size,
      n: 1,
    })

    return { url: images.data[0].url, size }
  }

  isSizeValid(size) {
    if (size == '256x256' || size == '512x512' || size == '1024x1024') return true

    return false
  }
}

export const OpenAIWrapper = OpenAIClass.getInstance(OPENAI_SECRET)
