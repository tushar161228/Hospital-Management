const actionColors = {
  Created: "text-green-600", Updated: "text-blue-600", Deleted: "text-red-600",
  Signed: "text-purple-600", Approved: "text-green-600",
};

export default function AuditLogsTable({ logs }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 text-xs border-b border-gray-100 bg-gray-50">
              <th className="px-4 py-3 font-medium">User</th>
              <th className="px-4 py-3 font-medium">Action</th>
              <th className="px-4 py-3 font-medium">Target</th>
              <th className="px-4 py-3 font-medium">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className="border-b border-gray-50 last:border-0">
                <td className="px-4 py-3 text-gray-800 font-medium">{log.user}</td>
                <td className={`px-4 py-3 font-medium ${actionColors[log.action] || "text-gray-600"}`}>{log.action}</td>
                <td className="px-4 py-3 text-gray-600">{log.target}</td>
                <td className="px-4 py-3 text-gray-500">{log.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}