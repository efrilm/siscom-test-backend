import { PartialType } from '@nestjs/swagger';
import { CreateCategoryReqDto } from './create-category.req.dto';

export class UpdateCategoryReqDto extends PartialType(CreateCategoryReqDto) {}
