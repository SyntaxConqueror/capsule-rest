import { User } from "../user.schema";

export default interface UserSearchResult {
    hits: {
      total: number;
      hits: Array<{
        _source: User;
      }>;
    };
  }