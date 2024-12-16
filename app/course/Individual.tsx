'use client'
import { SafeUser } from "../types"
import Button from "../(components)/Button"
import UseBasket from "../hooks/useBasket"

interface Props {
    author?: string,
    price?: string,
    imageSrc?: string,
    name?: string,
    description?: string | null
    courseId: any,
    currentUser: SafeUser | null
    courseUrl?: string 
    courseVideo?: string
    isPurchased?: boolean
}

export default function Individual({
    author,
    price,
    imageSrc,
    name,
    courseId,
    description,
    currentUser,
    courseUrl,
    courseVideo,
    isPurchased = false
}: Props) {

    const {hasBasket, toggleBasket} = UseBasket({
        currentUser, courseId
    })

    const showContent = price === '0' || isPurchased;

    const isValidYouTubeUrl = (url: string) => {
        return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/.test(url);
    };

    return (
        <div>
            <div className="h-[60vh] bg-zinc-900 flex justify-between text-white px-14 items-center">
                <div>
                    <h1 className="text-[4rem]">{name}</h1>
                    {/* <p>{author}</p> */}
                    <p>{description}</p>
                    <p>{price === '0' ? 'Free' : `${price} Rs`}</p>
                </div>
                <div className="w-[200px] bg-zing-900 p-1 text-black">
                    <img src={imageSrc} alt="Image" width={100} height={100} className="w-full object-cover"/>
                    <div>
                        {price !== '0' && (
                            <div className="flex flex-col gap-1 mt-4">
                                <Button onClick={toggleBasket} type='button' label={`${hasBasket ? 'Remove from Cart' : 'Add to Cart'}`}/>
                                {/* <Button onClick={()=>{}} type='button' label="Buy course"/> */}
                            </div>
                        )}
                        {price === '0' && (
                            <div className="flex flex-col gap-1 mt-4">
                                <Button onClick={toggleBasket} type='button' label={`${hasBasket ? 'Not Completed' : 'Completed'}`}/>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {courseUrl && showContent ? (
                <>
                    <div className="w-full max-w-4xl mx-auto my-8">
                        <h2 className="text-[36px]">Course Video</h2>
                        {courseVideo && isValidYouTubeUrl(courseVideo) ? (
                            <iframe
                                width="100%"
                                height="480"
                                src={courseVideo.replace("watch?v=", "embed/")}
                                title="Course Video"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <p className="text-red-500">Invalid video URL</p>
                        )}
                    </div>
                    <div className="w-full max-w-4xl mx-auto my-8">
                        <h2 className="text-[36px]">Course Notes</h2>
                        <a 
                            href={courseUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-black-600 hover:underline"
                        >
                            {courseUrl}
                        </a>
                    </div>
                </>
            ) : price !== '0' && (
                <div className="w-full max-w-4xl mx-auto my-8 text-center">
                    {<p className="text-xl">Add this course to your cart to mark it as completed</p>}
                </div>
            )}
        </div>
    )
}
