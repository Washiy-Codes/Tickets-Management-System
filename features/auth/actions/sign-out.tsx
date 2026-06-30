"use server"

import { signOut } from "@/auth"
import { homePath } from "@/paths"

export async function logoutAction() {
  await signOut({ redirectTo: homePath() })
}