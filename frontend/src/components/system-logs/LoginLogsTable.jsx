export default function LoginLogsTable({ logs }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 text-xs border-b border-gray-100 bg-gray-50">
              <th className="px-4 py-3 font-medium">User</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Timestamp</th>
              <th className="px-4 py-3 font-medium">IP Address</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className={`border-b border-gray-50 last:border-0 ${log.status === "Failed" ? "bg-red-50/30" : ""}`}>
                <td className="px-4 py-3 text-gray-800 font-medium">{log.user}</td>
                <td className="px-4 py-3 text-gray-600">{log.email}</td>
                <td className="px-4 py-3 text-gray-600">{log.timestamp}</td>
                <td className="px-4 py-3 text-gray-500 font-mono text-xs">{log.ip}</td>
                <td className="px-4 py-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${log.status === "Success" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}>{log.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}