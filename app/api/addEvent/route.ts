import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    
    const {name,refereeMobile,eventType,district,place,userId}=await req.json()
    console.log(name,refereeMobile,eventType,district,place,userId)
    await prisma.event.create({
        data:{
            name,
            refereeMobile,
            eventType,
            district,
            place,
            userId,
        },
    })
    return NextResponse.json({message:"inserted the event",status:200})

}
export async function GET(req: NextRequest) {
    const events = await prisma.event.findMany()
    return NextResponse.json(events)
}
export async function PUT(req: NextRequest) {
    const { id } = await req.json()
    console.log(id)
    const event = await prisma.event.update({
        where: { id },
        data: { status: "approved" }
    }
    )
    return NextResponse.json({event,status:200})
}