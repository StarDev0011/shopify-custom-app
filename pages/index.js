import { getAllCustomers } from "../lib/shopify"

export default function Home({ customers }) {

  console.log(customers)

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-6">
          customers
        </h2>
        
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const customers = await getAllCustomers()

  return {
    props: { customers }, // will be passed to the page component as props
  }
}