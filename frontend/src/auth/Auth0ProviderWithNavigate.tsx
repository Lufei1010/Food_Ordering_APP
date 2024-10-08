import {AppState, Auth0Provider, User} from "@auth0/auth0-react"

type Props = {
  children: React.ReactNode;
//   wrap all component so that can get access to auth0 if needs
}

const Auth0ProviderWithNavigate = ({children}: Props) => {
    const domain = import.meta.env.VITE_AUTH0_DOMAIN;
    // It lets you change configurations easily without altering code, 
    // keeping sensitive data secure and enabling quick environment or account updates.
    const clientID = import.meta.env.VITE_AUTH0_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;
    // these three lines are we need whenever we initialize the SDK

    if (!domain || !clientID || !redirectUri) {
        throw new Error("unable to initialize auth")
    }
    const onRedirectCallback = (appState?: AppState, user?: User) => {
        console.log("USER", user);
        }
    return (
        <Auth0Provider domain={domain} clientId={clientID} 
        authorizationParams={{redirectUri: redirectUri,}}
        onRedirectCallback={onRedirectCallback}
        >
            {children}
        </Auth0Provider>
    )
}

export default Auth0ProviderWithNavigate;