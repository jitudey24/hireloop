import { createAuthClient } from "better-auth/react"
import { inferAdditionalFields } from "better-auth/client/plugins"

import { roleField } from "./auth-fields"

export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: process.env.BETTER_AUTH_URL,
    // Tells the client about the extra `role` field on the user model so
    // `authClient.signUp.email({ ..., role })` is typed and inferable.
    plugins: [
        inferAdditionalFields({
            user: {
                role: roleField,
            },
        }),
    ],
})


export const { signIn, signUp,signOut, useSession } = authClient
