# SISCOM Test Backend

Backend API untuk sistem manajemen kategori dan item yang dibangun menggunakan NestJS, TypeORM, dan MySQL.

## 📋 Daftar Isi

- [Fitur](#-fitur)
- [Teknologi yang Digunakan](#-teknologi-yang-digunakan)
- [Persyaratan Sistem](#-persyaratan-sistem)
- [Instalasi](#-instalasi)
- [Konfigurasi](#-konfigurasi)
- [Menjalankan Aplikasi](#-menjalankan-aplikasi)
- [Database](#-database)
- [API Documentation](#-api-documentation)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Struktur Proyek](#-struktur-proyek)
- [Kontribusi](#-kontribusi)
- [Lisensi](#-lisensi)

## ✨ Fitur

### Kategori (Categories)

- ✅ Membuat kategori baru
- ✅ Mengambil semua kategori
- ✅ Mengambil kategori berdasarkan ID
- ✅ Mengubah kategori
- ✅ Menghapus kategori

### Item (Items)

- ✅ Membuat item baru
- ✅ Mengambil semua item dengan paginasi
- ✅ Pencarian item berdasarkan nama
- ✅ Filter item berdasarkan kategori
- ✅ Mengambil item berdasarkan ID
- ✅ Mengubah item
- ✅ Menghapus item tunggal
- ✅ Menghapus beberapa item sekaligus (bulk delete)

### Fitur Umum

- ✅ Validasi input menggunakan class-validator
- ✅ Response interceptor untuk format response yang konsisten
- ✅ Global exception filter untuk error handling
- ✅ Swagger API documentation
- ✅ Database migration dan seeding
- ✅ Docker support
- ✅ Fly.io deployment configuration

## 🛠 Teknologi yang Digunakan

- **Framework**: NestJS 11.x
- **Database**: MySQL dengan TypeORM
- **Validation**: class-validator & class-transformer
- **Documentation**: Swagger/OpenAPI
- **Testing**: Jest
- **Container**: Docker
- **Deployment**: Fly.io
- **Language**: TypeScript

## 📋 Persyaratan Sistem

- Node.js 20.18.0 atau lebih tinggi
- MySQL 8.0 atau lebih tinggi
- npm atau yarn package manager

## 🚀 Instalasi

1. **Clone repository**

   ```bash
   git clone <repository-url>
   cd siscom-test-backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Setup environment variables**

   ```bash
   cp .env.example .env
   ```

4. **Konfigurasi database**
   - Buat database MySQL baru
   - Update file `.env` dengan kredensial database

## ⚙️ Konfigurasi

Buat file `.env` di root directory dengan konfigurasi berikut:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_NAME=your_database_name

# Application Configuration
PORT=3000
NODE_ENV=development
```

## 🏃‍♂️ Menjalankan Aplikasi

### Development Mode

```bash
# Menjalankan aplikasi dalam mode development
npm run start:dev

# Menjalankan dengan debug mode
npm run start:debug
```

### Production Mode

```bash
# Build aplikasi
npm run build

# Menjalankan aplikasi production
npm run start:prod
```

### Scripts yang Tersedia

| Script                | Deskripsi                       |
| --------------------- | ------------------------------- |
| `npm run start`       | Menjalankan aplikasi            |
| `npm run start:dev`   | Menjalankan dengan watch mode   |
| `npm run start:debug` | Menjalankan dengan debug mode   |
| `npm run start:prod`  | Menjalankan aplikasi production |
| `npm run build`       | Build aplikasi                  |
| `npm run format`      | Format code dengan Prettier     |

## 🗄️ Database

### Migration

```bash
# Generate migration baru
npm run migration:generate

# Create migration manual
npm run migration:create

# Jalankan migration
npm run migration:run

# Revert migration terakhir
npm run migration:revert

# Drop schema database
npm run schema:drop

# Sync schema (development only)
npm run schema:sync
```

### Seeding

```bash
# Jalankan seed data
npm run seed
```

### Struktur Database

#### Tabel Categories

- `id` (UUID, Primary Key)
- `name` (VARCHAR, Not Null)
- `description` (TEXT, Nullable)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

#### Tabel Items

- `id` (UUID, Primary Key)
- `name` (VARCHAR, Not Null)
- `description` (TEXT, Nullable)
- `price` (DECIMAL, Not Null)
- `category_id` (UUID, Foreign Key)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

## 📚 API Documentation

Setelah menjalankan aplikasi, dokumentasi API dapat diakses di:

```
http://localhost:3000/api/docs
```

### Endpoint Categories

| Method | Endpoint                 | Deskripsi                         |
| ------ | ------------------------ | --------------------------------- |
| POST   | `/api/v1/categories`     | Membuat kategori baru             |
| GET    | `/api/v1/categories`     | Mengambil semua kategori          |
| GET    | `/api/v1/categories/:id` | Mengambil kategori berdasarkan ID |
| PATCH  | `/api/v1/categories/:id` | Mengubah kategori                 |
| DELETE | `/api/v1/categories/:id` | Menghapus kategori                |

### Endpoint Items

| Method | Endpoint            | Deskripsi                             |
| ------ | ------------------- | ------------------------------------- |
| POST   | `/api/v1/items`     | Membuat item baru                     |
| GET    | `/api/v1/items`     | Mengambil semua item dengan paginasi  |
| GET    | `/api/v1/items/:id` | Mengambil item berdasarkan ID         |
| PUT    | `/api/v1/items/:id` | Mengubah item                         |
| DELETE | `/api/v1/items/:id` | Menghapus item                        |
| DELETE | `/api/v1/items`     | Menghapus beberapa item (bulk delete) |

### Query Parameters untuk Items

- `page` (number): Halaman yang ingin ditampilkan (default: 1)
- `limit` (number): Jumlah item per halaman (default: 10)
- `search` (string): Pencarian berdasarkan nama item
- `categoryId` (UUID): Filter berdasarkan kategori

## 🧪 Testing

```bash
# Menjalankan unit tests
npm run test

# Menjalankan e2e tests
npm run test:e2e

# Menjalankan test coverage
npm run test:cov
```

## 🐳 Docker

### Build Image

```bash
docker build -t siscom-test-backend .
```

### Run Container

```bash
docker run -p 3000:3000 siscom-test-backend
```

### Docker Compose (jika diperlukan)

Buat file `docker-compose.yml`:

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - '3000:3000'
    environment:
      - DB_HOST=db
      - DB_PORT=3306
      - DB_USERNAME=root
      - DB_PASSWORD=password
      - DB_NAME=siscom_test
    depends_on:
      - db

  db:
    image: mysql:8.0
    environment:
      - MYSQL_ROOT_PASSWORD=password
      - MYSQL_DATABASE=siscom_test
    ports:
      - '3306:3306'
    volumes:
      - mysql_data:/var/lib/mysql

volumes:
  mysql_data:
```

## 🚀 Deployment

### Fly.io Deployment

Proyek ini sudah dikonfigurasi untuk deployment di Fly.io. File `fly.toml` sudah tersedia dengan konfigurasi yang sesuai.

```bash
# Install Fly CLI
curl -L https://fly.io/install.sh | sh

# Login ke Fly.io
fly auth login

# Deploy aplikasi
fly deploy
```

### Environment Variables di Production

Pastikan untuk mengatur environment variables di Fly.io:

```bash
fly secrets set DB_HOST=your_db_host
fly secrets set DB_PORT=3306
fly secrets set DB_USERNAME=your_db_username
fly secrets set DB_PASSWORD=your_db_password
fly secrets set DB_NAME=your_db_name
fly secrets set NODE_ENV=production
```

## 📁 Struktur Proyek

```
siscom-test-backend/
├── src/
│   ├── config/                 # Konfigurasi aplikasi
│   │   ├── database.config.ts
│   │   └── swagger.config.ts
│   ├── database/               # Database configuration
│   │   ├── data-source.ts
│   │   ├── migrations/         # Database migrations
│   │   └── seeds/              # Database seeds
│   ├── filters/                # Exception filters
│   │   └── all-exception.filter.ts
│   ├── interceptors/           # Response interceptors
│   │   └── response.interceptor.ts
│   ├── module/                 # Feature modules
│   │   ├── category/           # Category module
│   │   │   ├── dto/           # Data Transfer Objects
│   │   │   ├── entities/      # Database entities
│   │   │   ├── category.controller.ts
│   │   │   ├── category.service.ts
│   │   │   └── category.module.ts
│   │   └── item/              # Item module
│   │       ├── dto/
│   │       ├── entities/
│   │       ├── item.controller.ts
│   │       ├── item.service.ts
│   │       └── item.module.ts
│   ├── app.module.ts          # Root module
│   └── main.ts               # Application entry point
├── test/                     # Test files
├── Dockerfile               # Docker configuration
├── fly.toml                # Fly.io configuration
├── package.json
└── README.md
```

## 🤝 Kontribusi

1. Fork repository ini
2. Buat branch fitur baru (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan Anda (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buka Pull Request

### Guidelines untuk Kontribusi

- Ikuti standar coding yang sudah ditetapkan
- Tambahkan test untuk fitur baru
- Update dokumentasi jika diperlukan
- Pastikan semua test berjalan dengan baik

## 📄 Lisensi

Proyek ini menggunakan lisensi UNLICENSED. Lihat file `package.json` untuk informasi lebih lanjut.

## 📞 Support

Jika Anda memiliki pertanyaan atau masalah, silakan buat issue di repository ini atau hubungi tim development.

---

**Dibuat dengan ❤️ menggunakan NestJS**
