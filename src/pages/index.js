import Image from 'next/image'
import { Inter } from 'next/font/google'
import FormDb from '@/components/FormDb'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
   <div><FormDb /> </div>
  )
}
