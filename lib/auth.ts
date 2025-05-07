import bcrypt from "bcryptjs";
import prisma from "./prisma";
import { createSession, generateSessionToken } from "./session";

export const auth = async () => {
  //Check session cookie
  //Check session database
  //Provide user to session context
};

export const signin = async (
  credentials?: { username: string; password: string },
) => {
  if (credentials) {
    const { username, password } = credentials;

    let user = await prisma.users.findUnique({ where: { username: username } });

    if (user == null) {
      throw new Error("Wrong username or password");
    }

    if (!await bcrypt.compare(password, user.password)) {
      throw new Error("Wrong username or password");
    }

    const token = generateSessionToken();
    await createSession(token, user.id);

    return { user, token };
  }

  throw new Error("Not yet implemented");
};

export const signout = async () => {
  //remove session
};
