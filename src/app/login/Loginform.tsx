import AuthButtons from "./AuthButtons"

export default function LoginForm() {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

      <div className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 bg-gray-200 text-black rounded-md focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 bg-gray-200 text-black rounded-md focus:outline-none"
        />
        <button
          className="w-full bg-secondary-blue text-white p-3 rounded-md"
          disabled
        >
          Login
        </button>
      </div>

      <div className="flex items-center my-6">
        <hr className="flex-grow border-gray-300" />
        <span className="px-3 text-gray-500">Or login with</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      <AuthButtons />
    </div>
  )
}
