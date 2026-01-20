"use client";

import { useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useAppToast } from "@/lib/useAppToast";

export default function LoginSuccessToast() {
  const params = useSearchParams();
  const router = useRouter();
  const { data: session } = useSession();
  const toast = useAppToast();

  const shownRef = useRef(false);

  useEffect(() => {
    if (
      params.get("login") === "success" &&
      session?.user &&
      !shownRef.current
    ) {
      toast.show({
        title: "Login Successful",
        message: "Welcome to PARAKRAM 👋",
        variant: "success",
      });

      shownRef.current = true;

      // remove ?login=success without reload
      router.replace("/", { scroll: false });
    }
  }, [params, session, router, toast]);

  return null;
}
