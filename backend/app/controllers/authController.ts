import { CookieOptions, NextFunction, Response } from "express";
import { User } from "../mongoose-models/userModel";
import {
  ILoginRequestSchema,
  loginRequestSchema,
} from "../zod-schemas/login-request-schema";
import {
  ISignupRequestSchema,
  signupRequestSchema,
} from "../zod-schemas/signup-request-schema";
import { TypedRequestBody } from "../interfaces/generic-http-types.interface";
import jwt from "jsonwebtoken";
import {
  IFilteredUserData,
  IUserDataResponse,
  IUserWithIdMongooseDocument,
} from "../interfaces/user-models.interface";
import {
  IUserCredentialsValidationSchema,
  userCredentialsValidationSchema,
} from "../zod-schemas/user-credentials-validation-schema";

// TODO fix the process.env as it does not recognize the values
const jwtCookieExpiresIn: string = process.env.JWT_COOKIE_EXPIRES_IN || "7";
const jwtSecretExpiresIn: string = process.env.JWT_EXPIRES_IN || "7d";
const jwtSecret: string | undefined =
  process.env.JWT_SECRET || "SUPER_SECRET_JWT";

const signToken = (id: string): string => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: jwtSecretExpiresIn,
  });
};

const createSendToken = (user: IFilteredUserData, res: Response): void => {
  const token = signToken(user._id);

  const cookieOptions: CookieOptions = {
    expires: new Date(Date.now() + +jwtCookieExpiresIn * 24 * 60 * 60 * 1000),
    httpOnly: true,
    // TODO set this to true later
    secure: false,
  };
  res.cookie("jwt", token, cookieOptions);

  const userResponseData: IUserDataResponse = {
    status: "success",
    data: {
      _id: user._id,
      username: user.username,
      email: user.email,
      activeAccount: user.activeAccount,
    },
  };
  res.status(200).json(userResponseData);
};

export const login = async (
  req: TypedRequestBody<ILoginRequestSchema>,
  // TODO need the type here later (openapi)
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = loginRequestSchema.safeParse(req.body);
    if (!result.success) {
      // TODO handle error
    }

    const { email } = req.body;

    const user: IUserWithIdMongooseDocument | null = await User.findOne({
      email,
    }).select("+password");

    if (
      !user ||
      !(await user.validateClientSentPassword(req.body.password, user.password))
    ) {
      // TODO handle error
    } else {
      const { password, ...userData } = user.toObject();
      createSendToken(userData, res);
    }
  } catch (error) {}
};

export const signup = async (
  req: TypedRequestBody<ISignupRequestSchema>,
  res: Response,
  next: NextFunction,
) => {
  const result = signupRequestSchema.safeParse(req.body);
  if (!result.success) {
    // TODO handle error
  }

  try {
    await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    res.status(201).json({
      status: "success",
      message: "User created successfully",
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  }
};

export const validateUsername = async (
  req: TypedRequestBody<IUserCredentialsValidationSchema>,
  res: Response,
) => {
  const result = userCredentialsValidationSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).send({
      error: "User credential is required.",
    });
  }

  try {
    const user = await User.findOne({ username: req.body.userCredential });
    if (user) {
      throw new Error(
        "This username already exists. Please login or use another username.",
      );
    }
    res.status(200).send({ message: "Valid credentials" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({ error: error.message });
    }
  }
};

export const validateUserEmail = async (
  req: TypedRequestBody<IUserCredentialsValidationSchema>,
  res: Response,
) => {
  const result = userCredentialsValidationSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).send({
      error: "User credential is required.",
    });
  }

  try {
    const user = await User.findOne({ email: req.body.userCredential });
    if (user) {
      throw new Error(
        "This email address already exists. Please login or use another email.",
      );
    }
    res.status(200).send({ message: "Valid credentials" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send({ error: error.message });
    }
  }
};

// TODO implement these functions
export const logout = async () => {};
