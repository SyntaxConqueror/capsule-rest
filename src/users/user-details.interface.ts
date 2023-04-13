import { PublicFile } from "src/files/entities/publicFile.schema";


export interface UserDetails{
    id: string,
    name: string,
    email: string,
    avatar: PublicFile
}