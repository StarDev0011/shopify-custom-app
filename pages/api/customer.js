export default function handler(req, res) {
    if (req.method === 'POST') {
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
                console.log("err", error)
            }
        }
        async function getCustomerData() {
            const query = `
            {
            customer(id: "${req.body.id}") {
              id
              tags
              displayName
              ordersCount
              orders(first: 10) {
                  edges {
                      node {
                          lineItems(first: 2) {
                              edges {
                                  node {
                                      product {
                                          title
                                          tags
                                      }
                                      quantity
                                  }
                              }
                          }
                      }
                  }
              }
            }
          }
          `

            const response = await ShopifyData(query)
            const current_customer = response.data.customer ? response.data.customer : []            
            if(current_customer.tags.includes("Member")){
                var customer_total_orders = current_customer.orders.edges;
                customer_total_orders.forEach(element => {
                    console.log(element.node.lineItems.edges)
                });
            }
            res.status(200).json({ current_customer })
            return current_customer
        }
        const user = getCustomerData()
        console.log("users", user)
    }
    else {
        res.status(200).send("Get")
    }
}