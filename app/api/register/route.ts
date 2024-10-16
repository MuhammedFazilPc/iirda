import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { name,mobile,whatsApp, password } = await req.json();
  console.log({ name,mobile,whatsApp, password } )
  //check whether the whole data is sent
  if (!mobile || !password ||!name ||!whatsApp) {
    return NextResponse.json({ error: 'Mobile number and password are required' }, { status: 400 });
  }

  // Check if mobile already exists
  const existingUser = await prisma.user.findUnique({ where: { mobile } });
  if (existingUser) {
    return NextResponse.json({ error: 'Mobile number already exists' }, { status: 400 });
  }

  // Hash password and queue registration
  const hashedPassword = await bcrypt.hash(password, 10);
  
  await prisma.user.create({
    data: {
      name,
      mobile,
      whatsApp,
      password: hashedPassword,
    },
  });

  return NextResponse.json({ message: 'Registration request submitted for admin approval' });
}
