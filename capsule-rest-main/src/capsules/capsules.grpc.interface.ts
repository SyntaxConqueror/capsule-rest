import { Observable } from 'rxjs';
import { Capsule } from './schemas/capsule.schema';


export interface ICapsulesGrpcService {
  findOne(id: Id);
  findAll({});
  create (capsule: Capsule): Capsule;
  update(data: {id: String, capsule: Capsule});
  remove(id: Id):Capsule;
}


interface Id {
  id: String;
}


