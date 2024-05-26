import { getAllDevices } from '@/api/deviceApi'
import { BrandFilterBar } from '@/components/BrandFilterBar'
import { MenuBar } from '@/components/MenuBar'
import { StorePagination } from '@/components/Pagination'
import { ShopCard } from '@/components/ShopCard'
import { useStore } from '@/components/StoreContext'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'

export const ShopPage = observer(() => {
  const {
    store: { deviceStore },
  } = useStore()
  const [page, setPage] = useState(0)
  const pageSize = 6
  const totalPages = Math.round(deviceStore.devices.length / pageSize)

  useEffect(() => {
    if (!deviceStore.devices.length) {
      getAllDevices().then((data) => {
        console.log(data)
        deviceStore.setDevices(data)
      })
    }
  }, [])

  return (
    <div className="flex flex-col items-center">
      <h1>Shop Page!</h1>
      <div className="w-8/12">
        {deviceStore.devices.length > 0 ? (
          <>
            <BrandFilterBar />
            <div className="flex gap-3">
              <MenuBar />
              <div>
                <div className="grid grid-cols-3 gap-4 mb-4 justify-between">
                  {deviceStore.devices
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
            </div>
          </>
        ) : (
          <div className="text-center font-bold mt-4">
            There Are no devices were created
          </div>
        )}
      </div>
    </div>
  )
})
