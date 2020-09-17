import Amplify, { Auth } from 'aws-amplify'
import awsconfig from '@/aws-exports'

Amplify.configure(awsconfig)

export default {
  login(username, password) {
    return Auth.signIn(username, password)
  },
  logout() {
    return Auth.signOut()
  },
}
