import { adminAPI } from "./admins";
import { UserAPI } from "./users";

export const API = {
  ...adminAPI,
  ...UserAPI,
};
