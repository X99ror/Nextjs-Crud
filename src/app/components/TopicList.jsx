import Link from "next/link";
import RemoveBtn from "./Removebtn";
import { HiPencilAlt } from "react-icons/hi";

const getTopics = async () => {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
        const res = await fetch(`${baseUrl}/api/topics`, { cache: "no-store" });
        if (!res.ok) {
            throw new Error('Failed to fetch topics');
        }
        return await res.json();
    } catch (error) {
        console.error("Error in loading topics:", error);
        return { topics: [] };
    }
};

export default async function TopicList() {
    const { topics = [] } = (await getTopics()) || {};

    return (
        <>
            {topics.length > 0 ? (
                topics.map((t) => (
                    <div 
                        key={t._id} 
                        className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
                    >
                        <div>
                            <h2 className="font-bold text-2xl">{t.title}</h2>
                            <div>{t.description}</div>
                            <div className="flex gap-2"> 
                                <RemoveBtn id={t._id} />
                                <Link href={`/editTopic/${t._id}`}>
                                    <HiPencilAlt size={24} />
                                </Link>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>No topics available.</p>
            )}
        </>
    );
}
