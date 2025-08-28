import { CategoryEntity } from '../../category/entities/category.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('items')
export class ItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  item_name: string;

  @Column({ type: 'uuid' })
  category_id: string;

  @Column({ type: 'int', default: 0 })
  stock: number;

  @Column({ type: 'varchar' })
  item_group: string;

  @Column({ type: 'int' })
  price: number;

  @ManyToOne(() => CategoryEntity, (category) => category.items)
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
