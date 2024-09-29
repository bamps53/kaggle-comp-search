import express, { type Router } from "express";
import { PrismaClient } from "@prisma/client";

const router: Router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    const competitions = await prisma.competition.findMany();
    res.json(competitions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching competitions", error });
  }
});

router.get("/search", async (req, res) => {
  const query = (req.query.query as string) || "";
  try {
    if (!query) {
      const competitions = await prisma.competition.findMany();
      res.json(competitions);
    } else {
      const competitions = await prisma.competition.findMany({
        where: {
          OR: [
            { slug: { contains: query } },
          ],
        },
      });
      res.json(competitions);
    }
  } catch (error) {
    res.status(500).json({ message: "Error searching competitions", error });
  }
});

router.get("/:slug", (req, res, next) => {
  // Wrap in a standard middleware function
  (async () => {
    // Use an IIFE for the async logic
    try {
      const slug = req.params.slug;

      const competition = await prisma.competition.findUnique({
        where: { slug },
      });

      console.log(competition);

      if (competition) {
        res.json(competition);
      } else {
        res.status(404).json({ message: "Competition not found" });
      }
    } catch (error) {
      next(error);
    }
  })(); // Immediately invoke the IIFE
});

export default router;
