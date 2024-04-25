import { useStore } from '@/components/StoreContext'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

export const DevicePage = observer(() => {
  const {
    store: {
      deviceStore: { devices },
    },
  } = useStore()
  const { id } = useParams()
  const deviceInDb = devices.find((device) => device.id === Number(id))

  const [selectedPhoto, setSelectedPhoto] = useState('photo 1')
  const [dialogOpen, setDialogOpen] = useState(false)

  if (!deviceInDb) return <div>Not found</div>

  return (
    <div className="flex flex-col items-center">
      <h1>Device Page!</h1>
      <div className="w-8/12 h-[90vh] shadow-lg border rounded-xl">
        <div className="grid grid-cols-3 p-6 gap-6">
          <div className="flex gap-4">
            <div
              className="size-[310px] bg-blue-500 flex flex-col justify-center items-center font-bold"
              onClick={() => setDialogOpen(true)}
            >
              Main photo
              <br />
              {selectedPhoto}
            </div>
            <div className="space-y-1">
              <div
                onClick={() => setSelectedPhoto('photo 1')}
                className={cn(
                  'cursor-pointer size-[100px] bg-blue-400 flex justify-center items-center font-bold',
                  selectedPhoto === 'photo 1' &&
                    'ring-1 rounded-sm ring-offset-1 ring-black'
                )}
              >
                photo 1
              </div>
              <div
                onClick={() => setSelectedPhoto('photo 2')}
                className={cn(
                  'cursor-pointer size-[100px] bg-blue-400 flex justify-center items-center font-bold',
                  selectedPhoto === 'photo 2' &&
                    'ring-1 rounded-sm ring-offset-1 ring-black'
                )}
              >
                photo 2
              </div>
              <div
                onClick={() => setSelectedPhoto('photo 3')}
                className={cn(
                  'cursor-pointer size-[100px] bg-blue-400 flex justify-center items-center font-bold',
                  selectedPhoto === 'photo 3' &&
                    'ring-1 rounded-sm ring-offset-1 ring-black'
                )}
              >
                photo 3
              </div>
            </div>
          </div>
          <div>
            <div>
              <h3>{deviceInDb.model}</h3>
            </div>
            <div>variants</div>
            <div>{deviceInDb.description}</div>
          </div>
          <div className="flex flex-col justify-between border border-slate-300 rounded-3xl p-6">
            <div>{deviceInDb.price}р</div>
            <div>
              <Button variant="secondary">Add to cart</Button>
            </div>
          </div>
        </div>
      </div>
      <Dialog open={dialogOpen} onOpenChange={() => setDialogOpen(false)}>
        <DialogContent>
          <div className="w-[500px] h-[500px] flex flex-col justify-center items-center">
            {selectedPhoto}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
})
