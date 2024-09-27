import { PrismaClient } from "@prisma/client";
import * as fs from 'fs';
import csv from 'csv-parser';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
  const results: any[] = [];
  const csvFilePath = path.join(__dirname, '..', 'src', 'data', 'competitions.csv');

  await new Promise<void>((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (data: any) => results.push(data))
      .on('end', () => resolve())
      .on('error', (error) => reject(error));
  });

  for (const result of results) {
    await prisma.competition.create({
      data: {
        slug: result.Slug,
        title: result.Title,
        subtitle: result.Subtitle,
        deadlineDate: new Date(result.DeadlineDate),
      },
    });
  }

  console.log("CSV data imported successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });