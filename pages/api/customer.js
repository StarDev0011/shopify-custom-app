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
            customer(id: "gid://shopify/Customer/1753015910478") {
              id
              tags
              displayName
              ordersCount
            }
          }
          `

            const response = await ShopifyData(query)
            const allcustomers = response.data.customer ? response.data.customer : []
            console.log("All", allcustomers)
            res.status(200).json({ allcustomers })
            return allcustomers
        }
        const user = getCustomerData()
        console.log("users", user)
    }
    else {
        res.status(200).send("Get")
    }
}