import { getAllDevices } from '@/api/deviceApi'
import { BrandFilterBar } from '@/components/BrandFilterBar'
import { MenuBar } from '@/components/MenuBar'
import { StorePagination } from '@/components/Pagination'
import { ShopCard } from '@/components/ShopCard'
import { useStore } from '@/components/StoreContext'
import { observer } from 'mobx-react-lite'
import { useEffect, useMemo, useState } from 'react'

export const ShopPage = observer(() => {
  const {
    store: {
      deviceStore: { devices, selectedBrands, selectedType, setDevices },
    },
  } = useStore()
  const [page, setPage] = useState(0)
  const pageSize = 6
  const totalPages = Math.round(devices.length / pageSize)

  useEffect(() => {
    if (!devices.length) {
      getAllDevices().then((data) => {
        setDevices(data)
      })
    }
  }, [])

  const filteredDevices = useMemo(() => {
    const brandsIds = selectedBrands?.map((b) => b.id)
    let filteredData = devices

    if (brandsIds?.length) {
      filteredData = filteredData.filter((d) => brandsIds?.includes(d.brand_id))
    }

    if (selectedType) {
      filteredData = filteredData.filter((d) => d.type_id === selectedType?.id)
    }
    return filteredData
  }, [selectedBrands, selectedType, devices])

  return (
    <div className="flex flex-col items-center">
      <h1>Shop Page!</h1>
      <div className="w-full flex flex-col justify-center items-center">
        {devices.length > 0 ? (
          <>
            <BrandFilterBar />
            <div className="flex gap-3 w-8/12">
              <MenuBar />
              <div>
                <div className="grid grid-cols-3 gap-4 mb-2">
                  {filteredDevices
                    .slice(page * pageSize, page * pageSize + pageSize)
                    .map(({ id, model, description, rating, price, image }) => (
                      <ShopCard
                        key={id}
                        id={id}
                        title={model}
                        image={image[0]}
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
