import { useRouter } from "next/navigation";

export default function useRedirectToHome() {
  const router = useRouter();
  return () => router.push("/");
}
