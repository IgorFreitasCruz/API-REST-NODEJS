import { app } from './app'
import { env } from './env'

app.listen({ port: env.PORT }, function (err, address) {
  if (err) {
    app.log.error(err)
  }
  console.log('Listening on port 3333')
})
