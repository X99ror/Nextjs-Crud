import dbconnect from "@/Libs/monngodb";
import { NextResponse } from "next/server";
import Topic from "@/Models/Topic";

export async function PUT(request, { params }) {
  const { id } = params;

  try {
    const { newTitle: title, newDescription: description } = await request.json();
    await dbconnect();

    const updatedTopic = await Topic.findByIdAndUpdate(
      id,
      { title, description },
      { new: true } 
    );

    if (!updatedTopic) {
      return NextResponse.json(
        { message: "Topic not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Topic Updated", topic: updatedTopic },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating topic:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}


export async function GET(request, { params }) {
  const { id } = params;

  try {
    await dbconnect();

    const topic = await Topic.findById(id);
    if (!topic) {
      return NextResponse.json(
        { message: "Topic not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ topic }, { status: 200 });
  } catch (error) {
    console.error("Error fetching topic:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
