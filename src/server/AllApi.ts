import commonApi from "./commonApi";


// Example usage template
// Get all users
export const getUsers = async () => {
    return await commonApi("GET", "");
};

// Create new user
export const addUser = async (data: any) => {
    return await commonApi("POST", "", data);
};

// Update user
export const updateUser = async (id: string, data: any) => {
    return await commonApi("PUT", `${id}`, data);
};

// Delete user
export const deleteUser = async (id: string) => {
    return await commonApi("DELETE", `${id}`);
};
