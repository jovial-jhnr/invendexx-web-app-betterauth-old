import Inven_dpage_1 from "../../assets/Inven_dpage_1.png";

export default function Features() {
  return (
    <div className="bg-gray-100 m-2 rounded-xs">
      {/* Features Overview */}
      <section className="py-16 px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900">
          Manage Business Like a Pro
        </h2>
        <p className="max-w-xl mx-auto text-gray-700 mb-8">
          Track stock levels, fulfill orders, and get real-time insights—all in
          one powerful system.
        </p>
        <img
          src={Inven_dpage_1} // Replace with a real dashboard image
          alt="Inventory Management Dashboard Preview"
          className=" my-8 mx-auto bg-gray-50 border border-blue-200 block shadow-lg rounded-lg"
        />
      </section>

      {/* Detailed Features */}
      <section className="bg-white py-16 px-8">
        <h3 className="text-center font-bold font-opensans text-2xl mb-8 text-blue-600">
          Key Features
        </h3>
        <div className="flex flex-wrap justify-center mt-8">
          {[
            {
              title: "Real-Time Inventory Tracking",
              description:
                "Monitor stock levels across multiple locations instantly.",
            },
            {
              title: "Order Management",
              description:
                "Process, track, and fulfill customer orders seamlessly.",
            },
            {
              title: "Multi-Store Support",
              description:
                "Manage multiple stores and assign staff to different locations.",
            },
            {
              title: "User Roles & Permissions",
              description:
                "Control access with admin, manager, and staff roles.",
            },
            {
              title: "Sales & Expense Analytics",
              description:
                "Get insights into revenue, expenses, and profits in real time.",
            },
            {
              title: "Automated Restocking Alerts",
              description: "Receive notifications when inventory is low.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="flex-1 min-w-[300px] m-4 p-4 border border-blue-300 rounded-lg bg-gray-50 shadow-md"
            >
              <h4 className="mb-2 font-semibold text-center text-gray-900">
                {feature.title}
              </h4>
              <p className="m-0 text-center text-gray-600 font-notoserif">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
