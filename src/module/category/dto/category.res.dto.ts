import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CategoryResDto {
  @ApiProperty({
    description: 'Kategori ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @Expose()
  id: string;

  @ApiProperty({
    description: 'Nama Kategori',
    example: 'Elektronik',
  })
  @Expose()
  name: string;

  @ApiProperty({
    description: 'Tanggal dibuat',
    example: '2024-01-15T10:30:00Z',
  })
  @Expose()
  created_at: Date;

  @ApiProperty({
    description: 'Tanggal diperbarui',
    example: '2024-01-15T10:30:00Z',
  })
  @Expose()
  updated_at: Date;
}
