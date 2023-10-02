import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { eq, and } from "drizzle-orm";
import { $notes } from "@/lib/db/schema";
import { redirect } from "next/navigation";
import React from "react";
import { clerk } from "@/lib/clerk-server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import TipTapEditor from "@/components/TipTapEditor";
import DeleteButton from "@/components/DeleteButton";
//import { clerk } from "@/lib/clerk-server";

type Props = {
  params: {
    noteId: string;
  };
};

const NotebookPage = async ({ params: { noteId } }: Props) => {
  const { userId } = await auth();
  if (!userId) {
    return redirect("/dashboard");
  }

  const user = await clerk.users.getUser(userId);

  //const user = await clerk.users.getUser(userId);

  const notes = await db
    .select()
    .from($notes)
    .where(and(eq($notes.id, parseInt(noteId)), eq($notes.userId, userId)));

  if (notes.length != 1) {
    return redirect("/dashboard");
  }

  const note = notes[0];

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="border shadow-xl border-stone-200 rounded-lg p-4 flex items-center">
          <Link href="/dashboard">
            <Button size="sm" className="bg-violet-700">
              <ArrowLeft className="mr-1 w-4 h-4" />
              Back
            </Button>
          </Link>
          <div className="w-3"></div>
          <span className="font-semibold capitalize">
            {user.firstName} {user.lastName}
          </span>
          <span className="inline-block mx-1">/</span>
          <span className="text-stone-500 font-semibold">{note.name}</span>
          <div className="ml-auto">
            <DeleteButton noteId={note.id} />
          </div>
        </div>
        <div className="h-4"></div>
        {/* Editor */}
        <div className="border-stone-200 shadow-xl border rounded-lg px-16 py-8 w-full">
          <TipTapEditor note={note} />
        </div>
      </div>
    </div>
  );
};

export default NotebookPage;

{
  /* <div className="max-w-4xl mx-auto">
<div className="border shadow-xl border-stone-200 rounded-lg p-4 flex items-center">
  <Link href="/dashboard">
    <Button size="sm" className="bg-violet-700">
      <ArrowLeft className="mr-1 w-4 h-4" />
      Back
    </Button>
  </Link>
  <div className="w-3"></div>
  <span className="font-semibold">
    {user.firstName} {user.lastName}
  </span>
</div>
</div> */
}
