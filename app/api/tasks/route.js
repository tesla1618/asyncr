import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req) {
  const session = await getServerSession(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get("projectId");

  const client = await clientPromise;
  const db = client.db();
  const tasks = await db
    .collection("tasks")
    .find({ projectId: new ObjectId(projectId) })
    .toArray();

  return NextResponse.json(tasks);
}

export async function POST(req) {
  const session = await getServerSession(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, description, estimatedCompletionDate, projectId } =
    await req.json();
  const client = await clientPromise;
  const db = client.db();

  const result = await db.collection("tasks").insertOne({
    title,
    description,
    estimatedCompletionDate: new Date(estimatedCompletionDate),
    projectId: new ObjectId(projectId),
    status: "pending",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return NextResponse.json({ id: result.insertedId });
}

export async function PUT(req) {
  const session = await getServerSession(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, status } = await req.json();
  const client = await clientPromise;
  const db = client.db();

  const result = await db
    .collection("tasks")
    .updateOne(
      { _id: new ObjectId(id) },
      { $set: { status, updatedAt: new Date() } }
    );

  return NextResponse.json({ success: result.modifiedCount === 1 });
}
