export default function AuthButtons() {
  return (
    <div className="space-y-3">
      <button className="w-full bg-gray-200 text-black p-3 rounded-md" disabled>
        Google Auth
      </button>
      <button className="w-full bg-gray-200 text-black p-3 rounded-md" disabled>
        Apple Auth
      </button>
    </div>
  )
}
