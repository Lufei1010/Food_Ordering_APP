import { auth } from "express-oauth2-jwt-bearer"

export const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: "RS256",
});
//check the authorization header for the bearer token(frontend has bearer token),
// then it connects to the server to verify the token we get in the request belongs to a logged in user
//add these to the MyUserRoute.
