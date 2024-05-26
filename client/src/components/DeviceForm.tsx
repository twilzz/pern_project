import { createDevice } from '@/api/deviceApi'
import { IDeviceBrand, IDeviceType } from '@/store/DeviceStore'
import axios from 'axios'
import { Image } from 'lucide-react'
import { observer } from 'mobx-react-lite'
import { useFieldArray, useForm } from 'react-hook-form'
import { Combobox } from './Combobox'
import { useStore } from './StoreContext'
import { Button } from './ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Table, TableBody, TableHead, TableHeader, TableRow } from './ui/table'
import { Toaster } from './ui/toaster'

//todo add zod Schema
export interface IDeviceForm {
  model: string
  rating?: number
  price?: number
  brand_id?: IDeviceBrand['id']
  type_id?: IDeviceType['id']
  info?: { name: string; value: string }[]
  image?: File
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
      info: [{ name: '', value: '' }],
      image: undefined,
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'info',
  })
  const onAddOption = () => {
    if (fields.length <= 3) append({ name: '', value: '' })
  }
  const onDeleteOption = (index: number) => remove(index)

  function onSubmit(data: IDeviceForm) {
    createDevice({
      ...data,
      info: JSON.stringify(data.info),
    }).catch((error) => {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data.message
        if (typeof message === 'object') console.log(message)

        //   toast({
        //     variant: 'destructive',
        //     title: 'Something went wrong',
        //     description: message,
        //   })
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
                      options={deviceStore?.type?.map(({ id, name }) => ({
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
              if (value) {
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
                  name={`info.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Option Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`info.${index}.value`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Option value" {...field} />
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
      <Table className="border mt-4">
        <TableHeader className="bg-slate-200">
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {deviceStore.devices.map(({ id, model }) => {
            return (
              <TableRow>
                <TableHead className="w-[100px]">{id}</TableHead>
                <TableHead>{model}</TableHead>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <Toaster />
    </div>
  )
})
