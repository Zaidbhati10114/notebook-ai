import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <SignUp />
      <h1 className="text-center text-violet-600 py-4">Copyright@Zaid 2023</h1>
    </div>
  );
}
