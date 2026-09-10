import { useState } from "react";
import { Pin, Plus, X, Trash2 } from "lucide-react";
import { generateAnnouncementId } from "../../data/notificationsManagementData";

export default function AnnouncementBoard({ announcements, onPost, onDelete }) {
  const [formOpen, setFormOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const sorted = [...announcements].sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      alert("Please fill title and message");
      return;
    }
    const today = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    onPost({
      id: generateAnnouncementId(announcements),
      title,
      body,
      postedOn: today,
      pinned: false,
    });
    setTitle("");
    setBody("");
    setFormOpen(false);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800">Hospital Announcements</h3>
        <button
          onClick={() => setFormOpen((o) => !o)}
          className="flex items-center gap-1.5 text-sm text-blue-700 hover:underline"
        >
          {formOpen ? <X size={14} /> : <Plus size={14} />}
          {formOpen ? "Cancel" : "Post New"}
        </button>
      </div>

      {formOpen && (
        <form onSubmit={handleSubmit} className="space-y-3 mb-4 border-b border-gray-100 pb-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Announcement title"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700"
          />
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Announcement message"
            rows={3}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-700"
          />
          <button type="submit" className="w-full bg-blue-700 text-white rounded-lg py-2 text-sm font-medium hover:bg-blue-800 transition">
            Post Announcement
          </button>
        </form>
      )}

      <div className="space-y-3">
        {sorted.map((a) => (
          <div key={a.id} className="border border-gray-100 rounded-lg p-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-1.5">
                {a.pinned && <Pin size={12} className="text-amber-500" />}
                <p className="text-sm font-medium text-gray-800">{a.title}</p>
              </div>
              <button onClick={() => onDelete(a)} className="text-gray-300 hover:text-red-500 shrink-0">
                <Trash2 size={13} />
              </button>
            </div>
            <p className="text-xs text-gray-600 mt-1">{a.body}</p>
            <p className="text-xs text-gray-400 mt-1.5">{a.postedOn}</p>
          </div>
        ))}
      </div>
    </div>
  );
}