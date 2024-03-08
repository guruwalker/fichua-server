const credentials = {
  apiKey: process.env.AT_SANDBOX_API_KEY,
  username: process.env.AT_SANDBOX_USERNAME,
}

import Africastalking from 'africastalking'

const AfricastalkingClient = Africastalking(credentials)

const sms = AfricastalkingClient.SMS
const voice = AfricastalkingClient.VOICE

export default {
  sms,
  voice,
}
