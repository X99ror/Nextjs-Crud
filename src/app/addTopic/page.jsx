'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddTopic() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !description) {
            alert("Title and Description are required");
            return;
        }

        try {
            const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
            
            const res = await fetch('/api/topics', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, description }),
            });

            if (res.ok) {
                router.push('/');
            } else {
                const errorData = await res.json();
                console.error('Error response:', errorData);
                alert('Failed to add a topic: ' + errorData.error || 'Unknown error');
            }
        } catch (error) {
            console.error('Network error:', error);
            alert('Network error: Could not connect to the server.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className="text-blue-500 border border-slate-500 px-8 py-2"
                type="text"
                placeholder="Topic Title"
            />
            <input
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className="text-blue-500 border border-slate-500 px-8 py-2"
                type="text"
                placeholder="Topic Description"
            />
            <button className="bg-green-500 font-bold text-white py-3 px-6 w-fit">
                Add Topic
            </button>
        </form>
    );
}
