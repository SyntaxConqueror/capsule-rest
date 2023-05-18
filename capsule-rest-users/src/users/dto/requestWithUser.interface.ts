import { Request } from 'express';

import { UserDetails } from '../user-details.interface';


interface RequestWithUser extends Request {
  user: UserDetails;
}

export default RequestWithUser;