import { Info } from 'lucide-react'

const TableHeader = () => {
  return (
    <thead>
      <tr className="border-b">
        <th className="py-4 px-6 text-left text-sm font-medium text-gray-500">#</th>
        <th className="py-4 px-6 text-left text-sm font-medium text-gray-500">Idea Name</th>
        <th className="py-4 px-6 text-left text-sm font-medium text-gray-500">Status</th>
        <th className="py-4 px-6 text-left text-sm font-medium text-gray-500">Estimated</th>
        <th className="py-4 px-6 text-left text-sm font-medium text-gray-500">Reach</th>
        <th className="py-4 px-6 text-left text-sm font-medium text-gray-500">Impact</th>
        <th className="py-4 px-6 text-left text-sm font-medium text-gray-500">Confidence</th>
        <th className="py-4 px-6 text-left text-sm font-medium text-gray-500 flex items-center gap-1">
          Effort
          <div className="group relative">
            <Info className="w-4 h-4 text-gray-400 cursor-help" />
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity whitespace-nowrap">
              Combines intuitive labels with Fibonacci progression.
            </div>
          </div>
        </th>
        <th className="py-4 px-6 text-left text-sm font-medium text-gray-500">Score</th>
      </tr>
    </thead>
  )
}

export default TableHeader
