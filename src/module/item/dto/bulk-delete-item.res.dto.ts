import { ApiProperty } from '@nestjs/swagger';

export class BulkDeleteItemResDto {
  @ApiProperty({
    description: 'Jumlah barang yang dihapus',
    example: 5,
  })
  deletedCount: number;

  @ApiProperty({
    description: 'Pesan sukses',
    example: 'Berhasil menghapus 5 barang',
  })
  message: string;
}
