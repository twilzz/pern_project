import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { cn } from '@/lib/utils'
import { phones } from '@/utils/dataSounce'
import { ReactNode, useState } from 'react'

export const ShopPage = () => {
  const [page, setPage] = useState(0)
  const pageSize = 3
  const totalPages = Math.round(phones.length / pageSize)

  return (
    <div className="flex flex-col items-center gap-10">
      <h1>Shop Page!</h1>
      <div className="grid grid-cols-3 gap-4 w-7/12">
        {phones
          .slice(page * pageSize, page * pageSize + pageSize)
          .map(({ id, model, description, rating, price }) => (
            <ShopCard
              key={id}
              id={id}
              title={model}
              description={description}
              content={description}
              footer={rating}
              price={price}
            />
          ))}
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className={cn(
                page === 0 && 'pointer-events-none text-muted-foreground'
              )}
              onClick={() => setPage((prev) => prev - 1)}
            />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNum, index) => {
              return (
                <PaginationItem>
                  <PaginationLink
                    isActive={page === index}
                    onClick={() => setPage(index)}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              )
            }
          )}
          <PaginationItem>
            <PaginationNext
              className={cn(
                page === totalPages - 1 &&
                  'pointer-events-none text-muted-foreground'
              )}
              onClick={() => setPage((prev) => prev + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}

interface ShopCardProps {
  id: number
  title: string
  description: string
  content: string
  footer: ReactNode | string
  price: number
}

const ShopCard = ({
  id,
  title,
  description,
  content,
  footer,
  price,
}: ShopCardProps) => {
  return (
    <Card className="w-[300px]">
      <CardHeader>
        <CardTitle className="flex justify-between">
          {title}
          <div>id:{id}</div>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{content}</p>
        <p>{price}</p>
      </CardContent>
      <CardFooter>
        <p>{footer}</p>
      </CardFooter>
    </Card>
  )
}
