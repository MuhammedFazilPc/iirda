import prisma from "@/lib/prisma";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(req:NextApiRequest){
    try {
        const leaderBoard=await prisma.leaderboard.findMany();
        return NextResponse.json(leaderBoard)
    } catch (error) {
        throw error
    }
}