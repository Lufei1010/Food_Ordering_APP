import { Request, Response, NextFunction } from "express";
import { auth } from "express-oauth2-jwt-bearer";
import jwt from "jsonwebtoken";
import User from "../models/user";

declare global {
  namespace Express {
    interface Request {
      auth0Id?: string;
      userId?: string;
    }
  }
}

export const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: "RS256",
});
//check the authorization header for the bearer token(frontend has bearer token),
// then it connects to the server to verify the token we get in the request belongs to a logged in user
//add these to the MyUserRoute.

export const jwtParse = async (
  req: Request,
  res: Response,
  next: NextFunction) => {
    const { authorization } = req.headers;

    //Bearer lsjadoejedshjjljgionnfdsgh
    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.sendStatus(401);
    }

    const token = authorization.split(" ")[1]; //Bearer lsjadoejedshjjljgionnfdsgh --become two item seprately
   
    try {
      const decoded = jwt.decode(token) as jwt.JwtPayload;
      const auth0Id = decoded.sub;

      const user = await User.findOne({ auth0Id });

      if(!user) {
        return res.sendStatus(401);
      }

      req.auth0Id = auth0Id as string;  
      req.userId = user._id.toString();
      next(); // it is gonna call the updateCurrentUser in Controller
    } catch (error) {
      return res.sendStatus(401)
    }
  };
   // these code above use in controller but these logic repeated for every single request Handler so build it separately.
