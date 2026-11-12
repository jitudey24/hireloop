import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

import { roleField } from "./auth-fields";

const client = new MongoClient(process.env.BETTER_AUTH_MONGODB_URL as string);
const db = client.db('hireloop');

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  user: {
       additionalFields: {
          role: roleField,
        }
    },
  database: mongodbAdapter(db, {
    client,
  }),
});
