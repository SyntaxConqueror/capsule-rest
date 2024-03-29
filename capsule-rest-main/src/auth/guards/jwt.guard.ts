import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtGuard extends AuthGuard('jwt') implements CanActivate{
    
    canActivate(context: ExecutionContext) {
        return super.canActivate(context);
    }
    
    handleRequest(err, user, info) {
        if (err || !user) {
          throw err || new UnauthorizedException('Unauthorized');
        }
        return user;
    }
}
