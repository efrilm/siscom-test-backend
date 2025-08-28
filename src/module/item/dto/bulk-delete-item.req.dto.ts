import { IsArray, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BulkDeleteItemReqDto {
  @ApiProperty({
    description: 'ID Barang yang akan dihapus',
    example: [
      '550e8400-e29b-41d4-a716-446655440000',
      '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
    ],
    type: [String],
  })
  @IsArray()
  @IsUUID(4, { each: true })
  ids: string[];
}
