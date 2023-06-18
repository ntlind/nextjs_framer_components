import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "./clientApp";

export default function handleAuth() {
  const router = useRouter();
  // @ts-ignore
  const [user, loading, error] = useAuthState(firebase.auth());

  const current_path = router.pathname;
  if (loading == false && user == null && current_path != "/auth") {
    router.push("/auth");
  } else {
    return user;
  }
}
