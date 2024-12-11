import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'
import { useCallback, useState } from 'react'
import { TbPhotoPlus } from 'react-icons/tb'

declare global {
    var cloudinary: any;
}

interface ImageUploadProps {
    onChange: (value:string) => void
    value:string
}

const ImageUpload:React.FC<ImageUploadProps> = ({
    onChange,
    value
}) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleUpload = useCallback((result:any) => {
        setIsLoading(false);
        onChange(result.info.secure_url);
    },[onChange]);

    return (
        <CldUploadWidget
            onUpload={() => setIsLoading(true)}
            onSuccess={handleUpload}
            uploadPreset='nf5met5g'
            options={{
                maxFiles:1
            }}
        >
            {({open}) => {
                return (
                    <div 
                        onClick={() => !isLoading && open?.()} 
                        className={`
                            relative 
                            cursor-pointer 
                            hover:opacity-70 
                            border-dashed 
                            border-2  
                            flex 
                            flex-col 
                            justify-center 
                            items-center 
                            h-[500px]
                            ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
                        `}
                    >
                        <TbPhotoPlus/>        
                        <div className='text-lg'>
                            {isLoading ? 'Uploading...' : 'Click to upload'}
                        </div>

                        {value && (
                            <div className='absolute inset-0 w-200 h-250'>
                                <Image 
                                    alt='upload' 
                                    fill 
                                    style={{objectFit:'cover'}} 
                                    src={value}
                                />
                            </div>
                        )}
                    </div>
                )
            }}
        </CldUploadWidget>
    )
}

export default ImageUpload