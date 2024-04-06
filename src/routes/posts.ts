import express from "express";
import PostController from "../controllers/PostController";
import authMiddleware from "../middlewares/authMiddleware";
import fileUpload from "express-fileupload";
const router = express.Router();

/**
 * @openapi
 *  components:
 *    securitySchemes:
 *      bearerAuth:
 *        type: http
 *        scheme: bearer
 *        bearerFormat: JWT
 * '/api/posts':
 *  post:
 *     tags:
 *     - Posts
 *     summary: Create a new post
 *     requestBody:
 *      content:
 *        multipart/form-data:
 *           schema:
 *            type: object
 *            properties:
 *              postContent:
 *                type: string
 *              images:
 *                type: array
 *                items:
 *                  type: string
 *                  format: binary
 *     security:
 *       - bearerAuth: []
 *     responses:
 *      201:
 *        description: Post Created
 *      400:
 *        description: Fields Empty
 *      500:
 *        description: Server Error
 */
router.post("/", authMiddleware, fileUpload(), PostController.create);

export default router;
