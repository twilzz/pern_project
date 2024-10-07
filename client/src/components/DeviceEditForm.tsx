import { editDevice, getDeviceById } from '@/api/deviceApi'
import { IDevice } from '@/store/DeviceStore'
import { CirclePlus } from 'lucide-react'
import { observer } from 'mobx-react-lite'
import { ReactNode, useEffect, useState } from 'react'
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
import { Toaster } from './ui/toaster'
import { toast } from './ui/use-toast'

type EditDeviceForm = Omit<IDeviceForm, 'image'> & {
  image: string[]
  imagesForUpload: File[]
}

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
    const [loading, setLoading] = useState(false)
    const [device, setDevice] = useState<IDevice | null>(null)

    const form = useForm<EditDeviceForm>({
      defaultValues: { ...device, imagesForUpload: [] },
    })

    const fetchDevice = async () => {
      setLoading(true)
      await getDeviceById(deviceId)
        .then((data) => {
          setDevice(data)
        })
        .then(() => setLoading(false))
    }

    useEffect(() => {
      if (device) {
        form.reset({ ...device })
      }
    }, [device, form])

    function onSubmit(data: EditDeviceForm) {
      editDevice(data, deviceId).then(() => {
        toast({
          title: 'Successfully updated',
          description: `${data.model} was updated`,
        })
        setDialogOpen(false)
      })
    }

    return (
      <>
        {render({
          onClick: () => {
            setDialogOpen(true)
            fetchDevice()
          },
        })}
        <Dialog open={dialogOpen} onOpenChange={() => setDialogOpen(false)}>
          <DialogContent className="w-[500px] min-h-[250px] flex flex-col justify-start items-center">
            {loading ? (
              'LOADER'
            ) : (
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
                        required: {
                          value: true,
                          message: 'Field is required',
                        },
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
                  <div className="flex gap-2">
                    <FormField
                      control={form.control}
                      name="image"
                      render={({ field }) => {
                        return (
                          <div className="flex gap-2">
                            {field.value?.map((src) => (
                              <div className="relative">
                                <img
                                  className="size-[60px] border"
                                  src={import.meta.env.VITE_API_URL + '/' + src}
                                  alt="pic"
                                />
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="size-5 rounded-full absolute top-0 right-0"
                                  onClick={() => {
                                    field.onChange(
                                      field.value.filter(
                                        (element) => element !== src
                                      )
                                    )
                                  }}
                                >
                                  X
                                </Button>
                              </div>
                            ))}
                          </div>
                        )
                      }}
                    />
                    <FormField
                      control={form.control}
                      name="imagesForUpload"
                      // eslint-disable-next-line @typescript-eslint/no-unused-vars
                      render={({ field: { value, onChange, ...field } }) => {
                        return (
                          <div className="flex gap-2">
                            {value &&
                              Array.from(value).map((file) => {
                                return (
                                  <div
                                    className="border relative"
                                    key={file.name}
                                  >
                                    <img
                                      className="size-[60px] hover:brightness-50"
                                      src={URL.createObjectURL(file)}
                                      alt={file.name}
                                    />
                                    <Button
                                      variant="outline"
                                      size="icon"
                                      className="size-5 rounded-full absolute top-0 right-0"
                                      onClick={() => {
                                        const list = Array.from(value)
                                        onChange(
                                          list.filter(
                                            (e) => e.name !== file.name
                                          )
                                        )
                                      }}
                                    >
                                      X
                                    </Button>
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
                                    const fileList = Array.from(value)
                                    const files = event.target.files
                                    if (files) {
                                      if (
                                        files?.length === 1 &&
                                        !fileList.find(
                                          (file) =>
                                            file.name === files?.[0].name
                                        )
                                      ) {
                                        //добавление файла по одному
                                        onChange(fileList.concat(files[0]))
                                      } else {
                                        //добавление файлов пачкой

                                        //убираем повторяшки из выбранных файлов
                                        const filteredFiles = Array.from(
                                          files
                                        ).filter(
                                          (file) =>
                                            !fileList.find(
                                              (f) => f.name === file.name
                                            )
                                        )

                                        onChange(fileList.concat(filteredFiles))
                                      }
                                    }
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                            {form.getValues('image')?.length + value.length <
                              5 && (
                              <Button
                                variant={'outline'}
                                className="size-[60px]"
                                onClick={() =>
                                  document.getElementById('file')?.click()
                                }
                                type="button"
                              >
                                <CirclePlus className="text-muted-foreground/50" />
                              </Button>
                            )}
                          </div>
                        )
                      }}
                    />
                  </div>
                  <DialogFooter>
                    <Button
                      variant={'outline'}
                      onClick={() => setDialogOpen(false)}
                      type="button"
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={!form.formState.isDirty}>
                      Save
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            )}
          </DialogContent>
        </Dialog>
        <Toaster />
      </>
    )
  }
)
