// src/database/seeds/seed.ts
import { ItemEntity } from '../../module/item/entities/item.entity';
import { AppDataSource } from '../data-source';
import { CategoryEntity } from '../../module/category/entities/category.entity';

async function seed() {
  try {
    await AppDataSource.initialize();
    console.log('Database connection initialized');

    // Create categories
    const categories = [
      { name: 'Elektronik' },
      { name: 'Pakaian' },
      { name: 'Buku & Alat Tulis' },
      { name: 'Rumah & Dapur' },
      { name: 'Olahraga' },
      { name: 'Otomotif' },
      { name: 'Kesehatan & Kecantikan' },
      { name: 'Mainan & Hobi' },
    ];

    const createdCategories = await AppDataSource.manager.save(
      CategoryEntity,
      categories,
    );
    console.log(`Created ${createdCategories.length} categories`);

    // Create items
    const items = [
      // Elektronik
      {
        item_name: 'Xiaomi Redmi Note 13',
        category_id: createdCategories[0].id,
        stock: 50,
        item_group: 'Smartphone',
        price: 3500000,
      },
      {
        item_name: 'Samsung Galaxy A54',
        category_id: createdCategories[0].id,
        stock: 30,
        item_group: 'Smartphone',
        price: 5000000,
      },
      {
        item_name: 'Polytron LED TV 32"',
        category_id: createdCategories[0].id,
        stock: 15,
        item_group: 'Televisi',
        price: 2200000,
      },

      // Pakaian
      {
        item_name: 'Batik Keris Kemeja',
        category_id: createdCategories[1].id,
        stock: 40,
        item_group: 'Kemeja',
        price: 250000,
      },
      {
        item_name: 'Eiger Jaket Gunung',
        category_id: createdCategories[1].id,
        stock: 20,
        item_group: 'Jaket',
        price: 550000,
      },
      {
        item_name: 'Converse All Star',
        category_id: createdCategories[1].id,
        stock: 35,
        item_group: 'Sepatu',
        price: 700000,
      },

      // Buku & Alat Tulis
      {
        item_name: 'Laskar Pelangi',
        category_id: createdCategories[2].id,
        stock: 50,
        item_group: 'Buku',
        price: 120000,
      },
      {
        item_name: 'Buku Tulis Sinar Dunia (pak 5)',
        category_id: createdCategories[2].id,
        stock: 100,
        item_group: 'Alat Tulis',
        price: 40000,
      },

      // Rumah & Dapur
      {
        item_name: 'Rice Cooker Miyako 1.8L',
        category_id: createdCategories[3].id,
        stock: 25,
        item_group: 'Peralatan Dapur',
        price: 300000,
      },
      {
        item_name: 'Dispenser Air Cosmos',
        category_id: createdCategories[3].id,
        stock: 10,
        item_group: 'Peralatan Rumah',
        price: 550000,
      },

      // Olahraga
      {
        item_name: 'Sepeda Polygon Heist',
        category_id: createdCategories[4].id,
        stock: 12,
        item_group: 'Sepeda',
        price: 2200000,
      },
      {
        item_name: 'Matras Yoga Kettler',
        category_id: createdCategories[4].id,
        stock: 30,
        item_group: 'Fitness',
        price: 150000,
      },

      // Otomotif
      {
        item_name: 'Oli Federal Matic 1L',
        category_id: createdCategories[5].id,
        stock: 60,
        item_group: 'Oli Motor',
        price: 35000,
      },
      {
        item_name: 'Ban IRC Fasti 90/80-17',
        category_id: createdCategories[5].id,
        stock: 25,
        item_group: 'Ban Motor',
        price: 275000,
      },

      // Kesehatan & Kecantikan
      {
        item_name: 'Wardah Lightening Face Serum',
        category_id: createdCategories[6].id,
        stock: 40,
        item_group: 'Skincare',
        price: 95000,
      },
      {
        item_name: 'Vaseline Petroleum Jelly 100ml',
        category_id: createdCategories[6].id,
        stock: 50,
        item_group: 'Perawatan Tubuh',
        price: 25000,
      },

      // Mainan & Hobi
      {
        item_name: 'Mainan Edukasi Kayu Anak',
        category_id: createdCategories[7].id,
        stock: 20,
        item_group: 'Mainan',
        price: 150000,
      },
      {
        item_name: 'Puzzle 500 pcs',
        category_id: createdCategories[7].id,
        stock: 30,
        item_group: 'Hobi',
        price: 120000,
      },
    ];

    const createdItemEntitys = await AppDataSource.manager.save(
      ItemEntity,
      items,
    );
    console.log(`Created ${createdItemEntitys.length} items`);

    console.log('Database seeding completed successfully!');

    // Display summary
    console.log('\n=== SEEDING SUMMARY ===');
    console.log(`Categories: ${createdCategories.length}`);
    console.log(`ItemEntitys: ${createdItemEntitys.length}`);
    console.log('\nCategories created:');
    createdCategories.forEach((cat, index) => {
      console.log(`${index + 1}. ${cat.name} (${cat.id})`);
    });
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await AppDataSource.destroy();
    console.log('Database connection closed');
  }
}

seed();
