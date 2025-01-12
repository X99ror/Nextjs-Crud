"use client";

import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";

export default function RemoveBtn({ id }) {
  const router = useRouter();

  const removeTopic = async () => {
    const confirmed = confirm('Are you sure?');

    if (confirmed) {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
        const res = await fetch(`${baseUrl}/api/topics?id=${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          router.refresh(); 
        } else {
          const errorData = await res.json();
          console.error('Failed to delete:', errorData.error || 'Unknown error');
          alert('Failed to delete the topic');
        }
      } catch (error) {
        console.error('Network error:', error);
        alert('Network error: Could not connect to the server.');
      }
    }
  };

  return (
    <button 
      onClick={removeTopic}
      className="text-red-400"
    >
      <HiOutlineTrash size={24} />
    </button>
  );
}
