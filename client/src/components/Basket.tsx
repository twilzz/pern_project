import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@radix-ui/react-popover'
import { CircleMinus, CirclePlus, ShoppingCart } from 'lucide-react'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { useStore } from './StoreContext'
import { Button } from './ui/button'

export const Basket = observer(() => {
  const [open, setOpen] = useState(false)
  const {
    store: {
      basketStore: { devices, totalBasketPrice, setDeviceCount, clearBasket },
    },
  } = useStore()

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          size="icon"
          role="combobox"
          aria-expanded={open}
          disabled={!devices.length}
          className="relative bg-muted hover:bg-white size-10 rounded-full flex items-center justify-center text-muted-foreground"
        >
          <ShoppingCart />
          {Boolean(devices.length) && (
            <div className="absolute text-xs top-0 -right-1 bg-white size-4 p-[1px] rounded-full border border-black flex items-center justify-center">
              {devices.length}
            </div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" align="end">
        <div className="w-60 text-xs min-h-20 max-h-80 bg-white rounded-lg shadow-lg overflow-y-auto border border-slate-300">
          {devices.map(({ device, count }) => (
            <div className="flex gap-2 justify-between hover:bg-slate-200 p-2 border-b">
              <div className="max-w-[100px] w-[100px]">{device.model}</div>
              <div className="flex items-center">{device.price}р</div>
              <div className="min-w-4 flex items-center gap-1">
                <Button
                  size="icon"
                  variant="ghost"
                  className="size-4 text-muted-foreground"
                  onClick={() => setDeviceCount(device.id, 'minus')}
                >
                  <CircleMinus />
                </Button>
                {count}
                <Button
                  size="icon"
                  variant="ghost"
                  className="size-4 text-muted-foreground"
                  onClick={() => setDeviceCount(device.id, 'plus')}
                >
                  <CirclePlus />
                </Button>
              </div>
            </div>
          ))}
          <div className="flex justify-between p-2 gap-2 items-center">
            <Button
              onClick={() => {
                clearBasket()
                setOpen(false)
              }}
              variant="destructive"
              className="h-6 text-xs"
            >
              Clear list
            </Button>
            <div className="flex gap-2">
              <div>TOTAL:</div>
              <div className="min-w-4">{totalBasketPrice}р</div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
})
