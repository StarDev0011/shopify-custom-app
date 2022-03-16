// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  async function ShopifyData(query) {
    const URL = `https://cac-prototype.myshopify.com/admin/api/2022-01/graphql.json`
    const options = {
      endpoint: URL,
      method: "POST",
      headers: {
        "X-Shopify-Access-Token": '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',
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
        console.log("err",error)
    }
  }

  async function getAllCustomers() {
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
    console.log("All",allcustomers)
    res.status(200).json({allcustomers})
    return allcustomers
  }
  const users = getAllCustomers()
  console.log("users", users)
}
