import { NextFunction, Request, Response } from "express";
import CustomError from "../utils/error";
import { UserRepository } from "../repository/user.repository";
import {
  EMAIL_ALREADY_EXIST,
  INVALID_OTP,
  INVALID_USER,
  PHONE_ALREADY_EXIST,
  SUCCESSFULLY_VERFIED,
  USER_CREATED_SUCCESSFULLY,
} from "../utils/constants";
import { generateHashedPassword } from "../utils/hashing";
import User from "../entities/User";

async function signUp(req: Request, res: Response, next: NextFunction) {
  try {
    const { firstName, lastName, email, phone, password } = req.body;
    const isUserEmailExist = await UserRepository.findByEmail(email);
    const isUserPhoneExist = await UserRepository.findByPhone(phone);
    if (isUserEmailExist) {
      throw new CustomError(EMAIL_ALREADY_EXIST, 409).errorInstance();
    }
    if (isUserPhoneExist) {
      throw new CustomError(PHONE_ALREADY_EXIST, 409).errorInstance();
    }
    const hashedPassword = await generateHashedPassword(password);
    const otp = +UserRepository.generateOtp();
    const user: User = UserRepository.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      isVerified: false,
      otp: otp,
      phone,
    });
    await UserRepository.save(user);
    UserRepository.sendOtp(email, `Otp is ${otp}`);
    res.status(201).json({
      message: USER_CREATED_SUCCESSFULLY,
      user: {
        email,
        firstName,
        lastName,
        isVerified: user.isVerified,
        phone,
      },
    });
  } catch (error) {
    const errors = {
      status: CustomError.getStatusCode(error),
      message: CustomError.getMessage(error),
    };
    next(errors);
  }
}

async function verifyOtp(req: Request, res: Response, next: NextFunction) {
  try {
    const { otp, email } = req.body;
    const user: User = await UserRepository.findByEmail(email);
    if (!user) {
      throw new CustomError(INVALID_USER, 400).errorInstance();
    }
    if (user.otp !== otp) {
      throw new CustomError(INVALID_OTP, 400).errorInstance();
    }
    user.isVerified = true;
    await UserRepository.save(user);
    const body = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      isVerified: user.isVerified,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    };
    let token = UserRepository.generateToken(body);
    res.status(200).json({ message: SUCCESSFULLY_VERFIED, user: body, token });
  } catch (error) {
    const errors = {
      status: CustomError.getStatusCode(error),
      message: CustomError.getMessage(error),
    };
    next(errors);
  }
}

export default { signUp, verifyOtp };
