import { PartialType } from '@nestjs/swagger';
import { CreateItemReqDto } from './create-item.req.dto';

export class UpdateItemReqDto extends PartialType(CreateItemReqDto) {}
