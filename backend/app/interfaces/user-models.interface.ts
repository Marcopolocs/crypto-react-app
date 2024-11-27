import mongoose from "mongoose";

export interface IUserSchema {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string | undefined;
  activeAccount: boolean;
  validateClientSentPassword: (
    clientSentPassword: string,
    userPassword: string,
  ) => Promise<boolean>;
}

export interface IUserWithIdMongooseDocument
  extends IUserSchema,
    mongoose.Document {
  _id: string;
}

export type IFilteredUserData = Omit<
  IUserSchema,
  "validateClientSentPassword" | "password" | "passwordConfirm"
> & {
  _id: string;
};

export interface IUserDataResponse {
  status: string;
  message?: string;
  data: IFilteredUserData;
}
