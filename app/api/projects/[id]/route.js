import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { authOptions } from "@/lib/auth"; 

export async function GET(req, { params }) {
  const session = await getServerSession(authOptions); 
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = params; 

  try {
    const client = await clientPromise;
    const db = client.db();
    const project = await db.collection("projects").findOne({
      _id: new ObjectId(id),
      userId: new ObjectId(session.user.id),
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error("Error retrieving project:", error);
    return NextResponse.json(
      { error: "Failed to retrieve project" },
      { status: 500 }
    );
  }
}
