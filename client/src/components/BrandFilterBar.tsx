import { observer } from 'mobx-react-lite'
import { useStore } from './StoreContext'
import { Badge } from './ui/badge'

export const BrandFilterBar = observer(() => {
  const {
    store: {
      deviceStore: { brands },
    },
  } = useStore()

  return (
    <div className="my-2 ml-[210px]">
      {brands.map(({ id, name }) => {
        return <Badge key={id}>{name}</Badge>
      })}
    </div>
  )
})
