import { useState, useEffect } from 'react';
import { api } from './api';
import type { HealthResponse } from './types/api';

function HealthCheck() {
    const [healthData, setHealthData] = useState<HealthResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const checkHealth = async () => {
            try {
                setLoading(true);
                const data = await api.health.check();
                setHealthData(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to connect to backend');
            } finally {
                setLoading(false);
            }
        };

        checkHealth();
    }, []);

    return (
        <div className="flex flex-col items-center gap-5 p-5">
            <div>
                <span className="text-7xl">📊</span>
            </div>
            <h1 className="text-5xl font-bold mt-7 mb-4">Ranked Choice</h1>

            {/* Backend Health Check Display */}
            <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
                <h2 className="text-xl font-semibold mb-4 text-center">Backend Status</h2>

                {loading && (
                    <div className="text-center text-gray-600">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
                        Connecting to backend...
                    </div>
                )}

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-center">
                        <strong>Error:</strong> {error}
                    </div>
                )}

                {healthData && (
                    <div className="space-y-2">
                        <div className="flex justify-between gap-4">
                            <span className="font-medium">Status:</span>
                            <span className="text-green-600 font-semibold">{healthData.status}</span>
                        </div>
                        {healthData.message && (
                            <div className="flex justify-between gap-4">
                                <span className="font-medium">Message:</span>
                                <span>{healthData.message}</span>
                            </div>
                        )}
                        <div className="flex justify-between gap-4">
                            <span className="font-medium">Service:</span>
                            <span>{healthData.service}</span>
                        </div>
                        <div className="flex justify-between gap-4">
                            <span className="font-medium">Database:</span>
                            <span className={`font-semibold ${healthData.databaseStatus === 'connected' ? 'text-green-600' : 'text-red-600'}`}>{healthData.databaseStatus}</span>
                        </div>
                        <div className="flex justify-between gap-4">
                            <span className="font-medium">Timestamp:</span>
                            <span>{new Date(healthData.timestamp).toLocaleString()}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default HealthCheck; 