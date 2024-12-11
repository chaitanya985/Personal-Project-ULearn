import { NextResponse } from "next/server";
import prisma from '../../lib/prismadb'
import myUser from "@/app/actions/getUser";


export async function POST(request: Request) {
    const currentUser = await myUser();

    if (!currentUser) {
        return console.log("No user found");
    }
    
    const body = await request.json();

    const {
        name, 
        description, 
        price, 
        author, 
        imageSrc,
        category,
        courseUrl,
        courseVideo
        } = body;

    const course = await prisma.course.create({
        data: {
            name,
            description,
            price,
            author,
            imageSrc,
            userId: currentUser.id,
            category,
            courseUrl,
            courseVideo
        }
    })

    return NextResponse.json(course);
}


