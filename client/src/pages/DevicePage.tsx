import { useStore } from '@/components/StoreContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'

export const DevicePage = observer(() => {
  const {
    store: {
      deviceStore: { devices },
    },
  } = useStore()
  const { id } = useParams()
  const deviceInDb = devices.find((device) => device.id === Number(id))
  if (!deviceInDb) return <div>Not found</div>

  return (
    <div className="flex flex-col items-center">
      <h1>Device Page!</h1>
      <div className="w-8/12  shadow-lg border rounded-xl">
        <div className="flex p-6 gap-6">
          <div className="flex gap-4">
            <Carousel className="w-full max-w-xs ml-10">
              <CarouselContent>
                {deviceInDb.image.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-6">
                          <img
                            src={import.meta.env.VITE_API_URL + '/' + image}
                            alt={`dev_pic_${index}`}
                            className="h-full"
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
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
    </div>
  )
})
