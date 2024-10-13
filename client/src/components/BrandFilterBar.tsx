import { observer } from 'mobx-react-lite'
import { useStore } from './StoreContext'
import { Badge } from './ui/badge'

export const BrandFilterBar = observer(() => {
  const {
    store: {
      deviceStore: { brands, selectedBrands, setSelectedBrands, devices },
    },
  } = useStore()

  const brandsWithDevices = brands.filter((b) =>
    devices.map((d) => d.brand_id).includes(b.id)
  )

  return (
    <div className="flex gap-2 w-full justify-center my-4">
      {brandsWithDevices.map(({ id, name }) => {
        return (
          <Badge
            variant={
              selectedBrands?.find((brand) => brand.id === id)
                ? 'default'
                : 'outline'
            }
            key={id}
            onClick={() => setSelectedBrands({ id, name })}
          >
            {name}
          </Badge>
        )
      })}
    </div>
  )
})
