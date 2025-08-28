import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ItemEntity } from './entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CategoryEntity } from '../category/entities/category.entity';
import { ItemResDto } from './dto/item.res.dto';
import { plainToClass } from 'class-transformer';
import { CreateItemReqDto } from './dto/create-item.req.dto';
import { UpdateItemReqDto } from './dto/update-item.dto';
import { BulkDeleteItemResDto } from './dto/bulk-delete-item.res.dto';
import { PaginatedItemResDto } from './dto/paginated-item.res.dto';

@Injectable()
export class ItemService {
  private readonly logger = new Logger(ItemService.name);

  constructor(
    @InjectRepository(ItemEntity)
    private itemRepository: Repository<ItemEntity>,
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}

  async create(createItemDto: CreateItemReqDto): Promise<ItemResDto> {
    const category = await this.categoryRepository.findOne({
      where: { id: createItemDto.category_id },
    });

    if (!category) {
      throw new BadRequestException(
        `Kategori dengan ID ${createItemDto.category_id} tidak ditemukan`,
      );
    }

    const item = this.itemRepository.create(createItemDto);
    const savedItem = await this.itemRepository.save(item);
    this.logger.debug(savedItem);

    const itemWithCategory = await this.itemRepository.findOne({
      where: { id: savedItem.id },
      relations: ['category'],
    });

    return plainToClass(ItemResDto, itemWithCategory);
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    search?: string,
    categoryId?: string,
  ): Promise<PaginatedItemResDto> {
    const skip = (page - 1) * limit;

    const queryBuilder = this.itemRepository
      .createQueryBuilder('item')
      .leftJoinAndSelect('item.category', 'category');

    if (search) {
      queryBuilder.where(
        'item.item_name LIKE :search OR item.item_group LIKE :search',
        {
          search: `%${search}%`,
        },
      );
    }

    if (categoryId) {
      if (search) {
        queryBuilder.andWhere('item.category_id = :categoryId', { categoryId });
      } else {
        queryBuilder.where('item.category_id = :categoryId', { categoryId });
      }
    }

    queryBuilder.orderBy('item.created_at', 'DESC').skip(skip).take(limit);

    const [items, total] = await queryBuilder.getManyAndCount();

    const data = plainToClass(ItemResDto, items);
    const totalPages = Math.ceil(total / limit);

    return {
      data,
      total,
      page,
      limit,
      totalPages,
    };
  }

  async findOne(id: string): Promise<ItemResDto> {
    const item = await this.itemRepository.findOne({
      where: { id },
      relations: ['category'],
    });

    if (!item) {
      throw new NotFoundException(`Barang dengan ID ${id} tidak ditemukan`);
    }

    return plainToClass(ItemResDto, item);
  }

  async update(
    id: string,
    updateItemDto: UpdateItemReqDto,
  ): Promise<ItemResDto> {
    const item = await this.itemRepository.findOne({
      where: { id },
      relations: ['category'],
    });

    if (!item) {
      throw new NotFoundException(`Barang dengan ID ${id} tidak ditemukan`);
    }

    if (
      updateItemDto.category_id &&
      updateItemDto.category_id !== item.category_id
    ) {
      const category = await this.categoryRepository.findOne({
        where: { id: updateItemDto.category_id },
      });

      if (!category) {
        throw new BadRequestException(
          `Kategori dengan ID ${updateItemDto.category_id} tidak ditemukan`,
        );
      }
    }

    Object.assign(item, updateItemDto);
    const updatedItem = await this.itemRepository.save(item);
    this.logger.debug(updatedItem);

    const itemWithCategory = await this.itemRepository.findOne({
      where: { id: updatedItem.id },
      relations: ['category'],
    });

    return plainToClass(ItemResDto, itemWithCategory);
  }

  async remove(id: string): Promise<void> {
    const item = await this.itemRepository.findOne({
      where: { id },
    });

    if (!item) {
      throw new NotFoundException(`Barang dengan ID ${id} tidak ditemukan`);
    }

    await this.itemRepository.remove(item);
  }

  async bulkDelete(ids: string[]): Promise<BulkDeleteItemResDto> {
    const items = await this.itemRepository.find({
      where: { id: In(ids) },
    });

    if (items.length === 0) {
      throw new NotFoundException('Barang tidak ditemukan');
    }

    const result = await this.itemRepository.delete({ id: In(ids) });
    const deletedCount = result.affected || 0;
    this.logger.debug(deletedCount);

    return {
      deletedCount,
      message: `Berhasil menghapus ${deletedCount} barang`,
    };
  }
}
