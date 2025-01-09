import { pathMatch } from "./pathUtil";

console.log(
  "%c Line:4 🍿",
  "background:#4fff4B",
  pathMatch("/users/:id", "/users/123")
);
