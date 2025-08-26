import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from './api';

export default function Home() {
    const [user, setUser] = useState<{ id: string; email: string } | null>(null);
    const navigate = useNavigate();

    return (
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow text-center">
            <h1 className="text-2xl font-semibold mb-2">Home</h1>
        </div>
    );
}


