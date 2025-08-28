import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ItemService } from './item.service';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ItemResDto } from './dto/item.res.dto';
import { CreateItemReqDto } from './dto/create-item.req.dto';
import { PaginatedItemResDto } from './dto/paginated-item.res.dto';
import { UpdateItemReqDto } from './dto/update-item.dto';
import { BulkDeleteItemResDto } from './dto/bulk-delete-item.res.dto';
import { BulkDeleteItemReqDto } from './dto/bulk-delete-item.req.dto';

@ApiTags('Item')
@Controller({
  path: 'items',
  version: '1',
})
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  @ApiOperation({ summary: 'Buat barang baru' })
  @ApiResponse({
    status: 201,
    description: 'Barang berhasil dibuat',
    type: ItemResDto,
  })
  @ApiBadRequestResponse({
    description: 'Kesalahan validasi atau kategori tidak ditemukan',
  })
  async create(@Body() createItemDto: CreateItemReqDto): Promise<ItemResDto> {
    return this.itemService.create(createItemDto);
  }

  @Get()
  @ApiOperation({ summary: 'Ambil semua barang dengan paginasi dan filter' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    example: 'Samsung',
  })
  @ApiQuery({
    name: 'categoryId',
    required: false,
    type: String,
    format: 'uuid',
  })
  @ApiResponse({
    status: 200,
    description: 'Barang berhasil diambil',
    type: PaginatedItemResDto,
  })
  async findAll(
    @Query('page', new ParseIntPipe({ optional: true })) page: number = 1,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number = 10,
    @Query('search') search?: string,
    @Query('categoryId', new ParseUUIDPipe({ optional: true }))
    categoryId?: string,
  ): Promise<PaginatedItemResDto> {
    return this.itemService.findAll(page, limit, search, categoryId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Ambil barang berdasarkan ID' })
  @ApiParam({ name: 'id', type: String, format: 'uuid' })
  @ApiResponse({
    status: 200,
    description: 'Barang berhasil diambil',
    type: ItemResDto,
  })
  @ApiNotFoundResponse({ description: 'Barang tidak ditemukan' })
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<ItemResDto> {
    return this.itemService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Ubah barang berdasarkan ID' })
  @ApiParam({ name: 'id', type: String, format: 'uuid' })
  @ApiResponse({
    status: 200,
    description: 'Barang berhasil diubah',
    type: ItemResDto,
  })
  @ApiNotFoundResponse({ description: 'Barang tidak ditemukan' })
  @ApiBadRequestResponse({
    description: 'Kesalahan validasi atau kategori tidak ditemukan',
  })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateItemDto: UpdateItemReqDto,
  ): Promise<ItemResDto> {
    return this.itemService.update(id, updateItemDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Hapus barang berdasarkan ID' })
  @ApiParam({ name: 'id', type: String, format: 'uuid' })
  @ApiResponse({ status: 200, description: 'Hapus barang berhasil' })
  @ApiNotFoundResponse({ description: 'Barang tidak ditemukan' })
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.itemService.remove(id);
  }

  @Delete()
  @ApiOperation({ summary: 'Hapus beberapa barang' })
  @ApiResponse({
    status: 200,
    description: 'Barang berhasil dihapus',
    type: BulkDeleteItemResDto,
  })
  @ApiNotFoundResponse({ description: 'Barang tidak ditemukan' })
  @ApiBadRequestResponse({ description: 'Permintaan tidak valid' })
  async bulkDelete(
    @Body() bulkDeleteDto: BulkDeleteItemReqDto,
  ): Promise<BulkDeleteItemResDto> {
    return this.itemService.bulkDelete(bulkDeleteDto.ids);
  }
}
