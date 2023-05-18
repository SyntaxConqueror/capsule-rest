import { Observable } from 'rxjs';
import { Feedback } from './schemas/feedback.schemas';

export interface IFeedbacksGrpcService {
  findOne(id: Id): Feedback;
  findAll({});
  create(feedback: Feedback);
  toogleLike(toogleLike: toogleLike);
  update(data: {id: Id, feedback: Feedback}): Feedback;
  remove(id: Id);
}

interface toogleLike {
  feedbackID: String;
  userID: String;
}

interface Id {
  id: String;
}


