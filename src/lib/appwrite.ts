import { Client, Account } from 'appwrite';

// Since everyone on the team is new to Appwrite, we will add comments to explain the code
// Initialize the Appwrite client
export const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite API endpoint
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || ''); // Your project ID, We get this from Appwrite Console and it is required to be in your .env file

// Initialize the Appwrite account
export const account = new Account(client);
export const loginWithEmailPassword = async (
  email: string,
  password: string
) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return { success: true, data: session };
  } catch (error) {
    return { success: false, error };
  }
};

// Check if user is logged in
export const getCurrentUser = async () => {
  try {
    const user = await account.get();
    console.log('User:', user);
    return { success: true, data: user };
  } catch (error) {
    return { success: false, error };
  }
};

// Register user
export const registerUser = async (
  name: string,
  email: string,
  password: string,
  userId: string
) => {
  try {
    const user = await account.create(email, name, password, userId);
    return { success: true, data: user };
  } catch (error) {
    return { success: false, error };
  }
};

// Update user name and/or email
export const updateUserProfile = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    if (name) {
      await account.updateName(name);
    }
    if (email && password) {
      await account.updateEmail(email, password);
    }
    const updatedUser = await account.get();
    return { success: true, data: updatedUser };
  } catch (error) {
    return { success: false, error };
  }
};

// Logout user
export const logout = async () => {
  try {
    await account.deleteSession('current');
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};
