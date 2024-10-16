import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Adjust the path to your Prisma instance

// This API route returns all pending registrations from the RegistrationQue table
export const GET = async (req: NextRequest) => {
  try {
    // Fetch all data from RegistrationQue table
    const registrationQueData = await prisma.registrationQue.findMany({
      where: {
        status: 'pending', // You can change this filter or remove it if you want all records
      },
    });

    // Return the fetched data as JSON
    return NextResponse.json(registrationQueData, { status: 200 });
  } catch (error) {
    console.error('Error fetching registration queue data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
};
