import { Module } from '@nestjs/common';
import { CapsulesController } from './capsules.controller';

@Module({
    controllers: [CapsulesController]
})
export class CapsulesModule {}
