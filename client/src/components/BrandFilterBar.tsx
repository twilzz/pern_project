import { observer } from 'mobx-react-lite'
import { useStore } from './StoreContext'
import { Badge } from './ui/badge'

export const BrandFilterBar = observer(() => {
  const {
    store: {
      deviceStore: { brands, selectedBrands, setSelectedBrands },
    },
  } = useStore()

  return (
    <div className="flex gap-2 w-full justify-center my-4">
      {brands.map(({ id, name }) => {
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
