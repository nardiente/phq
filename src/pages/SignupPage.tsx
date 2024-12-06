import { useNavigate } from 'react-router-dom';
import { Testimonial } from '../components/signup/Testimonial';

export function SignupPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row justify-between p-8 font-sans w-full min-h-screen">
      {/* Left Section: Sign-up Form */}
      <div className="w-1/2 flex justify-center">
        <div className="max-w-md w-full mb-8 md:mb-0 flex flex-col justify-center">
          <h1 className="text-2xl font-bold mb-6 leading-relaxed">
            Prioritize Features with Confidence <br />
            Manage Feedback with Ease
          </h1>
          <form className="space-y-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium mb-1"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                placeholder="Enter your first name"
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium mb-1"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                placeholder="Enter your last name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-1"
              >
                Set a Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                placeholder="Enter password"
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium mb-1"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                placeholder="Confirm password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-500 text-white py-2 rounded-lg text-center font-medium disabled:opacity-50"
              disabled
            >
              Sign up →
            </button>
          </form>
          <p className="mt-4 text-sm">
            Already have an account?{' '}
            <a
              onClick={() => navigate('/sign-in')}
              className="text-purple-500 font-medium hover:underline cursor-pointer"
            >
              Sign in
            </a>
            .
          </p>
          <p className="mt-4 text-xs text-gray-500">
            By continuing, you agree to our{' '}
            <a
              href="#"
              className="text-purple-500 hover:underline cursor-pointer"
            >
              Terms of Service
            </a>{' '}
            and{' '}
            <a
              href="#"
              className="text-purple-500 hover:underline cursor-pointer"
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>

      {/* Right Section: Testimonials */}
      <div className="w-1/2 flex justify-center">
        <div className="max-w-lg w-full space-y-8 flex flex-col justify-center">
          <Testimonial
            name="Aura Brooks"
            role="Graphic Designer"
            feedback="I've tested out all the other products on the market, but ProductHQ takes the cake when it comes to user interface and experience. The team behind it is constantly rolling out new features at an incredible pace, which is really impressive."
          />
          <Testimonial
            name="Jack Graham"
            role="Co-founder"
            feedback="ProductHQ is amazing. It's changed the way we connect with our customers. Not only has it saved us heaps of money and time by avoiding unnecessary guesswork for upcoming features, but it also empowers our customers to directly influence the direction of our product."
          />
        </div>
      </div>
    </div>
  );
}
