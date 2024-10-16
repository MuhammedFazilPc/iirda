import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route'; // Path to your authOptions file
import prisma from '@/lib/prisma';

// Named export for the GET method
export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  // If there is no session, return a 401 Unauthorized response
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  console.log("session id " + session.user.id)
  try {
    const eventData = await prisma.event.findMany({ where: { id: session.user.id } });

    // if (!eventData) {
    //   return NextResponse.json({ message: 'User not found' }, { status: 404 });
    // }
    console.log(eventData)
    return NextResponse.json({ eventData }, { status: 200 });

  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json({ message: 'Failed to fetch user data' }, { status: 400 });
  }
}
