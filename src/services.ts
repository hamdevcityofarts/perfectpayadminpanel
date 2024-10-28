import axios from "axios";
import { getAuthToken, setAuthToken } from "./tokenStore"; // Assuming this is where token is stored

// Create Axios instance for API client
const apiClient = axios.create({
  baseURL: "https://serve.perfectpaycameroon.com/api/v1", // Replace with your base API URL
});

// Axios interceptor to include the token in every request
apiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Authentication Function: Special getUserConnect for Authentication
export async function getUserConnect(phone: string, pin: string) {
  try {
    const response = await apiClient.post("/auth/login", {
      phone_number: phone,
      pin,
    });

    const data = response.data;

    if (data && data.access_token) {
      setAuthToken(data.access_token);
      return {
        ...data.user,
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
      };
    }

    return null;
  } catch (error) {
    throw new Error("An error occurred during authentication.");
  }
}

// CRUD Operations for Other Resources

// Create (POST)
export async function createResource(resourcePath: string, data: any) {
  try {
    const response = await apiClient.post(resourcePath, data);
    return response.data;
  } catch (error) {
    console.error(`Failed to create resource at ${resourcePath}:`, error);
    throw error;
  }
}

// Read (GET)
export async function getResource(resourcePath: string) {
  try {
    const response = await apiClient.get(resourcePath);
    return response.data;
  } catch (error) {
    console.error(`Failed to get resource at ${resourcePath}:`, error);
    throw error;
  }
}

// Update (PUT)
export async function updateResource(resourcePath: string, data: any) {
  try {
    const response = await apiClient.put(resourcePath, data);
    return response.data;
  } catch (error) {
    console.error(`Failed to update resource at ${resourcePath}:`, error);
    throw error;
  }
}

// Delete (DELETE)
export async function deleteResource(resourcePath: string) {
  try {
    const response = await apiClient.delete(resourcePath);
    return response.data;
  } catch (error) {
    console.error(`Failed to delete resource at ${resourcePath}:`, error);
    throw error;
  }
}
// Refresh token function
export async function refreshToken() {
  const token = getAuthToken();

  if (!token) {
    throw new Error("No token found to refresh");
  }

  try {
    const response = await createResource("/auth/me", { token });
    if (response && response.token) {
      setAuthToken(response.token);
      return response.token;
    }
    throw new Error("Failed to refresh token");
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error;
  }
}
