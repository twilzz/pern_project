import { createDevice, getAllDevices } from '@/api/deviceApi'
import { IDeviceBrand, IDeviceType } from '@/store/DeviceStore'
import axios from 'axios'
import { Image, Pencil } from 'lucide-react'
import { observer } from 'mobx-react-lite'
import { useFieldArray, useForm } from 'react-hook-form'
import { Combobox } from './Combobox'
import { DeviceEditForm } from './DeviceEditForm'
import { useStore } from './StoreContext'
import { Button } from './ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Table, TableBody, TableCell, TableHeader, TableRow } from './ui/table'
import { Toaster } from './ui/toaster'
import { toast } from './ui/use-toast'

//todo add zod Schema
export interface IDeviceForm {
  model: string
  rating?: number
  price?: number
  brand_id?: IDeviceBrand['id']
  type_id?: IDeviceType['id']
  info?: { title: string; description: string }[]
  image?: File | File[]
}

export const DeviceForm = observer(() => {
  const {
    store: { deviceStore },
  } = useStore()
  const form = useForm<IDeviceForm>({
    defaultValues: {
      model: '',
      rating: undefined,
      price: undefined,
      brand_id: undefined,
      type_id: undefined,
      info: [{ title: '', description: '' }],
      image: undefined,
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'info',
  })
  const onAddOption = () => {
    if (fields.length <= 3) append({ title: '', description: '' })
  }
  const onDeleteOption = (index: number) => remove(index)

  function onSubmit(data: IDeviceForm) {
    createDevice({
      ...data,
      info: JSON.stringify(data.info),
    })
      .then((data) => {
        toast({
          title: 'Successfully created',
          description: `${data.model} was created`,
        })
        getAllDevices().then((updatedData) =>
          deviceStore.setDevices(updatedData)
        )
        form.reset()
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          const message = error.response?.data.message
          if (typeof message === 'object') console.log(message)
          toast({
            variant: 'destructive',
            title: 'Something went wrong',
            description: message,
          })
        }
        console.error(error)
      })
  }

  return (
    <div className="w-[400px] rounded-lg border p-4 shadow-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <p className="font-semibold">Add New Device</p>
          <div className="grid grid-cols-2 gap-1">
            <FormField
              control={form.control}
              name="type_id"
              render={({ field: { value, onChange } }) => (
                <FormItem>
                  <FormControl>
                    <Combobox
                      placeholder="Select type"
                      onSelect={onChange}
                      options={deviceStore?.types?.map(({ id, name }) => ({
                        id,
                        name,
                      }))}
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
                  <FormControl>
                    <Combobox
                      placeholder="Select brand"
                      onSelect={onChange}
                      options={deviceStore?.brands?.map(({ id, name }) => ({
                        id,
                        name,
                      }))}
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
              rules={{ min: { value: 0, message: 'Has to be positive' } }}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Price" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="image"
            render={({ field: { value, onChange, ...field } }) => {
              if (value && !Array.isArray(value)) {
                return (
                  <div className="flex items-center gap-2 ">
                    <Image /> {value.name}
                  </div>
                )
              } else {
                return (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Price"
                        type="file"
                        onChange={(event) => {
                          if (event.target.files)
                            onChange(event.target.files[0])
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }
            }}
          />

          {fields.map((field, index) => {
            return (
              <div key={index} className="flex gap-1 items-center">
                <FormField
                  control={form.control}
                  name={`info.${index}.title`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Option Title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`info.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Option Description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {index === 0 && (
                  <Button
                    variant={'outline'}
                    type="button"
                    onClick={onAddOption}
                    className="size-[40px]"
                  >
                    +
                  </Button>
                )}
                {index > 0 && index < 3 && (
                  <div className="flex flex-col">
                    <Button
                      variant={'outline'}
                      type="button"
                      onClick={onAddOption}
                      className="h-[20px] w-[40px]"
                    >
                      +
                    </Button>
                    <Button
                      variant={'outline'}
                      type="button"
                      onClick={() => onDeleteOption(index)}
                      className="h-[20px] w-[40px]"
                    >
                      -
                    </Button>
                  </div>
                )}
                {index === 3 && (
                  <Button
                    variant={'outline'}
                    type="button"
                    onClick={() => onDeleteOption(index)}
                    className="size-[40px]"
                  >
                    -
                  </Button>
                )}
              </div>
            )
          })}
          <div>
            <Button type="submit" className="justify-self-end">
              Create Device
            </Button>
          </div>
        </form>
      </Form>
      <Table className="border mt-4 table-fixed">
        <TableHeader className="bg-slate-200">
          <TableRow>
            <TableCell className="w-[50px]">Id</TableCell>
            <TableCell className="w-fit">Type</TableCell>
            <TableCell>Model</TableCell>
            <TableCell className="w-8 p-0" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {deviceStore.devices.map(({ id, model, type_id }) => {
            return (
              <TableRow>
                <TableCell>{id}</TableCell>
                <TableCell>
                  {
                    deviceStore.types.find(
                      (typeInStore) => typeInStore.id === type_id
                    )?.name
                  }
                </TableCell>
                <TableCell>{model}</TableCell>
                <TableCell className="w-8 pl-0">
                  <DeviceEditForm
                    deviceId={id}
                    render={(props) => (
                      <Button
                        variant="outline"
                        size="icon"
                        className="size-6 p-1 hover:bg-slate-300"
                        onClick={props.onClick}
                      >
                        <Pencil />
                      </Button>
                    )}
                  />
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <Toaster />
    </div>
  )
})
