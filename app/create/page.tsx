'use client'
import React, { FormEvent, useState } from 'react'
import Input from '../(components)/Inputs/Input'
import Button from '../(components)/Button'
import { ChangeEvent } from 'react'
import ImageUpload from '../(components)/Inputs/ImageUpload'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function page() {

  interface InitialValue {
    name: string
    description: string
    price: string
    author: string
    imageSrc: string
    category: string
    courseUrl: string
    courseVideo: string
  }

  const initialValue: InitialValue = {
    name: '',
    description: '',
    price: '',
    author: '',
    imageSrc: '',
    category: '',
    courseUrl: '',
    courseVideo: ''
  }

  const [state, setState] = useState(initialValue)

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setState({...state, [event.target.name]: event.target.value})
  }

  const setValue = (id: any, value: any) => {
    setState((prevState: any) => ({...prevState, [id]: value}))
  }

  const router = useRouter()
  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    
    // Set price to "0" if empty
    const submissionData = {
      ...state,
      price: state.price || "0"
    }
    
    axios.post('/api/course', submissionData)
    .then(()=>{
      router.push('/')
    })
    .catch((error)=>{
      throw new Error(error)
    })
    router.refresh()
  }
  


  return (
    <div className='flex justify-center'>
      <form className='w-[500px] h-[500px] py-12 flex flex-col items-center gap-4' onSubmit={onSubmit}>
        <div className='w-[400px]'>
          <ImageUpload value={state.imageSrc} onChange={(value) => setValue('imageSrc', value)}/>
        </div>
        <div className='flex flex-col gap-2 py-4'>
          <Input placeholder='Course name' id='name' type='text' value={state.name} name='name' onChange={handleChange} />
          <Input placeholder='Course description' id='description' type='text' value={state.description} name='description' onChange={handleChange} />
          <Input placeholder='Course price' id='price' type='number' value={state.price} name='price' onChange={handleChange} />
          <Input placeholder='Course author' id='author' type='text' value={state.author} name='author' onChange={handleChange} />
          <Input placeholder='Course category' id='category' type='text' value={state.category} name='category' onChange={handleChange} />
          <Input placeholder='Course notes' id='courseUrl' type='text' value={state.courseUrl} name='courseUrl' onChange={handleChange} />
          <Input placeholder='Course video' id='courseVideo' type='text' value={state.courseVideo} name='courseVideo' onChange={handleChange} />

        </div>
        <div>
          <Button label='Add course' type='submit' />
        </div>
      </form>
    </div>
  )
}

