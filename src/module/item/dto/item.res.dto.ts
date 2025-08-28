import { Expose, Type } from 'class-transformer';
import { CategoryResDto } from '../../category/dto/category.res.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ItemResDto {
  @ApiProperty({
    description: 'Barang ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @Expose()
  id: string;

  @ApiProperty({
    description: 'Nama Barang',
    example: 'Samsung Galaxy S24',
  })
  @Expose()
  item_name: string;

  @ApiProperty({
    description: 'Kategori ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @Expose()
  category_id: string;

  @ApiProperty({
    description: 'Stok',
    example: 50,
  })
  @Expose()
  stock: number;

  @ApiProperty({
    description: 'Kelompok barang',
    example: 'Motor',
  })
  @Expose()
  item_group: string;

  @ApiProperty({
    description: 'Harga barang',
    example: 10000,
  })
  @Expose()
  price: number;

  @ApiProperty({
    description: 'Informasi kategori',
    type: CategoryResDto,
  })
  @Expose()
  @Type(() => CategoryResDto)
  category: CategoryResDto;

  @ApiProperty({
    description: 'Tanggal dibuat',
    example: '2024-01-15T10:30:00Z',
  })
  @Expose()
  created_at: Date;

  @ApiProperty({
    description: 'Tanggal diubah',
    example: '2024-01-15T10:30:00Z',
  })
  @Expose()
  updated_at: Date;
}
