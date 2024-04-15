import { cn } from '@/lib/utils'
import { observer } from 'mobx-react-lite'
import { useStore } from './StoreContext'
import { Command, CommandGroup, CommandItem, CommandList } from './ui/command'

export const MenuBar = observer(() => {
  const {
    store: {
      deviceStore: { type: categories, selectedType, setSelectedType },
    },
  } = useStore()

  if (!categories) return <div>Empty List of Categories =(</div>

  return (
    <Command className="max-w-[200px] rounded-lg border shadow-md">
      <CommandList>
        <CommandGroup heading="Categories">
          {categories.map(({ id, name }) => {
            return (
              <CommandItem
                key={id}
                className={cn(
                  'hover:bg-slate-600',
                  id === selectedType && 'bg-slate-600'
                )}
                onSelect={() => {
                  console.log(id)
                  if (selectedType === id) {
                    setSelectedType(null)
                  } else {
                    setSelectedType(id)
                  }
                }}
              >
                <span>{name}</span>
              </CommandItem>
            )
          })}
        </CommandGroup>
      </CommandList>
    </Command>
  )
})
