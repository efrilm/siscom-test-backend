// src/database/seeds/seed.ts
import { ItemEntity } from '../../module/item/entities/item.entity';
import { AppDataSource } from '../data-source';
import { CategoryEntity } from '../../module/category/entities/category.entity';

async function seed() {
  try {
    await AppDataSource.initialize();
    console.log('Database connection initialized');

    // Clear existing data
    // await AppDataSource.manager.clear(ItemEntity);
    // await AppDataSource.manager.clear(CategoryEntity);
    // console.log('Existing data cleared');

    // Create categories
    const categories = [
      { name: 'Electronics' },
      { name: 'Clothing' },
      { name: 'Books' },
      { name: 'Home & Garden' },
      { name: 'Sports' },
      { name: 'Automotive' },
      { name: 'Health & Beauty' },
      { name: 'Toys & Games' },
    ];

    const createdCategories = await AppDataSource.manager.save(
      CategoryEntity,
      categories,
    );
    console.log(`Created ${createdCategories.length} categories`);

    // Create items
    const items = [
      // Electronics
      {
        item_name: 'Samsung Galaxy S24',
        category_id: createdCategories[0].id,
        stock: 25,
        item_group: 'Smartphones',
        price: 999.99,
      },
      {
        item_name: 'iPhone 15 Pro',
        category_id: createdCategories[0].id,
        stock: 18,
        item_group: 'Smartphones',
        price: 1199.99,
      },
      {
        item_name: 'MacBook Air M2',
        category_id: createdCategories[0].id,
        stock: 12,
        item_group: 'Laptops',
        price: 1299.99,
      },
      {
        item_name: 'Sony WH-1000XM5',
        category_id: createdCategories[0].id,
        stock: 30,
        item_group: 'Audio',
        price: 349.99,
      },
      {
        item_name: 'Dell XPS 13',
        category_id: createdCategories[0].id,
        stock: 8,
        item_group: 'Laptops',
        price: 1099.99,
      },

      // Clothing
      {
        item_name: 'Nike Air Max 270',
        category_id: createdCategories[1].id,
        stock: 45,
        item_group: 'Shoes',
        price: 149.99,
      },
      {
        item_name: 'Adidas Hoodie',
        category_id: createdCategories[1].id,
        stock: 35,
        item_group: 'Sportswear',
        price: 79.99,
      },
      {
        item_name: "Levi's 501 Jeans",
        category_id: createdCategories[1].id,
        stock: 60,
        item_group: 'Jeans',
        price: 89.99,
      },
      {
        item_name: 'Polo Ralph Lauren Shirt',
        category_id: createdCategories[1].id,
        stock: 40,
        item_group: 'Shirts',
        price: 95.99,
      },

      // Books
      {
        item_name: 'Clean Code by Robert Martin',
        category_id: createdCategories[2].id,
        stock: 22,
        item_group: 'Programming',
        price: 42.99,
      },
      {
        item_name: 'The Great Gatsby',
        category_id: createdCategories[2].id,
        stock: 15,
        item_group: 'Fiction',
        price: 14.99,
      },
      {
        item_name: 'JavaScript: The Definitive Guide',
        category_id: createdCategories[2].id,
        stock: 18,
        item_group: 'Programming',
        price: 59.99,
      },

      // Home & Garden
      {
        item_name: 'KitchenAid Stand Mixer',
        category_id: createdCategories[3].id,
        stock: 10,
        item_group: 'Kitchen',
        price: 379.99,
      },
      {
        item_name: 'Dyson V15 Vacuum',
        category_id: createdCategories[3].id,
        stock: 7,
        item_group: 'Cleaning',
        price: 649.99,
      },
      {
        item_name: 'Philips Hue Smart Bulbs',
        category_id: createdCategories[3].id,
        stock: 50,
        item_group: 'Lighting',
        price: 49.99,
      },

      // Sports
      {
        item_name: 'Wilson Tennis Racket',
        category_id: createdCategories[4].id,
        stock: 15,
        item_group: 'Tennis',
        price: 159.99,
      },
      {
        item_name: 'Spalding Basketball',
        category_id: createdCategories[4].id,
        stock: 25,
        item_group: 'Basketball',
        price: 29.99,
      },
      {
        item_name: 'Yoga Mat Premium',
        category_id: createdCategories[4].id,
        stock: 40,
        item_group: 'Fitness',
        price: 39.99,
      },

      // Automotive
      {
        item_name: 'Michelin Tire 225/65R17',
        category_id: createdCategories[5].id,
        stock: 20,
        item_group: 'Tires',
        price: 189.99,
      },
      {
        item_name: 'Car Phone Mount',
        category_id: createdCategories[5].id,
        stock: 35,
        item_group: 'Accessories',
        price: 24.99,
      },

      // Health & Beauty
      {
        item_name: 'Olay Regenerist Serum',
        category_id: createdCategories[6].id,
        stock: 30,
        item_group: 'Skincare',
        price: 28.99,
      },
      {
        item_name: 'Oral-B Electric Toothbrush',
        category_id: createdCategories[6].id,
        stock: 25,
        item_group: 'Dental Care',
        price: 89.99,
      },

      // Toys & Games
      {
        item_name: 'LEGO Creator Set',
        category_id: createdCategories[7].id,
        stock: 20,
        item_group: 'Building Toys',
        price: 79.99,
      },
      {
        item_name: 'Monopoly Board Game',
        category_id: createdCategories[7].id,
        stock: 15,
        item_group: 'Board Games',
        price: 34.99,
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
