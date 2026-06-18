import type { ErrorResponse } from "../types";

export class ApiError extends Error {
  status: "error";
  errors?: string[];
  statusCode: number;

  constructor(message: string, statusCode: number, errors?: string[]) {
    super(message);
    this.name = "ApiError";
    this.status = "error";
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

const BASE_URL = (
  import.meta.env.VITE_API_URL || "https://engagement-invite-api.vercel.app"
).replace(/\/$/, "");

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let errorData: ErrorResponse | null = null;
    try {
      errorData = await response.json();
    } catch {
      // Fallback if parsing fails
    }

    const errorMessage =
      errorData?.message || `HTTP error! status: ${response.status}`;
    const errors =
      errorData?.errors || (errorData?.error ? [errorData.error] : undefined);
    throw new ApiError(errorMessage, response.status, errors);
  }

  // Handle empty responses or non-JSON if any
  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    // If not json but successful
    return {} as T;
  }

  try {
    return await response.json();
  } catch (err) {
    throw new Error("Failed to parse response as JSON", { cause: err });
  }
}

export const apiClient = {
  async get<T>(path: string, options?: RequestInit): Promise<T> {
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    const response = await fetch(`${BASE_URL}${cleanPath}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        ...options?.headers,
      },
      ...options,
    });
    return handleResponse<T>(response);
  },

  async post<T>(
    path: string,
    body?: unknown,
    options?: RequestInit,
  ): Promise<T> {
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    const response = await fetch(`${BASE_URL}${cleanPath}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...options?.headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      ...options,
    });
    return handleResponse<T>(response);
  },
};
