import type { DBFieldAttribute } from "better-auth/db";

/** Roles a user can choose when creating an account. */
export const ROLE_VALUES = ["seeker", "recruiter", "admin"] as const;

export type Role = (typeof ROLE_VALUES)[number];

/**
 * Shared definition of the `role` field on the user model.
 *
 * Used by the server (`betterAuth({ user.additionalFields })`) and by the
 * auth client (`inferAdditionalFields`) so both sides stay in sync and the
 * sign-up call is typed with the `role` field.
 */
export const roleField = {
  type: [...ROLE_VALUES],
  input: true,
  defaultValue: "seeker",
} satisfies DBFieldAttribute;

export function isRole(value: string): value is Role {
  return (ROLE_VALUES as readonly string[]).includes(value);
}
