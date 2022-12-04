import jwt_decode from "jwt-decode";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../utils/context/UserContext";

export default function GoogleSignin() {
  const { user, updateAuthUser } = useContext(AuthContext);
  const [gsiScriptLoaded, setGsiScriptLoaded] = useState(false);

  const handleGoogleSignIn = (res: CredentialResponse) => {
    if (!res.clientId || !res.credential) return;
    const userData = jwt_decode(res.credential);
    //@ts-ignore
    updateAuthUser(userData);
  };

  useEffect(() => {
    //  @ts-ignore
    if (user?._id || gsiScriptLoaded) return;

    const initializeGsi = () => {
      if (!window.google || gsiScriptLoaded) return;
      setGsiScriptLoaded(true);
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_CLIENT_ID,
        callback: handleGoogleSignIn,
      });
    };

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.onload = initializeGsi;
    script.async = true;
    script.id = "google-client-script";
    document.querySelector("body")?.appendChild(script);

    return () => {
      // Cleanup function that runs when component unmounts
      window.google?.accounts.id.cancel();
      document.getElementById("google-client-script")?.remove();
    };
    //@ts-ignore
  }, [handleGoogleSignIn, user?._id]);

  return <button className={"g_id_signin"} />;
}
