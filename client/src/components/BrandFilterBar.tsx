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
    <div className="my-2 ml-[210px]">
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
