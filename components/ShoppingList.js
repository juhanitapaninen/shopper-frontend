import {graphql} from 'react-apollo'
import gql from 'graphql-tag'

const POSTS_PER_PAGE = 10

function ShoppingList({data: {loading,error,items}}) {
  if (error) 
    return <div>Error loading items.</div>
    if (items && items.length) {
    return (
      <section>
        <ul>
          {items.map(item =>
            <li key={item.id}>
              <div>{item.name}</div>
            </li>
          )}
        </ul>
      </section>
    )
  }
  return <div>Loading</div>
}

const items = gql `
  {
    items {
      id,
      name
    }
  }
`;

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (PostList)
export default graphql(items)(ShoppingList);
