"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditTopicForm({ id, title, description }) {
  const router = useRouter();
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newTitle || !newDescription) {
      alert("Title and description cannot be empty");
      return;
    }

    try {
      console.log("Updating topic with ID:", id);
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
      const res = await fetch(`${baseUrl}/api/topics/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newTitle, description: newDescription }),
      });

      const data = await res.json(); 
      console.log("API Response:", data);

      if (!res.ok) {
        throw new Error(data.message || "Failed to update Topic");
      }

      router.push("/");
    } catch (error) {
      console.error("Error updating topic:", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        className="text-blue-500 border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Topic Title"
      />
      <input
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
        className="text-blue-500 border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Topic Description"
      />
      <button
        type="submit"
        className="bg-green-500 font-bold text-white py-3 px-6 w-fit"
      >
        Update Topic
      </button>
    </form>
  );
}
