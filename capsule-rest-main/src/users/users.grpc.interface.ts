import { Observable } from 'rxjs';
import { User } from './user.schema';

export interface IUsersGrpcService {
  findUser(id: Id);
  findAll({}): User;
  update(data: {id: Id, user: User}): User;
  delete(id:Id):User;
}


interface Id {
  id: String;
}


