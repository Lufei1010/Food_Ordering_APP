import { useCreateMyUser } from "@/api/MyUserApi";
import { AppState, Auth0Provider, User } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
  // wrap all components so they can get access to auth0 if needed
};

const Auth0ProviderWithNavigate = ({ children }: Props) => {
  const navigate = useNavigate();
  // calls the custom hook defined in the API

  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  // It lets you change configurations easily without altering code,
  // keeping sensitive data secure and enabling quick environment or account updates.
  const clientID = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;
  // these three lines are needed whenever we initialize the SDK

  if (!domain || !clientID || !redirectUri) {
    throw new Error("Unable to initialize Auth0");
  }

  // Auth0 Callback Handling
  const onRedirectCallback = (appState?: AppState, user?: User) => {
    console.log("USER", user);
    // Creating a User
    navigate("/auth-callback");
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientID}
      authorizationParams={{ redirectUri: redirectUri }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithNavigate;
