const API_BASE_URL = import.meta.env.VITE_API_URL;

import type { HealthResponse } from './types/api';

export class ApiError extends Error {
    public status: number;

    constructor(status: number, message: string) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
    }
}

async function makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
    });

    if (!response.ok) {
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        try {
            const errorBody = await response.json();
            if (errorBody && errorBody.message) {
                errorMessage = errorBody.message;
            }
        } catch {
            // Not a JSON response, fall back to the default message
        }
        throw new ApiError(response.status, errorMessage);
    }

    return response.json();
}

export const api = {
    // Health check endpoint
    health: {
        check: async (): Promise<HealthResponse> => {
            return makeRequest<HealthResponse>('/health');
        },
    },
};

export type { HealthResponse };