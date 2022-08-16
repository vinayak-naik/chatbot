import { get } from "lodash";
import { Request, Response, NextFunction } from "express";
import { decode } from "../utils/jwt.utils";
import { reIssueAccessToken } from "../service/sessionService/userSession.service";
import log from "../logger";

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const role = get(req, "headers.role");
  const accessToken = get(req, "headers.authorization", "").replace(
    /^Bearer\s/,
    ""
  );
  log.info(`${req.method + req.url}`);

  const refreshToken = get(req, "headers.x-refresh");

  if (!accessToken) return next();

  const { decoded, expired } = decode(accessToken);

  
  if (decoded) {
    if (role=="admin") {
      
    // @ts-ignore
    req.admin = decoded;
    } else if(role==="user"){
      
    // @ts-ignore
    req.user = decoded;
    }

    return next();
  }
  if (expired) {
    if (refreshToken) {
      const newAccessToken = await reIssueAccessToken({ refreshToken });

      if (newAccessToken) {
        // Add the new access token to the response header
        res.setHeader("x-access-token", newAccessToken);

        const { decoded } = decode(newAccessToken);

        if (role=="admin") {
          // @ts-ignore
          req.admin = decoded;
          } else if(role==="user"){
          // @ts-ignore
          req.user = decoded;
          }
      }

      return next();
    } else {
      res
        .json({ errorMessage: "JWT Expired and No Refresh Token" })
        .status(401);
      return;
    }
  }

  return next();
};

export default deserializeUser;
