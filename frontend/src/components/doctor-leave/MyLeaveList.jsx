const statusStyles = {
  Pending: "bg-amber-50 text-amber-600",
  Approved: "bg-green-50 text-green-600",
  Rejected: "bg-red-50 text-red-600",
};

export default function MyLeaveList({ requests }) {
  if (requests.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-10 text-center text-gray-400 text-sm">
        No leave requests yet.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h3 className="font-semibold text-gray-800 mb-3">My Leave History</h3>
      <div className="space-y-3 max-h-[500px] overflow-y-auto">
        {requests.map((lv) => (
          <div key={lv.id} className="border border-gray-100 rounded-lg p-3">
            <div className="flex items-start justify-between gap-2 mb-1">
              <div>
                <p className="text-sm font-medium text-gray-800">{lv.leaveType}</p>
                <p className="text-xs text-gray-500">{lv.fromDate === lv.toDate ? lv.fromDate : `${lv.fromDate} — ${lv.toDate}`}</p>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium shrink-0 ${statusStyles[lv.status]}`}>{lv.status}</span>
            </div>
            <p className="text-xs text-gray-600">{lv.reason}</p>
            {lv.status === "Rejected" && lv.rejectionReason && (
              <p className="text-xs text-red-500 mt-1">Reason: {lv.rejectionReason}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}