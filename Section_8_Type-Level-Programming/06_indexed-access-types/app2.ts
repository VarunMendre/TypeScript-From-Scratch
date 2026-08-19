const roles = ["admin", "user", "guest"] as const;

const permission = {
  admin: "Do Everything",
  user: "Can view & edit",
  guest: "View only",
} as const;

// type TR = (typeof roles)[number]; // 1st way

// 2nd way
type TP = typeof permission;
type TR = keyof TP;

function getPermission(role: TR) {
  return permission[role];
}

getPermission("admin"); // will get only suggestion of : "admin" | "user" | "guest"


