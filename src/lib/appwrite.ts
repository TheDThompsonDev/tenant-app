import { Client, Account, Databases, Storage } from 'appwrite';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite API endpoint
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || ''); // Your project ID, We get this from Appwrite Console and it is required to be in your .env file

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

interface UserCache {
  user: Record<string, any> | null;
  timestamp: number;
  expiresIn: number;
}

const CACHE_DURATION = 60000;

const userCache: UserCache = {
  user: null,
  timestamp: 0,
  expiresIn: CACHE_DURATION,
};

function isCacheValid(): boolean {
  if (!userCache.user) return false;
  const now = Date.now();
  return now - userCache.timestamp < userCache.expiresIn;
}

export async function getCurrentUser() {
  try {
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
interface QueryCache {
  [key: string]: {
    data: Record<string, any>;
    timestamp: number;
    expiresIn: number;
  };
}

const queryCache: QueryCache = {};

export async function cachedDatabaseList(
  databaseId: string,
  collectionId: string,
  queries: string[] = [],
  cacheDuration: number = CACHE_DURATION
) {

  const cacheKey = `${databaseId}_${collectionId}_${queries.join(",")}`;  
  try {
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

export function clearCache(type: "user" | "query", key?: string) {
  if (type === "user") {
    userCache.user = null;
    userCache.timestamp = 0;
  } else if (type === "query" && key) {
    delete queryCache[key];
  } else if (type === "query") {
    Object.keys(queryCache).forEach((k) => delete queryCache[k]);
  }
}
export function invalidateAllCaches() {
  userCache.user = null;
  userCache.timestamp = 0;
  Object.keys(queryCache).forEach((k) => delete queryCache[k]);
}

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

export const logout = async () => {
  try {
    await account.deleteSession('current');
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};
