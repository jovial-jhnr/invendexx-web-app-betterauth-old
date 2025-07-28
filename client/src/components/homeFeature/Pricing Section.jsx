import { Link } from "react-router-dom";

function PricingSect() {
  return (
    <>
      <div className="text-center mt-6">
        <h1 className="font-semibold font-mono text-3xl text-gray-900">Choose Your Plan</h1>
        <p className="text-gray-600 mt-2">Flexible pricing for businesses of all sizes.</p>
      </div>

      <div className="flex flex-col md:flex-row flex-wrap justify-center mt-8">
        
        {/* Starter Plan */}
        <div className="mt-5 mx-4">
          <div className="flex flex-col border-2 border-blue-600 text-gray-700 items-center rounded-lg bg-white p-10 shadow-md">
            <h2 className="font-bold text-xl text-center text-gray-900">Starter</h2>
            <h3 className="font-medium text-2xl text-blue-600">₵200/month</h3>
            <ul className="text-left mt-4 space-y-2">
              <li>✅ 1 Store Location</li>
              <li>✅ 100 Products</li>
              <li>✅ Basic Sales Reports</li>
              <li>✅ 24/7 Support</li>
            </ul>
            <Link 
              to="https://paystack.com/pay/base-pack" 
              className="mt-6 bg-blue-600 text-white hover:bg-blue-500 px-4 py-2 rounded-md"
            >
              PURCHASE NOW
            </Link>
          </div>
        </div>

        {/* Business Plan */}
        <div className="mt-5 mx-4">
          <div className="flex flex-col border-2 border-blue-600 text-gray-700 items-center rounded-lg bg-white p-10 shadow-md">
            <h2 className="font-bold text-xl text-center text-gray-900">Business</h2>
            <h3 className="font-medium text-2xl text-blue-600">₵500/month</h3>
            <ul className="text-left mt-4 space-y-2">
              <li>✅ 5 Store Locations</li>
              <li>✅ 1,000 Products</li>
              <li>✅ Advanced Analytics</li>
              <li>✅ Employee Management</li>
            </ul>
            <Link 
              to="https://paystack.com/pay/start-pack" 
              className="mt-6 bg-blue-600 text-white hover:bg-blue-500 px-4 py-2 rounded-md"
            >
              PURCHASE NOW
            </Link>
          </div>
        </div>

        {/* Enterprise Plan */}
        <div className="mt-5 mx-4">
          <div className="flex flex-col border-2 border-blue-600 text-gray-700 items-center rounded-lg bg-white p-10 shadow-md">
            <h2 className="font-bold text-xl text-center text-gray-900">Enterprise</h2>
            <h3 className="font-medium text-2xl text-blue-600">₵1100/month</h3>
            <ul className="text-left mt-4 space-y-2">
              <li>✅ Unlimited Store Locations</li>
              <li>✅ Unlimited Products</li>
              <li>✅ Custom Reporting & Integrations</li>
              <li>✅ Priority Support</li>
            </ul>
            <Link 
              to="https://paystack.com/pay/prem-pack" 
              className="mt-6 bg-blue-600 text-white hover:bg-blue-500 px-4 py-2 rounded-md"
            >
              PURCHASE NOW
            </Link>
          </div>
        </div>

      </div>
    </>
  );
}

export default PricingSect;
