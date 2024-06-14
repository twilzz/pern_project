import { Image } from 'lucide-react'
import { useState } from 'react'
import { Form, useForm } from 'react-hook-form'
import { Combobox } from './Combobox'
import { IDeviceForm } from './DeviceForm'
import { Dialog, DialogContent } from './ui/dialog'
import { FormControl, FormField, FormItem, FormMessage } from './ui/form'
import { Input } from './ui/input'

interface DeviceEditFormProps {}

export const DeviceEditForm = ({}: DeviceEditFormProps) => {
  const [dialogOpen, setDialogOpen] = useState(false)

  const form = useForm<IDeviceForm>()

  return (
    <Dialog open={dialogOpen} onOpenChange={() => setDialogOpen(false)}>
      <DialogContent>
        <div className="w-[500px] h-[500px] flex flex-col justify-center items-center">
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
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
