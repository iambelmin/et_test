import { OpenAIWrapper } from '../services/openai.js'

export const get = async (req, res) => {
  const { product, size } = req.query
  const data = await OpenAIWrapper.generateImage(product, size)
  return res.json(data)
}
