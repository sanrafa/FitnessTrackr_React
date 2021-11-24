export function setHeaders() {
  let localToken = localStorage.getItem("token");
  let sessionToken = sessionStorage.getItem("token");
  if (localToken || sessionToken) {
    localToken
      ? {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localToken}`,
        }
      : {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionToken}`,
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
