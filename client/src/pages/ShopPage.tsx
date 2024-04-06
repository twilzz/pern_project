import { StorePagination } from '@/components/Pagination'
import { ShopCard } from '@/components/ShopCard'
import { phones } from '@/utils/dataSource'
import { useState } from 'react'

export const ShopPage = () => {
  const [page, setPage] = useState(0)
  const pageSize = 6
  const totalPages = Math.round(phones.length / pageSize)

  return (
    <div className="flex flex-col items-center">
      <h1>Shop Page!</h1>
      <div className="grid grid-cols-3 gap-4 mb-4">
        {phones
          .slice(page * pageSize, page * pageSize + pageSize)
          .map(({ id, model, description, rating, price, brand }) => (
            <ShopCard
              key={id}
              id={id}
              title={model}
              description={brand}
              content={description}
              footer={rating}
              price={price}
            />
          ))}
      </div>
      <StorePagination
        currentPage={page}
        setPage={setPage}
        totalPages={totalPages}
      />
    </div>
  )
}
