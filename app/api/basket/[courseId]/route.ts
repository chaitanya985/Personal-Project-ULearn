import { NextResponse } from "next/server";
import myUser from "@/app/actions/getUser";
import prisma from '../../../lib/prismadb'

interface IParams {
    courseId?:string;
}

export async function POST(request:Request, {params}:{params:IParams}) {
    const currentUser = await myUser();

    if(!currentUser) {
        return NextResponse.error()
    }

    const {courseId} = params

    if(!courseId || typeof courseId !== 'string') {
        throw new Error('Invalid ID')
    }

    let basketId = [...(currentUser.basketId || [])]

    basketId.push(courseId)


    const user = await prisma.user.update({
        where: {
            id:currentUser.id
        },
        data:{
            basketId
        }
    })
    return NextResponse.json(user)
}


export async function DELETE(request:Request, {params}: {params:IParams}) {
    const currentUser = await myUser();

    if(!currentUser) {
        return NextResponse.error()
    }

    const {courseId} = params

    if(!courseId || typeof courseId !== 'string') {
        throw new Error('Invalid ID')
    }


    let basketId = [...(currentUser.basketId || [])]
    basketId = basketId.filter((id) => id !== courseId)


    const user = await prisma.user.update({
        where: {
            id:currentUser.id
        },
        data:{
            basketId
        }
    })
    return NextResponse.json(user)
}