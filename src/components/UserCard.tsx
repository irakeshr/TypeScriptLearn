import React, { useState } from "react";

type Role = "Admin" | "Editor" | "Viewer";
type Status = "Active" | "Inactive";

export interface UserCardData {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: Status;
  avatarUrl?: string;
}


interface UserCardProps extends UserCardData {
  onSave: (user: UserCardData) => void;
  onDelete?: (id: string) => void;
}

export default function UserCard({
  id,
  name: initialName,
  email: initialEmail,
  role: initialRole,
  status,
  avatarUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuBvRD74VRY1IGurlw_zhwbUxhmbjv8Zhoz4lJmvKY0XDDBU_zYv9sNTnG6M6zo7rneS4TXFl0Vbl3w3whwhpmS0S5cF6QhY48YU0G4pdJGMGAO4l4knxCc3s_kldBmiEfah77MpfQHntbJ8NGkm4WUC8KT3gc1PlRHKCxxz530Aw4AXCfTFSC3V_z-VhP5vxBLOIeJIs8ZJs_pio-YDswt4owVV4M_G_wiYe2uCI6exptIbR3buMfX-tVT6pixh4ezN1TOfoxmevAM",
  onSave,
  onDelete,
}: UserCardProps) {
  const [name, setName] = useState<string>(initialName);
  const [email, setEmail] = useState<string>(initialEmail);
  const [role, setRole] = useState<Role>(initialRole);

  const isDirty =
    name !== initialName || email !== initialEmail || role !== initialRole;

  const handleCancel = () => {
    setName(initialName);
    setEmail(initialEmail);
    setRole(initialRole);
  };

  const handleSave = () => {
    onSave({
      id,
      name,
      email,
      role,
      status,
      avatarUrl,
    });
  };

  return (
    <div className="user-card group relative bg-white dark:bg-[#1a2b15] border border-slate-200 dark:border-white/10 rounded-2xl p-6 transition-all hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
      {/* Header: Avatar & Status */}
      <div className="flex justify-between items-start mb-4">
        <div className="relative">
          <div
            className="size-16 rounded-2xl bg-cover bg-center border-2 border-primary/20 shadow-lg"
            style={{ backgroundImage: `url('${avatarUrl}')` }}
          />
          <button className="absolute -bottom-2 -right-2 size-7 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center border border-slate-200 dark:border-white/10 text-slate-500 hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-[14px]">
              photo_camera
            </span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`size-2 rounded-full ${
              status === "Active" ? "bg-primary animate-pulse" : "bg-slate-400"
            }`}
          />
          <span
            className={`text-[11px] font-black uppercase tracking-widest ${
              status === "Active" ? "text-primary" : "text-slate-400"
            }`}
          >
            {status}
          </span>
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        {/* Name Input */}
        <div className="relative group/field">
          <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
            Full Name
          </label>
          <input
            className="w-full bg-transparent border-none p-0 font-bold text-lg focus:ring-0 focus:outline-none focus:text-primary transition-colors cursor-text"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <span className="material-symbols-outlined absolute right-0 top-6 text-[16px] text-slate-300 opacity-0 group-hover/field:opacity-100 transition-opacity">
            edit
          </span>
        </div>

        {/* Email Input */}
        <div className="relative group/field">
          <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
            Email Address
          </label>
          <input
            className="w-full bg-transparent border-none p-0 text-sm text-slate-500 dark:text-slate-400 focus:ring-0 focus:outline-none focus:text-primary transition-colors cursor-text"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span className="material-symbols-outlined absolute right-0 top-6 text-[16px] text-slate-300 opacity-0 group-hover/field:opacity-100 transition-opacity">
            edit
          </span>
        </div>

        {/* Role Select */}
        <div className="relative group/field">
          <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
            Role
          </label>
          <select
            className="w-full bg-transparent border-none p-0 text-xs font-black uppercase tracking-wider text-slate-600 dark:text-slate-300 focus:ring-0 focus:outline-none cursor-pointer appearance-none"
            value={role}
            onChange={(e) => setRole(e.target.value as Role)}
          >
            <option value="Admin">Admin</option>
            <option value="Editor">Editor</option>
            <option value="Viewer">Viewer</option>
          </select>
          <span className="material-symbols-outlined absolute right-0 top-6 text-[16px] text-slate-300 opacity-0 group-hover/field:opacity-100 transition-opacity pointer-events-none">
            swap_vert
          </span>
        </div>
      </div>

      {/* Actions Footer */}
      <div className="save-actions mt-6 pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2">
        <button
          type="button"
          onClick={() => onDelete?.(id)}
          className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-[16px]">delete</span>
          Delete
        </button>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleCancel}
            disabled={!isDirty}
            className="px-4 py-1.5 rounded-full text-xs font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={!isDirty}
            className="px-4 py-1.5 rounded-full text-xs font-bold bg-primary text-background-dark shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
