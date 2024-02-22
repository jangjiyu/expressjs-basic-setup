import { Router } from "express";
import { UserService } from "./users.service";

const router = Router();
const userService = new UserService();

// router.get("/", userService.getUser);
// router.post("/", userService.createUser);
// router.put("/", userService.updateUser);
// router.delete("/", userService.deleteUser);

export default router;
