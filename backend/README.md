# Kaggle Competition Search Backend

This is the backend for the Kaggle Competition Search application. It uses Prisma ORM with a SQLite database.

## Setup

1. Install dependencies:
   ```
   npm install
   ```
   or if you're using pnpm:
   ```
   pnpm install
   ```

2. Set up the database:
   - Ensure you have a `.env` file in the `backend` directory with the following content:
     ```
     DATABASE_URL="file:./dev.db"
     ```
   - This sets up a SQLite database named `dev.db` in the `prisma` directory.

3. Generate Prisma client:
   ```
   npx prisma generate
   ```

4. Run database migrations:
   ```
   npx prisma migrate dev
   ```

5. Seed the database with initial data:
   ```
   npx prisma db seed
   ```

## Development

To start the development server:
```
npm run dev
```
or with pnpm:
```
pnpm dev
```

## Database Management

- To view and edit the database content, you can use Prisma Studio:
  ```
  npx prisma studio
  ```

- To reset the database (caution: this will delete all data):
  ```
  npx prisma migrate reset
  ```

## Additional Commands

- To run tests:
  ```
  npm test
  ```

- To build the project:
  ```
  npm run build
  ```

For more information on Prisma commands and usage, refer to the [Prisma documentation](https://www.prisma.io/docs/).