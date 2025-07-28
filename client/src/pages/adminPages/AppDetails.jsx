

function AppDetails() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">App Details</h1>
        <p className="text-gray-600">Details about the app are shown below.</p>
      </div>

      <div className="space-y-10">
        <div>
          <h1 className="text-3xl font-bold mb-4">Invendex — Business Management Made Effortless</h1>

          <h2 className="text-2xl font-semibold mb-2">Short Tagline</h2>
          <p className="text-gray-700">Run, Manage, and Grow Your Business — All in One Platform.</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">What is Invendex?</h2>
          <p className="text-gray-700">
            Invendex is a powerful all-in-one Business Management SaaS designed for modern entrepreneurs, retailers, and small businesses.
            We help you manage inventory, products, orders, sales, shipping, payments, and even in-store transactions (POS) — seamlessly from one beautiful dashboard.
            Whether you're selling online, offline, or both, Invendex gives you the tools to organize operations, boost sales, and grow smarter.
            Built to be simple. Powered for success.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Key Features</h2>

          <div className="space-y-6">
            {[
              { title: "Inventory Management", features: ["Add, organize, and track all your products in real-time", "Manage multiple stock locations with ease", "Get automatic low-stock alerts and out-of-stock notifications"] },
              { title: "Order Management", features: ["Process and update customer orders from a single dashboard", "Track order status (pending, shipped, delivered, canceled)", "Manage refunds, cancellations, and order history seamlessly"] },
              { title: "Product Management", features: ["Add unlimited products with detailed descriptions, images, and categories", "Manage pricing, stock variations (sizes, colors), and custom SKUs", "Group products into collections for easy browsing and upselling"] },
              { title: "Payment Processing (Powered by Paystack)", features: ["Accept fast and secure online payments through Paystack", "Supports multiple payment options: cards, bank transfers, USSD, mobile money", "Real-time payment tracking and settlement history"] },
              { title: "Shipping and Fulfillment", features: ["Integrate with local and international shipping partners", "Automate order fulfillment and create printable shipping labels", "Provide customers with real-time tracking information"] },
              { title: "Payouts and Earnings", features: ["Easily withdraw your earnings through your preferred Paystack-linked account", "View a detailed earnings history with breakdowns for each transaction", "Transparent fee structure and fast payouts"] },
              { title: "Point of Sale (POS)", features: ["Sell offline with a sleek POS system that syncs instantly with your online store", "Accept multiple payment methods: cash, cards, bank transfers", "Print receipts or send digital receipts via email or SMS"] },
              { title: "Sales Analytics and Reporting", features: ["View powerful reports on your sales, revenue, products, and customer behavior", "Track top-selling products, best customers, and sales trends", "Export reports for accounting or performance reviews"] },
              { title: "Customer Management", features: ["Build and manage customer profiles", "View purchase histories and customer interactions", "Launch loyalty programs and personalized offers"] },
              { title: "Multi-Channel Management", features: ["Sell across multiple storefronts and manage inventory centrally", "Future-ready integrations with eCommerce platforms coming soon"] },
              { title: "Mobile-Friendly", features: ["Fully responsive — manage your business from desktop, tablet, or mobile", "Native mobile apps coming soon"] },
            ].map((section, idx) => (
              <div key={idx}>
                <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {section.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Why Choose Invendex?</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>All-in-One Solution — Manage everything from inventory to sales without multiple apps</li>
            <li>Fast and Easy — Simple setup. No tech skills needed</li>
            <li>Secure Payments — Powered by Paystack</li>
            <li>Grow Smarter — Smarter business decisions with analytics</li>
            <li>Built for Modern Businesses — Works for fashion, electronics, groceries, services, and more</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Integrations</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Paystack (Payments)</li>
            <li>Shipping Partners (Local and International)</li>
            <li>SMS and Email Providers (Twilio, SendGrid coming soon)</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Screenshots / Product Preview</h2>
          <p className="text-gray-700">Insert screenshots of Dashboard, Inventory Management, POS Checkout, Sales Analytics</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Pricing Plans</h2>

          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left border">Plan</th>
                  <th className="px-4 py-2 text-left border">Features</th>
                  <th className="px-4 py-2 text-left border">Price</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="px-4 py-2 border">Starter</td>
                  <td className="px-4 py-2 border">Basic Inventory, Orders, Sales</td>
                  <td className="px-4 py-2 border">Free or Low</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2 border">Business</td>
                  <td className="px-4 py-2 border">Everything plus POS and Payouts</td>
                  <td className="px-4 py-2 border">Medium</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2 border">Enterprise</td>
                  <td className="px-4 py-2 border">Advanced Reporting, API Access</td>
                  <td className="px-4 py-2 border">High</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-gray-600 mt-2">Custom enterprise plans available on request.</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">How Payments Work</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Accept customer payments instantly online with Paystack</li>
            <li>Sales are automatically deposited into your Paystack Wallet</li>
            <li>Withdraw earnings easily to your connected bank account</li>
            <li>Transparent fees, real-time tracking, and daily settlements</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Start Today</h2>
          <p className="text-gray-700">Ready to simplify your business management?</p>
          <p className="text-gray-700">Start your free trial with Invendex and experience the future of running a business.</p>
          <div className="flex space-x-4 mt-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Create Account</button>
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition">Schedule Demo</button>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">Quick Summary Line</h2>
          <p className="text-gray-700">Invendex — The easiest way to manage your inventory, sales, orders, and payouts — all from one simple platform.</p>
        </div>
      </div>
    </div>
  );
}

export default AppDetails;
