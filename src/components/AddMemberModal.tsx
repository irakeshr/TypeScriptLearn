import React, { useState} from "react";

type Role = "Admin" | "Editor" | "Viewer";

interface NewUser {
  name: string;
  email: string;
  role: Role;
}

interface AddMemberModalProps {
  onClose: () => void;
  onSave: (user: NewUser) => void;
}

function AddMemberModal({ onClose, onSave }: AddMemberModalProps) {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [role, setRole] = useState<Role | "">("");

  const handleSubmit = (e:any ) => {
    e.preventDefault();

    if (!name || !email || !role) {
      alert("Please fill in all fields");
      return;
    }

    onSave({ name, email, role });
    setName("");
    setEmail("");
    setRole("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        className="relative bg-white dark:bg-[#1a2b15] w-full max-w-lg rounded-[2rem] shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-black tracking-tight">Add New Member</h3>
            <button
              onClick={onClose}
              className="size-10 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">
                Full Name
              </label>
              <input
                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-5 py-3 outline-none"
                placeholder="e.g. Jordan Smith"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">
                Email Address
              </label>
              <input
                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-5 py-3 outline-none"
                placeholder="j.smith@company.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Role */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-black uppercase tracking-widest text-slate-400 ml-1">
                Role
              </label>

              <select
                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-5 py-3 outline-none"
                value={role}
                onChange={(e) => setRole(e.target.value as Role)}
              >
                <option value="" disabled>
                  Select a role
                </option>
                <option value="Admin">Admin</option>
                <option value="Editor">Editor</option>
                <option value="Viewer">Viewer</option>
              </select>
            </div>

            <div className="mt-10 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-4 rounded-2xl font-bold text-sm text-slate-500"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="flex-[2] bg-primary text-background-dark px-6 py-4 rounded-2xl font-bold text-sm"
              >
                Create User
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddMemberModal;
