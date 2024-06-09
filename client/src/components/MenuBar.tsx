import { cn } from '@/lib/utils'
import { observer } from 'mobx-react-lite'
import { useStore } from './StoreContext'
import { Command, CommandGroup, CommandItem, CommandList } from './ui/command'

export const MenuBar = observer(() => {
  const {
    store: {
      deviceStore: { types: categories, selectedType, setSelectedType },
    },
  } = useStore()

  if (!categories) return <div>Empty List of Categories =(</div>

  return (
    <Command className="max-w-[200px] rounded-lg border shadow-md">
      <CommandList>
        <CommandGroup heading="Categories">
          {categories.map((category) => {
            return (
              <CommandItem
                key={category.id}
                className={cn(
                  'hover:bg-slate-600',
                  category.id === selectedType?.id && 'bg-slate-600'
                )}
                onSelect={() => {
                  if (selectedType?.id === category.id) {
                    setSelectedType(null)
                  } else {
                    setSelectedType(category)
                  }
                }}
              >
                <span>{category.name}</span>
              </CommandItem>
            )
          })}
        </CommandGroup>
      </CommandList>
    </Command>
  )
})
