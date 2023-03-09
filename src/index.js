import express from 'express'
import dotenv from 'dotenv'
import { routes } from './routes/index.js'

dotenv.config()
const app = express()

const handleAsyncError = (handler) => {
  return async (req, res, next) => {
    try {
      await handler(req, res)
    } catch (error) {
      console.error(`[ERROR] ${error.message}`)
      next(error)
    }
  }
}

for (const [routeName, routeController] of Object.entries(routes)) {
  if (routeController.get) {
    app.get(`/${routeName}`, handleAsyncError(routeController.get))
  }
}

app.use((error, _req, res, _next) => {
  res.status(500).send(`[ERROR] ${error.message}`)
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})
