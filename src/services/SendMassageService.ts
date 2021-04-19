import { szAPI } from '../api/szchat'

interface IRequest {
  message: string
  name: string
  number: string
}

class SendMassageService {
  async execute({ message, name, number }:IRequest) {
    try {
      await szAPI.post('/generic/messages/send', {
        contacts: [
          {
            profile: {
              name: name,
              photo: 'https://github.com/pedroksty.png'
            },
            platform_id: number
          }
        ],
        messages: [
          {
            from: '6548732154',
            id: 'ABGGFlA5FpafAgo6tHcNmNjXmuSf',
            timestamp: '1518694235',
            text: {
              body: message
            },
            type: 'text'
          }
        ]
      }, {
        headers: {
          'Content-Type': 'application/json',
          'API-KEY': '549c030520da3acf71b3078449695e1d157e50f6'
        }
      })
    } catch (err) {
      console.log(err)
    }
  }
}

export { SendMassageService }
