import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const client = await clientPromise;
    const db = client.db();

    console.log("Session User ID:", session.user.id);

    const projects = await db
      .collection("projects")
      .find({ userId: new ObjectId(session.user.id) }) // Ensure session.user.id is valid
      .toArray();

    const projectIds = projects.map((project) => project._id); // Extract project IDs
    const tasks = await db
      .collection("tasks")
      .find({ projectId: { $in: projectIds.map((id) => new ObjectId(id)) } }) // Use $in to find tasks linked to projects
      .toArray();

    const projectsWithTasks = projects.map((project) => ({
      ...project,
      tasks: tasks.filter(
        (task) => task.projectId.toString() === project._id.toString()
      ),
    }));

    return NextResponse.json(projectsWithTasks);
  } catch (error) {
    console.error("Error retrieving projects:", error);
    return NextResponse.json(
      { error: "Failed to retrieve projects" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, description, deadline, category } = await req.json();

  console.log("Creating project for User ID:", session.user.id);

  try {
    const client = await clientPromise;
    const db = client.db();

    const result = await db.collection("projects").insertOne({
      title,
      description,
      category,
      deadline: new Date(deadline),
      userId: new ObjectId(session.user.id),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({ id: result.insertedId });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
