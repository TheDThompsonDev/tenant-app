import { Download, Upload } from "lucide-react"

export default function ActionButtons() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-6">
      <button className="flex flex-col items-center gap-2 bg-secondary-blue text-white px-6 py-3 rounded-md shadow-md">
        <Download size={24} />
        Download
      </button>

      <button className="flex flex-col items-center gap-2 bg-secondary-blue text-white px-6 py-3 rounded-md shadow-md">
        <Upload size={24} />
        Upload
      </button>
    </div>
  )
}
