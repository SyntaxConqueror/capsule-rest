
import { MaxLength } from "class-validator";
import { Capsule } from "src/capsules/schemas/capsule.schema";
import { User } from "src/users/user.schema";


export class CreateFeedbackDto{
    @MaxLength(500, {message: "Your comment is too big!"})
    readonly content: string;
    readonly capsuleID: Capsule;
    readonly userID: User;
}