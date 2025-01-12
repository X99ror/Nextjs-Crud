import EditTopicForm from "@/app/components/EditTopicForm";

const getTopicbyID = async (id) => {
  try {
    const res = await fetch(`http://localhost:3001/api/topics/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch topic");
    }
    const data = await res.json(); 
    return data; 
  } catch (error) {
    console.error("Error fetching topic by ID:", error);
    return null;
  }
};

export default async function EditTopic({ params }) {
  const { id } = params;

  if (!id) {
    console.error("ID not found in params:", params);
    return <div>Error: Invalid ID</div>;
  }

  const data = await getTopicbyID(id); 

  if (!data || !data.topic) {
    console.error("Failed to fetch topic or topic is null:", data);
    return <div>Error: Could not fetch topic</div>;
  }

  const { title, description } = data.topic;

  return (
    <EditTopicForm
      id={id}
      title={title}
      description={description}
    />
  );
}
