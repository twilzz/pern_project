import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ReactNode } from 'react'

const products = [
  {
    id: 1,
    title: 'title 1',
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat, perferendis?',
    rating: 4,
  },
  {
    id: 1,
    title: 'title 1',
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat, perferendis?',
    rating: 4,
  },
  {
    id: 1,
    title: 'title 1',
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat, perferendis?',
    rating: 4,
  },
  {
    id: 1,
    title: 'title 1',
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat, perferendis?',
    rating: 3,
  },
]

export const ShopPage = () => {
  return (
    <div>
      <h1>Shop Page!</h1>
      <div>
        {products.map(({ id, title, description, rating }) => (
          <ShopCard
            key={id}
            title={title}
            description={description}
            content={description}
            footer={rating}
          />
        ))}
      </div>
    </div>
  )
}

interface ShopCardProps {
  title: string
  description: string
  content: string
  footer: ReactNode | string
}

const ShopCard = ({ title, description, content, footer }: ShopCardProps) => {
  return (
    <Card className="w-[300px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{content}</p>
      </CardContent>
      <CardFooter>
        <p>{footer}</p>
      </CardFooter>
    </Card>
  )
}
