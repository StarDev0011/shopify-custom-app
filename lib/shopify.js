const domain = process.env.SHOPIFY_STORE_DOMAIN
const adminAccessToken = process.env.SHOPIFY_ADMIN_ACCESSTOKEN

async function ShopifyData(query) {
    const URL = `https://${domain}/admin/api/2022-01/graphql.json`
  
    const options = {
      endpoint: URL,
      method: "POST",
      headers: {
        "X-Shopify-Access-Token": adminAccessToken,
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query })
    }
  
    try {
      const data = await fetch(URL, options).then(response => {
        return response.json()
      })
  
      return data
    } catch (error) {
      throw new Error("customers not fetched")
    }
  }
  
  export async function getAllCustomers() {
    const query = `
    {
    customers(first: 5) {
      edges {
        node {
          id
          displayName
        }
      }
    }
  }
  `
  
    const response = await ShopifyData(query)
  
    const allcustomers = response.data.customers.edges ? response.data.customers.edges : []
  
    return allcustomers
  }