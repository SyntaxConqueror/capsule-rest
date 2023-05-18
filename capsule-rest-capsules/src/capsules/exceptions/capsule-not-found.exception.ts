// user-not-found.exception.ts
import { NotFoundException } from '@nestjs/common';

export class CapsuleNotFoundException extends NotFoundException {
    constructor() {
      super("Capsule not found in data-base");
    }
}