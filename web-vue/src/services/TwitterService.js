import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  gql,
} from '@apollo/client/core'

const graphQlUrl = process.env.VUE_APP_GRAPHQL_URL

// not to happy to load the user info through local storage, but I could not figure out how to access the store
const httpLink = new HttpLink({ uri: graphQlUrl })
const authLink = new ApolloLink((operation, forward) => {
  const user = JSON.parse(localStorage.getItem('user'))
  const token = user ? user.jwtToken : null
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : '',
    },
  })
  return forward(operation)
})
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})
export default {
  getUsers(description) {
    return client.query({
      query: gql`
        query GetUser($desc: String!, $first: Int) {
          GetUser(first: $first, filter: { description_contains: $desc }) {
            name
            screenName
            description
            top10Hashtags
            profileImageURL
            tweets(first: 10, orderBy: retweetCount_desc) {
              text
              retweetCount
            }
          }
        }
      `,
      variables: {
        desc: description,
        first: 10,
      },
    })
  },
}
