import { defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage({
  name: "studious-lamp-storage",
  access: (allow) => ({
    "news-files/{entity_id}/*": [
      allow.guest.to(["read"]),
      allow.entity("identity").to(["read", "write", "delete"]),
      allow.authenticated.to(["read", "write"]),
    ],
  }),
});
