import { connectDB } from "@/lib/config/db";
import TodoModel from "@/lib/models/todo.model";
import { NextResponse, NextRequest } from "next/server";

const loadDB = async () => {
  await connectDB();
};

loadDB();

export async function GET(req: NextRequest) {
  const todos = await TodoModel.find({});

  return NextResponse.json({
    todos: todos,
  });
}

export async function POST(req: NextRequest) {
  const { title, description } = await req.json();

  await TodoModel.create({ title, description });

  return NextResponse.json({
    message: "Todo Created",
  });
}

export async function DELETE(req: NextRequest) {
  const mongoId = await req.nextUrl.searchParams.get("mongoId");

  await TodoModel.findByIdAndDelete(mongoId);

  return NextResponse.json({
    message: "Todo Deleted",
  });
}

export async function PUT(req: NextRequest) {
  const mongoId = await req.nextUrl.searchParams.get("mongoId");

  await TodoModel.findByIdAndUpdate(mongoId, {
    $set: {
      isCompleted: true,
    },
  });

  return NextResponse.json({
    message: "Todo Completed",
  });
}
