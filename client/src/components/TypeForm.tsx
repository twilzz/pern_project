import { createDeviceType, getAllTypes } from '@/api/deviceApi'
import axios from 'axios'
import { observer } from 'mobx-react-lite'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useStore } from './StoreContext'
import { Button } from './ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form'
import { Input } from './ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'
import { Toaster } from './ui/toaster'
import { toast } from './ui/use-toast'

const deviceTypeSchema = z.object({
  typeName: z
    .string()
    .min(2, {
      message: 'Too short type name',
    })
    .max(30, {
      message: 'Too long type name',
    }),
})

export const TypeForm = observer(() => {
  const form = useForm<z.infer<typeof deviceTypeSchema>>({
    defaultValues: {
      typeName: '',
    },
  })

  const {
    store: {
      deviceStore: { setTypes, types },
    },
  } = useStore()

  function onSubmit(data: z.infer<typeof deviceTypeSchema>) {
    createDeviceType(data.typeName)
      .then((data) => {
        toast({
          title: 'Successfully created',
          description: `${data.name} was created`,
        })
        getAllTypes().then((updatedData) => setTypes(updatedData))
        form.reset()
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          const message = error.response?.data.message
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
          <p className="font-semibold">Add New Device Type</p>
          <FormField
            control={form.control}
            name="typeName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Devices Type" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button type="submit">Create type</Button>
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
          {types.map((entry) => {
            return (
              <TableRow key={entry.id}>
                <TableCell className="font-medium">{entry.id}</TableCell>
                <TableCell>{entry.name}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <Toaster />
    </div>
  )
})
