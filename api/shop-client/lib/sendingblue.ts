const SibApiV3Sdk = require('sib-api-v3-typescript')
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi()

// Configure API key authorization: api-key
const apiKey = apiInstance.authentications['apiKey']
apiKey.apiKey = process.env.SENDINBLUE_API_KEY

export const sendinblue = (sendSmtpEmail: any) => {
  apiInstance.sendTransacEmail(sendSmtpEmail).then(
    function (data: any) {
        console.log(data)
        return true
    },
    function (error: any) {
      console.error(error)
      return false
    }
  )
}
