// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  const domain = process.env.SHOPIFY_STORE_DOMAIN
  const adminAccessToken = process.env.SHOPIFY_ADMIN_ACCESSTOKEN

  const URL = `https://cac-prototype.myshopify.com/admin/api/2022-01/graphql.json`

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

    fetch(URL, options).then(response => {
      // return response.json()
      console.log(response)
      res.status(200).send(response)
    })
    
}
