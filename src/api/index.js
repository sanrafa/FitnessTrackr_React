export function setHeaders(token) {
  if (token) {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  } else {
    return {
      "Content-Type": "application/json",
    };
  }
}

// Use to re-export api files
export * from "./routines";
export * from "./activities";
export * from "./users";
export * from "./routine_activities";
