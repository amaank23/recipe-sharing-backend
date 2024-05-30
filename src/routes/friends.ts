import express from "express";
import authMiddleware from "../middlewares/authMiddleware";
import friendsController from "../controllers/friendsController";

const router = express.Router();

router.post("/request", authMiddleware, friendsController.sendFriendRequest);

router.patch("/accept", authMiddleware, friendsController.acceptFriendRequest);

router.patch("/reject", authMiddleware, friendsController.rejectFriendRequest);

router.get("/requests", authMiddleware, friendsController.getAllFriendRequests);

router.get("/", authMiddleware, friendsController.getAllFriends);

router.get("/check/:friendId", authMiddleware, friendsController.checkIfFriend);

export default router;
