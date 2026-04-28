// Authentication service using localStorage

export interface User {
  id: string;
  name: string;
  phone: string;
  state: string;
  district: string;
}

export interface UserWithPassword extends User {
  password: string;
  createdAt: string;
}

const USERS_KEY = "agriconnect_users";
const CURRENT_USER_KEY = "agriconnect_current_user";

/**
 * Get all registered users
 */
export function getAllUsers(): UserWithPassword[] {
  try {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  } catch (error) {
    console.error("Error reading users from localStorage:", error);
    return [];
  }
}

/**
 * Get current logged-in user
 */
export function getCurrentUser(): User | null {
  try {
    const user = localStorage.getItem(CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Error reading current user from localStorage:", error);
    return null;
  }
}

/**
 * Check if user is logged in
 */
export function isLoggedIn(): boolean {
  return getCurrentUser() !== null;
}

/**
 * Register a new user
 */
export function registerUser(userData: Omit<UserWithPassword, "id" | "createdAt">): { success: boolean; message: string; user?: User } {
  const users = getAllUsers();
  
  // Check if user already exists
  const existingUser = users.find(u => u.phone === userData.phone);
  if (existingUser) {
    return { success: false, message: "User with this phone number already exists" };
  }
  
  // Create new user
  const newUser: UserWithPassword = {
    ...userData,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  
  // Save to localStorage
  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  
  // Set as current user
  const currentUser: User = {
    id: newUser.id,
    name: newUser.name,
    phone: newUser.phone,
    state: newUser.state,
    district: newUser.district,
  };
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
  
  return { success: true, message: "Registration successful", user: currentUser };
}

/**
 * Login user
 */
export function loginUser(phone: string, password: string): { success: boolean; message: string; user?: User } {
  const users = getAllUsers();
  const user = users.find(u => u.phone === phone && u.password === password);
  
  if (!user) {
    return { success: false, message: "Invalid phone number or password" };
  }
  
  // Set as current user
  const currentUser: User = {
    id: user.id,
    name: user.name,
    phone: user.phone,
    state: user.state,
    district: user.district,
  };
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
  
  return { success: true, message: "Login successful", user: currentUser };
}

/**
 * Logout current user
 */
export function logoutUser(): void {
  localStorage.removeItem(CURRENT_USER_KEY);
}

/**
 * Update user profile
 */
export function updateUserProfile(userId: string, updates: Partial<Omit<User, "id">>): { success: boolean; message: string } {
  const users = getAllUsers();
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) {
    return { success: false, message: "User not found" };
  }
  
  // Update user
  users[userIndex] = { ...users[userIndex], ...updates };
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  
  // Update current user if it's the same user
  const currentUser = getCurrentUser();
  if (currentUser && currentUser.id === userId) {
    const updatedCurrentUser = { ...currentUser, ...updates };
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedCurrentUser));
  }
  
  return { success: true, message: "Profile updated successfully" };
}
