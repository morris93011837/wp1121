"use client";

import { useRouter } from "next/navigation";

import useUserInfo from "@/hooks/useUserInfo";

export default function ProfileButton() {
  const { username } = useUserInfo();
  const router = useRouter();

  return (
    <div className="flex">
      <p className="items-center p-4 w-40 max-lg:hidden font-bold text-2xl">{username ?? "..."}</p>
      <button
      className="items-center gap-2 rounded-full p-2 text-center transition-colors my-4
                 border border-black border-solid duration-300 hover:bg-gray-200 ml-auto mr-4"
      // go to home page without any query params to allow the user to change their username and handle
      // see src/components/NameDialog.tsx for more details
      onClick={() => router.push("/")}
      >
        <div className="w-32 max-lg:hidden">
          <p>切換使用者</p>
        </div>
      </button>
    </div>
  );
}
