import { ApiProperty } from '@nestjs/swagger';
import { ItemResDto } from './item.res.dto';

export class PaginatedItemResDto {
  @ApiProperty({
    description: 'Data Barang',
    type: [ItemResDto],
  })
  data: ItemResDto[];

  @ApiProperty({
    description: 'Total jumlah barang',
    example: 100,
  })
  total: number;

  @ApiProperty({
    description: 'Halaman saat ini',
    example: 1,
  })
  page: number;

  @ApiProperty({
    description: 'Batas jumlah barang per halaman',
    example: 10,
  })
  limit: number;

  @ApiProperty({
    description: 'Jumlah halaman',
    example: 10,
  })
  totalPages: number;
}
