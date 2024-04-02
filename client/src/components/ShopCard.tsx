import { ReactNode } from 'react'
import { Button } from './ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'

interface ShopCardProps {
  id: number
  title: string
  description: string
  content: string
  footer: ReactNode | string
  price: number
}

export const ShopCard = ({
  id,
  title,
  description,
  content,
  price,
}: ShopCardProps) => {
  return (
    <Card className="w-[300px] min-h-[400px] flex flex-col justify-between hover:shadow-lg">
      <CardHeader>
        <CardTitle className="flex justify-between">
          {title}
          <div>id:{id}</div>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{content}</p>
        <div className="font-medium mt-4">Price: {price}</div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button>Add to cart</Button>
      </CardFooter>
    </Card>
  )
}
