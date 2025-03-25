import { Client, Account, Databases, Storage } from 'appwrite';

// Initialize the Appwrite client
const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite API endpoint
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || ''); // Your project ID, We get this from Appwrite Console and it is required to be in your .env file

// Initialize Appwrite services
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

// Create a strongly typed cache for user data
interface UserCache {
  user: Record<string, any> | null;
  timestamp: number;
  expiresIn: number;
}

// Cache duration in milliseconds (1 minute)
const CACHE_DURATION = 60000;

// Initialize the cache
const userCache: UserCache = {
  user: null,
  timestamp: 0,
  expiresIn: CACHE_DURATION,
};

// Function to check if cache is valid
function isCacheValid(): boolean {
  if (!userCache.user) return false;
  const now = Date.now();
  return now - userCache.timestamp < userCache.expiresIn;
}

// Get current user with caching
export async function getCurrentUser() {
  try {
    // Check if we have a valid cached user
    if (isCacheValid()) {
      console.log("Using cached user data");
      return { success: true, data: userCache.user };
    }

    console.log("Fetching user data from Appwrite");
    const user = await account.get();
    
    // Update cache
    userCache.user = user;
    userCache.timestamp = Date.now();
    
    return { success: true, data: user };
  } catch (error) {
    console.log("Error getting current user:", error);
    return { success: false, error };
  }
}

// Cache for database queries
interface QueryCache {
  [key: string]: {
    data: Record<string, any>;
    timestamp: number;
    expiresIn: number;
  };
}

const queryCache: QueryCache = {};

// Wrapper for database list calls with caching
export async function cachedDatabaseList(
  databaseId: string,
  collectionId: string,
  queries: string[] = [],
  cacheDuration: number = CACHE_DURATION
) {
  // Create a cache key based on the parameters
  const cacheKey = `${databaseId}_${collectionId}_${queries.join(",")}`;  
  
  try {
    // Check if we have a valid cached result
    if (
      queryCache[cacheKey] &&
      Date.now() - queryCache[cacheKey].timestamp < queryCache[cacheKey].expiresIn
    ) {
      console.log(`Using cached data for ${cacheKey}`);
      return { success: true, data: queryCache[cacheKey].data };
    }
    
    console.log(`Fetching fresh data for ${cacheKey}`);
    const result = await databases.listDocuments(
      databaseId,
      collectionId,
      queries
    );
    
    // Update cache
    queryCache[cacheKey] = {
      data: result,
      timestamp: Date.now(),
      expiresIn: cacheDuration,
    };
    
    return { success: true, data: result };
  } catch (error) {
    console.log(`Error in cachedDatabaseList for ${cacheKey}:`, error);
    return { success: false, error };
  }
}

// Function to clear specific cache entries
export function clearCache(type: "user" | "query", key?: string) {
  if (type === "user") {
    userCache.user = null;
    userCache.timestamp = 0;
  } else if (type === "query" && key) {
    delete queryCache[key];
  } else if (type === "query") {
    // Clear all query cache
    Object.keys(queryCache).forEach((k) => delete queryCache[k]);
  }
}

// Function to invalidate all caches (useful after mutations)
export function invalidateAllCaches() {
  userCache.user = null;
  userCache.timestamp = 0;
  Object.keys(queryCache).forEach((k) => delete queryCache[k]);
}

// Login user
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
