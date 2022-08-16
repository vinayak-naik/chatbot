import { Request, Response } from "express";
import { omit } from "lodash";
import { createUser, findUser } from "../service/authService/user.service";
import { createAdmin, findAdmin } from "../service/authService/admin.service";
import log from "../logger";

export const createUserHandler=async(req: Request, res: Response)=>{
  try {

    const existingUser = await findUser({email:req.body.email});
    if (existingUser) {
      return res.status(409).send('Email Already Exists');
    } else {
      const user = await createUser(req.body);
      return res.send(omit(user.toJSON(), "password"));
    }
  } catch (e:any) {
    log.error(e);
    return res.status(409).send(e.message);
  }
}
// ===================================ADMIN==============================
export const createAdminHandler=async(req: Request, res: Response)=>{
  try {

    const existingAdmin = await findAdmin({email:req.body.email});
    if (existingAdmin) {
      return res.status(409).send('Email Already Exists');
    } else {
      const admin = await createAdmin(req.body);
      return res.send(omit(admin.toJSON(), "password"));
    }
  } catch (e:any) {
    log.error(e);
    return res.status(409).send(e.message);
  }
}
