import React, { useState } from 'react';
 
interface SearchUser {
    onOpen:()=>void
   searchHandle: (search: string) => void;
}
 
const Header = ({ searchHandle,onOpen }: SearchUser) => {
  const [searchKey, setSearchKey] = useState<string>("");

  const handleSearchChange = (e:any) => {
    const value = e.target.value;
    setSearchKey(value);
    searchHandle(value);
  };

    return (
        <div>
            <header className="p-8 max-w-7xl mx-auto w-full flex flex-col gap-6">
      {/* Top Section: Header & Add Button */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-primary size-8 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-background-dark text-[20px]">
                shield_person
              </span>
            </div>
            <h1 className="text-xl font-bold tracking-tight">Admin Dash</h1>
          </div>
          <h2 className="text-4xl font-black tracking-tight">User Management</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Directly edit user information within the cards below.
          </p>
        </div>
        <button onClick={onOpen} className="bg-primary text-background-dark px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2 hover:scale-105 transition-transform active:scale-95 shadow-xl shadow-primary/20">
          <span className="material-symbols-outlined text-[20px]">
            person_add
          </span>
          Add New User
        </button>
      </div>

      {/* Bottom Section: Search & Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[300px]">
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
              search
            </span>
            <input
              className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full py-3 pl-12 pr-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-slate-400"
              placeholder="Search users by name, email, or role..."
              type="text"
              value={searchKey}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full px-4 py-2 flex items-center gap-2 cursor-pointer hover:border-primary transition-colors">
            <span className="text-sm font-medium">All Roles</span>
            <span className="material-symbols-outlined text-slate-400 text-[18px]">
              expand_more
            </span>
          </div>
          <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full px-4 py-2 flex items-center gap-2 cursor-pointer hover:border-primary transition-colors">
            <span className="text-sm font-medium">Status</span>
            <span className="material-symbols-outlined text-slate-400 text-[18px]">
              filter_list
            </span>
          </div>
        </div>
      </div>
    </header>
            
        </div>
    );
}

export default Header;
