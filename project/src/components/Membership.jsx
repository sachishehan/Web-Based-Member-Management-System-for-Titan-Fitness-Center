function PlanCard({ title, price, features, popular }) {
  return (
    <div className={`bg-white rounded-lg p-8 shadow-lg ${
      popular ? 'transform scale-105 border-2 border-primary' : ''
    }`}>
      {popular && (
        <div className="bg-primary text-white text-center py-1 px-4 rounded-full text-sm font-semibold mb-4 mx-auto w-fit">
          Most Popular
        </div>
      )}
      <h3 className="text-2xl font-bold text-center mb-2">{title}</h3>
      <div className="text-4xl font-bold text-center text-primary mb-6">
        {price}<span className="text-lg text-gray-600">/month</span>
      </div>
      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      <button className={`w-full btn ${popular ? 'btn-primary' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`}>
        Join Now
      </button>
    </div>
  );
}

function Membership() {
  const plans = [
    {
      title: "Basic Plan",
      price: "$29",
      features: ["Access to gym facilities", "Locker room access", "Basic fitness assessment"],
    },
    {
      title: "Standard Plan",
      price: "$49",
      features: ["All Basic Plan features", "Group classes", "Nutrition consultation"],
      popular: true,
    },
    {
      title: "Premium Plan",
      price: "$99",
      features: ["All Standard Plan features", "Personal trainer", "Custom diet plan"],
    },
  ];

  return (
    <section id="membership" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Membership Plans</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <PlanCard key={index} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Membership;