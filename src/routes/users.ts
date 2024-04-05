import express, { Request, Response } from "express";
import usersController from "../controllers/usersController";
import validations from "./../validations";
import validationMiddleware from "../middlewares/validationMiddleware";
const router = express.Router();

/**
 * @openapi
 * '/api/users':
 *  post:
 *     tags:
 *     - Users
 *     summary: Create a new user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - firstName
 *              - lastName
 *              - email
 *              - phone
 *              - password
 *            properties:
 *              firstName:
 *                type: string
 *              lastName:
 *                type: string
 *              email:
 *                type: string
 *              phone:
 *                type: string
 *              password:
 *                type: string
 *     responses:
 *      201:
 *        description: User Created Success
 *      400:
 *        description: Fields Empty
 *      409:
 *        description: User Already Exist
 *      500:
 *        description: Server Error
 */
router.post(
  "/",
  validations.signupValidator,
  validationMiddleware,
  usersController.signUp
);

/**
 * @openapi
 * '/api/users/verify':
 *  post:
 *     tags:
 *     - Users
 *     summary: Verify Otp
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - otp
 *              - email
 *            properties:
 *              otp:
 *                type: number
 *              email:
 *                type: string
 *     responses:
 *      200:
 *        description: Successfully Verfied
 *      404:
 *        description: Fields should not be empty
 *      400:
 *        description: Invalid otp or email
 *      500:
 *        description: Server Error
 */
router.post(
  "/verify",
  validations.otpValidator,
  validationMiddleware,
  usersController.verifyOtp
);

export default router;
