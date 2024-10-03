import logger from './utils/logger.js'
import config from './utils/config.js'
import app from './app.js'

app.listen(config.PORT, () => {
  logger.info(`server is running on ${config.PORT}`)
})
