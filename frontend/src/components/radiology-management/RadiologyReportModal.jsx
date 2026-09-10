import { useState } from "react";
import { X, Upload, FileText, ImageIcon } from "lucide-react";

export default function RadiologyReportModal({ request, onClose, onUpload }) {
  const [file, setFile] = useState(null);
  const [findings, setFindings] = useState(request.findings || "");

  if (!request) return null;

  const isReadOnly = request.status === "Report Ready";

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) setFile(selected);
  };

  const handleSubmit = () => {
    if (!file && !isReadOnly) {
      alert("Please attach an image or PDF report");
      return;
    }
    if (!findings.trim()) {
      alert("Please enter findings/summary");
      return;
    }
    onUpload(request, file?.name || request.reportFileName, findings);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X size={20} />
        </button>

        <h2 className="text-lg font-bold text-gray-800 mb-1">{request.testType} — {request.bodyPart}</h2>
        <p className="text-sm text-gray-500 mb-5">{request.patient} • {request.id}</p>

        {!isReadOnly && (
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700 mb-1.5 block">Attach Report (Image / PDF)</label>
            <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-lg py-6 cursor-pointer hover:border-blue-700 transition">
              <Upload size={22} className="text-gray-400" />
              <span className="text-xs text-gray-500">{file ? file.name : "Click to select a file"}</span>
              <input type="file" accept="image/*,.pdf" onChange={handleFileChange} className="hidden" />
            </label>
          </div>
        )}

        {isReadOnly && request.reportFileName && (
          <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2.5 mb-4 text-sm text-gray-600">
            {request.reportFileName.endsWith(".pdf") ? <FileText size={16} className="text-blue-600" /> : <ImageIcon size={16} className="text-blue-600" />}
            {request.reportFileName}
          </div>
        )}

        <div className="mb-5">
          <label className="text-sm font-medium text-gray-700 mb-1.5 block">Findings / Summary</label>
          <textarea
            value={findings}
            onChange={(e) => setFindings(e.target.value)}
            rows={3}
            disabled={isReadOnly}
            placeholder="Enter radiology findings..."
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700 disabled:bg-gray-50"
          />
        </div>

        {isReadOnly ? (
          <button onClick={onClose} className="w-full bg-blue-700 text-white py-2.5 rounded-lg font-medium hover:bg-blue-800 transition">
            Close
          </button>
        ) : (
          <button onClick={handleSubmit} className="w-full bg-green-600 text-white py-2.5 rounded-lg font-medium hover:bg-green-700 transition">
            Upload & Release Report
          </button>
        )}
      </div>
    </div>
  );
}