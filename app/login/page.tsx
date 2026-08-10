export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 rounded px-3 py-2"
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 rounded px-3 py-2"
          />
          <button
            type="submit"
            className="bg-black text-white rounded py-2 hover:bg-gray-800"
          >
            Sign In
          </button>
        </form>
        <p className="text-sm text-gray-500 mt-4 text-center">
          Authentication coming soon (Supabase integration in progress)
        </p>
      </div>
    </div>
  );
}