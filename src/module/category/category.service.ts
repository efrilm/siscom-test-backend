import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CategoryEntity } from './entities/category.entity';
import { CreateCategoryReqDto } from './dto/create-category.req.dto';
import { CategoryResDto } from './dto/category.res.dto';
import { plainToClass, plainToInstance } from 'class-transformer';
import { UpdateCategoryReqDto } from './dto/update-category.req.dto';

@Injectable()
export class CategoryService {
  private readonly logger = new Logger(CategoryService.name);
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}

  async create(
    createCategoryDto: CreateCategoryReqDto,
  ): Promise<CategoryResDto> {
    const category = this.categoryRepository.create(createCategoryDto);
    const savedCategory = await this.categoryRepository.save(category);
    this.logger.debug(savedCategory);

    return plainToClass(CategoryResDto, savedCategory);
  }

  async findAll(): Promise<CategoryResDto[]> {
    const categories = this.categoryRepository.find();

    this.logger.debug(categories);

    return (await categories).map((category) =>
      plainToInstance(CategoryResDto, category),
    );
  }

  async findOne(id: string): Promise<CategoryResDto> {
    const category = await this.categoryRepository.findOne({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException(`Kategori dengan ID ${id} tidak ditemukan`);
    }

    return plainToClass(CategoryResDto, category);
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryReqDto,
  ): Promise<CategoryResDto> {
    const category = await this.categoryRepository.findOne({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException(`Kategori dengan ID ${id} tidak ditemukan`);
    }

    category.name = updateCategoryDto.name ?? category.name;

    const updatedCategory = await this.categoryRepository.save(category);
    this.logger.debug(updatedCategory);

    return plainToClass(CategoryResDto, updatedCategory, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string): Promise<void> {
    const category = await this.categoryRepository.findOne({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException(`Kategori dengan ID ${id} tidak ditemukan`);
    }

    await this.categoryRepository.remove(category);
  }
}
