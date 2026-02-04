import React, { useEffect, useState } from "react";
import UserCard from "../components/UserCard";
import AddMemberModal from "../components/AddMemberModal";
import Header from "../components/Header";

type Role = "Admin" | "Editor" | "Viewer";

interface UserFormData {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: "Active" | "Inactive";
}




type NewUser = {
  name: string;
  email: string;
  role: Role;
};

export default function LandingPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [users, setUsers] = useState<UserFormData[]>([
    {id: "1", name: "Alex Rivera", email: "alex.rivera@example.com", role: "Admin", status: "Active" },
    {id: "2", name: "Sarah Chen", email: "s.chen@design.co", role: "Editor", status: "Active" },
    {id: "3", name: "Marcus Wright", email: "m.wright@tech.io", role: "Viewer", status: "Inactive" },
    {id: "4", name: "Elena Rodriguez", email: "elena.rod@startup.com", role: "Editor", status: "Active" },
  ]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  //this receives data from modal
  const handleSave = (newUser: NewUser) => {
    console.log(newUser)
    setUsers((prev) => [
         ...prev,
      { ...newUser, id: crypto.randomUUID(), status: "Active" }, // default status
     
    ]);
    closeModal();
  };


  const handleSearch = (searchKey: string) => {
    setSearchQuery(searchKey);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="flex-1 max-w-7xl mx-auto w-full px-8 pb-12">
      <Header searchHandle={handleSearch} onOpen={openModal} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <UserCard key={user.id} {...user} 
          onSave={(updatedUser) => {
    setUsers(prev => prev.map(u => u.id === updatedUser.id ? { ...updatedUser, id: updatedUser.id as string } : u));
  }}
  onDelete={(id) => {
    setUsers(prev => prev.filter(u => u.id !== id));
  }} />
        ))}

        <div
          onClick={openModal}
          className="group relative border-2 border-dashed border-slate-200 dark:border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 hover:border-primary/50 transition-colors cursor-pointer min-h-[300px]"
        >
          <div className="size-16 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-background-dark transition-all">
            <span className="material-symbols-outlined text-[32px]">person_add</span>
          </div>

          <div className="text-center">
            <p className="font-bold text-slate-400 group-hover:text-primary transition-colors">
              Add New Member
            </p>
            <p className="text-xs text-slate-400">Expand your organization</p>
          </div>
        </div>
      </div>

      {/* pass onSave */}
      {isOpen ? <AddMemberModal onClose={closeModal} onSave={handleSave} /> : null}
    </main>
  );
}
