import { createDevice } from '@/api/deviceApi'
import { IDeviceBrand, IDeviceType } from '@/store/DeviceStore'
import axios from 'axios'
import { Image } from 'lucide-react'
import { observer } from 'mobx-react-lite'
import { useForm } from 'react-hook-form'
import { Combobox } from './Combobox'
import { useStore } from './StoreContext'
import { Button } from './ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Table, TableBody, TableHead, TableHeader, TableRow } from './ui/table'
import { Toaster } from './ui/toaster'

//todo add zod Schema
export interface IDeviceForm {
  name: string
  rating?: number
  price?: number
  brand_id?: IDeviceBrand['id']
  type_id?: IDeviceType['id']
  info?: string
  image?: File
}

export const DeviceForm = observer(() => {
  const {
    store: { deviceStore },
  } = useStore()
  const form = useForm<IDeviceForm>({
    defaultValues: {
      name: '',
      rating: undefined,
      price: undefined,
      brand_id: undefined,
      type_id: undefined,
      info: undefined,
      image: undefined,
    },
  })

  function onSubmit(data: IDeviceForm) {
    createDevice(data).catch((error) => {
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
              name="name"
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
          <div className="flex justify-between">
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
        <TableBody></TableBody>
      </Table>
      <Toaster />
    </div>
  )
})
