import { defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage({
  name: "studious-lamp-storage",
  access: (allow) => ({
    "news-files/*": [
      allow.guest.to(["read"]),
      allow.entity("identity").to(["read", "write", "delete"]),
      allow.authenticated.to(["read", "write"]),
    ],
  }),
});
