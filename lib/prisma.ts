// lib/prisma.ts
import { PrismaClient } from '@prisma/client';
import cron from 'node-cron';

declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

cron.schedule('*/5 * * * *', async () => {
  try {
    console.log('Running leaderboard update...');

    // Fetch top 20 users based on their points
    const topUsers = await prisma.user.findMany({
      orderBy: { points: 'desc' },
      take: 20, // Get the top 20 users
    });

    // Clear the current leaderboard
    await prisma.leaderboard.deleteMany();

    // Insert top 20 users into the leaderboard
    const leaderboardEntries = topUsers.map((user) => ({
      name: user.name,
      points: user.points,
    }));

    await prisma.leaderboard.createMany({
      data: leaderboardEntries,
    });

    console.log('Leaderboard updated!');
  } catch (error) {
    console.error('Error updating leaderboard:', error);
  }
});

export default prisma;
