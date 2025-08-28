import {
  IsString,
  IsNotEmpty,
  IsUUID,
  IsNumber,
  IsPositive,
  MaxLength,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateItemReqDto {
  @ApiProperty({
    description: 'Nama Barang',
    example: 'Samsung Galaxy S24',
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  item_name: string;

  @ApiProperty({
    description: 'Kategori ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID(4)
  @IsNotEmpty()
  category_id: string;

  @ApiProperty({
    description: 'Stok',
    example: 50,
    minimum: 0,
  })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  stock: number;

  @ApiProperty({
    description: 'Kelompok Barang',
    example: 'Motor',
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  item_group: string;

  @ApiProperty({
    description: 'Harga Barang',
    example: 10000,
    minimum: 0,
  })
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  price: number;
}
