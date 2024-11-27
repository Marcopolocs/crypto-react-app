import * as mongoose from "mongoose";
import bcrypt from "bcrypt";
import { IUserSchema } from "../interfaces/user-models.interface";

const userSchema = new mongoose.Schema<IUserSchema>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    lowerCase: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: true,
    validate: {
      validator: function (this: IUserSchema, el: string): boolean {
        return el === this.password;
      },
      message: "Passwords do not match!",
    },
  },
  activeAccount: {
    type: Boolean,
    default: true,
  },
});

userSchema.pre("save", async function (next): Promise<void> {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.validateClientSentPassword = async function (
  clientSentPassword: string,
  userPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(clientSentPassword, userPassword);
};

export const User = mongoose.model<IUserSchema>("User", userSchema);
