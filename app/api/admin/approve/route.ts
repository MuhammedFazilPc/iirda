import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

// This API route approves a user and moves their data into the User table
export const POST = async (req: NextRequest) => {
  const { id, mobile, name, whatsApp ,password} = await req.json();

  try {
    // Update the status of the registration queue to "approved"
    const updatedRegistration = await prisma.registrationQue.update({
      where: { id },
      data: { status: 'approved' },
    });

    // Move the user to the User table
    const newUser = await prisma.user.create({
      data: {
        name,
        mobile,
        whatsApp,
        password
        // You can add more fields if required, such as password or role
      },
    });

    return NextResponse.json({ message: 'User approved and added to the database' }, { status: 200 });
  } catch (error) {
    console.error('Error approving user:', error);
    return NextResponse.json({ error: 'Failed to approve user' }, { status: 500 });
  }
};
