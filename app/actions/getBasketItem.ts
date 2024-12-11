import prisma from '../lib/prismadb'
import myUser from './getUser'

export default async function getBasketItem() {
    try {
        const currentUser = await myUser();
        if(!currentUser) {
            return []
        }

        const basket = await prisma.course.findMany({
            where: {
                id: {
                    in:[...(currentUser.basketId || [] )]
                }
            },
            select: {
                id: true,
                name: true,
                description: true,
                price: true,
                courseUrl: true,
                createdAt: true,
                // Add any other fields you need, but make sure they're non-null
            }
        })

        const safeBasket = basket.map((basket) => ({
            ...basket,
            courseUrl: basket.courseUrl ?? '',
            createdAt: basket.createdAt.toISOString()
        }))

        return safeBasket
    
    } catch(error:any) {
        throw new Error(error)
    }
}