import express, { type Router } from "express";
import { PrismaClient } from "@prisma/client";

const router: Router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    const competitions = await prisma.competition.findMany();
    console.log("root");
    console.log(competitions);
    res.json(competitions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching competitions", error });
  }
});

router.get("/search", async (req, res) => {
  console.log("search")
  const query = (req.query.query as string) || "";
  console.log(`query: ${query}`);
  try {
    if (!query) {
      const competitions = await prisma.competition.findMany();
      console.log("blank");
      console.log(competitions);
      res.json(competitions);
    } else {
      const competitions = await prisma.competition.findMany({
        where: {
          OR: [
            { title: { contains: query } },
          ],
        },
      });
      console.log("not blank");
      console.log(competitions);
      res.json(competitions);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error searching competitions", error });
  }
});

router.get("/:id", (req, res, next) => {
  // Wrap in a standard middleware function
  (async () => {
    // Use an IIFE for the async logic
    try {
      const id = req.params.id;
      if (Number.isNaN(Number.parseInt(req.params.id))) {
        return res.status(400).json({ message: "Invalid competition ID" });
      }

      const competition = await prisma.competition.findUnique({
        where: { id },
      });

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
