'use client'

interface ButtonProps {
    label: string
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    type: any
    outline?: boolean
    small?: boolean
}

export default function Button({label, onClick, type, outline, small}: ButtonProps) {
  return (
    <button onClick={onClick} type={type} className={`${outline ? 'bg-white border-black text-black' : 'bg-black text-white'} ${small ? 'text-sm font-light py-1 px-2' : 'text-md font-semibold py-3 px-4'} rounded-md transition hover:opacity-80`}>
        {label}
    </button>
  )
}

