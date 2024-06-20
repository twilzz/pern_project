import { CirclePlus } from 'lucide-react'
import { observer } from 'mobx-react-lite'
import { ReactNode, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Combobox } from './Combobox'
import { IDeviceForm } from './DeviceForm'
import { useStore } from './StoreContext'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'

interface DeviceEditFormProps {
  deviceId: number
  render: (props: { onClick: () => void }) => ReactNode
}

export const DeviceEditForm = observer(
  ({ deviceId, render }: DeviceEditFormProps) => {
    const {
      store: { deviceStore },
    } = useStore()
    const [dialogOpen, setDialogOpen] = useState(false)

    const device = deviceStore.devices.find((device) => device.id === deviceId)

    const form = useForm<Omit<IDeviceForm, 'image'> & { image: FileList }>({
      defaultValues: { ...device, image: undefined },
    })

    const onSubmit = (data: unknown) => console.log(data)

    const { watch } = form

    return (
      <>
        {render({
          onClick: () => {
            setDialogOpen(true)
          },
        })}
        <Dialog open={dialogOpen} onOpenChange={() => setDialogOpen(false)}>
          <DialogContent>
            <div className="w-[500px] min-h-[250px] flex flex-col justify-start items-center">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-2"
                >
                  <DialogHeader className="mb-4">
                    <DialogTitle>Edit {device?.model}</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-1">
                    <FormField
                      control={form.control}
                      name="type_id"
                      render={({ field: { value, onChange } }) => (
                        <FormItem>
                          <FormLabel>Type</FormLabel>
                          <FormControl>
                            <Combobox
                              placeholder="Select type"
                              onSelect={onChange}
                              options={deviceStore?.types?.map(
                                ({ id, name }) => ({
                                  id,
                                  name,
                                })
                              )}
                              value={value}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="brand_id"
                      render={({ field: { value, onChange } }) => (
                        <FormItem>
                          <FormLabel>Brand</FormLabel>
                          <FormControl>
                            <Combobox
                              placeholder="Select brand"
                              onSelect={onChange}
                              options={deviceStore?.brands?.map(
                                ({ id, name }) => ({
                                  id,
                                  name,
                                })
                              )}
                              value={value}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    <FormField
                      control={form.control}
                      name="model"
                      rules={{
                        required: { value: true, message: 'Field is required' },
                      }}
                      render={({ field }) => (
                        <FormItem className="col-span-2">
                          <FormLabel>Model</FormLabel>
                          <FormControl>
                            <Input placeholder="Model Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="price"
                      rules={{
                        min: { value: 0, message: 'Has to be positive' },
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Price"
                              type="number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="image"
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    render={({ field: { value, onChange, ...field } }) => {
                      const files = watch('image')
                      return (
                        <div className="flex gap-2">
                          {device?.image.length && (
                            <img
                              className="size-[60px] border"
                              src={
                                import.meta.env.VITE_API_URL +
                                '/' +
                                device?.image[0]
                              }
                              alt="pic"
                            />
                          )}
                          {files &&
                            Array.from(files).map((file) => {
                              return (
                                <div className="border" key={file.name}>
                                  <img
                                    className="size-[60px] hover:brightness-50"
                                    src={URL.createObjectURL(file)}
                                    alt={file.name}
                                  />
                                </div>
                              )
                            })}
                          <FormItem className="hidden">
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="file"
                                multiple
                                id="file"
                                type="file"
                                onChange={(event) => {
                                  if (event.target.files)
                                    onChange(event.target.files)
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                          <Button
                            variant={'outline'}
                            className="size-[60px]"
                            onClick={() =>
                              document.getElementById('file')?.click()
                            }
                          >
                            <CirclePlus className="text-muted-foreground/50" />
                          </Button>
                        </div>
                      )
                    }}
                  />
                </form>
              </Form>
            </div>
            <DialogFooter>
              <Button variant={'outline'} onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    )
  }
)
