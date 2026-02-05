import React, { useEffect, useState } from "react";
import UserCard from "../components/UserCard";
import AddMemberModal from "../components/AddMemberModal";
import Header from "../components/Header";
import { getUsers, addUser, updateUser, deleteUser } from "../server/AllApi";

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
  const [users, setUsers] = useState<UserFormData[]>([]);

  const fetchUsers = async () => {
    const res = await getUsers();
    if (res && res.data) {
      // Assuming backend returns array of users directly or in a property.
      // Adjusting based on common patterns. If res.data is the array:
      setUsers(res.data);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // Create User
  const handleSave = async (newUser: NewUser) => {
    const userData = { ...newUser, status: "Active" };
    const res = await addUser(userData);
    if (res && res.data) {
      // Optimistically update or refetch. Refetch is safer for sync.
      fetchUsers();
    }
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
            onSave={async (updatedUser) => {
              // Update User
              const res = await updateUser(updatedUser.id, updatedUser);
              if (res && res.status === 200) { // Check status or data
                fetchUsers();
              }
            }}
            onDelete={async (id) => {
              // Delete User
              await deleteUser(id);
              fetchUsers();
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

      {isOpen ? <AddMemberModal onClose={closeModal} onSave={handleSave} /> : null}
    </main>
  );
}
