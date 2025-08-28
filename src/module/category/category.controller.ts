import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateCategoryReqDto } from './dto/create-category.req.dto';
import { CategoryResDto } from './dto/category.res.dto';
import { UpdateCategoryReqDto } from './dto/update-category.req.dto';

@ApiTags('Category')
@Controller({
  path: 'categories',
  version: '1',
})
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiOperation({ summary: 'Buat kategori baru' })
  @ApiResponse({
    status: 201,
    description: 'Kategori berhasil dibuat',
    type: CategoryResDto,
  })
  @ApiBadRequestResponse({ description: 'Kesalahan validasi' })
  async create(
    @Body() createCategoryDto: CreateCategoryReqDto,
  ): Promise<CategoryResDto> {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get data Semua Kategori' })
  @ApiResponse({
    status: 200,
    description: 'Categories retrieved successfully',
    type: CategoryResDto,
  })
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Kategori berdasarkan ID' })
  @ApiParam({ name: 'id', type: String, format: 'uuid' })
  @ApiResponse({
    status: 200,
    description: 'Kategori berhasil diambil',
    type: CategoryResDto,
  })
  @ApiNotFoundResponse({ description: 'Kategori tidak ditemukan' })
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Ubah kategori berdasarkan ID' })
  @ApiParam({ name: 'id', type: String, format: 'uuid' })
  @ApiResponse({
    status: 200,
    description: 'Kategori berhasil diubah',
    type: CategoryResDto,
  })
  @ApiNotFoundResponse({ description: 'Kategori tidak ditemukan' })
  @ApiBadRequestResponse({ description: 'Kesalahan validasi' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCategoryDto: UpdateCategoryReqDto,
  ): Promise<CategoryResDto> {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Hapus kategori berdasarkan ID' })
  @ApiParam({ name: 'id', type: String, format: 'uuid' })
  @ApiResponse({ status: 200, description: 'Kategori berhasil dihapus' })
  @ApiNotFoundResponse({ description: 'Kategori tidak ditemukan' })
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.categoryService.remove(id);
  }
}
