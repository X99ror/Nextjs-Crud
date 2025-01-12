import dbconnect from "@/Libs/monngodb";
import { NextResponse } from "next/server";
import Topic from "@/Models/Topic";

export async function POST(request){
    const {title,description} =await request.json();

    await dbconnect()
    await Topic.create({title,description})
    return NextResponse.json({message:"Topic Added"},{status:201})
}

export async function GET(){
    await dbconnect()
    const topics =await Topic.find()
    return NextResponse.json({topics})
}

export async function DELETE(request){
    const id = request.nextUrl.searchParams.get("id");
    await dbconnect()
    await Topic.findByIdAndDelete(id)
    return NextResponse.json({message:"Topic Deleted"},{status:200})
}