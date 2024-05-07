// swiftchat.module.ts

import { Module } from '@nestjs/common';
import { SwiftchatMessageService } from './swiftchat.service';
import { MessageModule } from 'src/message/message.module'; // Correct the import path as necessary
import { BhagavadService } from './bhagavad.service';

@Module({
  imports: [MessageModule], // Import MessageModule
  providers: [BhagavadService,SwiftchatMessageService],
  exports: [SwiftchatMessageService],
})
export class SwiftchatModule {}
