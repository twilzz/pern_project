import { createBrand, getAllBrands } from '@/api/deviceApi'
import axios from 'axios'
import { observer } from 'mobx-react-lite'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { DeleteEntry } from './DeleteEntry'
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

const deviceBrandSchema = z.object({
  brandName: z
    .string()
    .min(2, {
      message: 'Too short brand name',
    })
    .max(30, {
      message: 'Too long brand name',
    }),
})
export const BrandForm = observer(() => {
  const form = useForm<z.infer<typeof deviceBrandSchema>>({
    defaultValues: {
      brandName: '',
    },
  })

  const {
    store: {
      deviceStore: { setBrands, brands },
    },
  } = useStore()

  function onSubmit(data: z.infer<typeof deviceBrandSchema>) {
    createBrand(data.brandName)
      .then((data) => {
        toast({
          title: 'Successfully created',
          description: `${data.name} was created`,
        })
        getAllBrands().then((updatedData) => setBrands(updatedData))
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
          <p className="font-semibold">Add New Device Brand</p>
          <FormField
            control={form.control}
            name="brandName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Devices brand" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button type="submit">Create brand</Button>
          </div>
        </form>
      </Form>
      <Table className="border mt-4">
        <TableHeader className="bg-slate-200">
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="w-8" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {brands.map((brand) => {
            return (
              <TableRow key={brand.id}>
                <TableCell className="font-medium">{brand.id}</TableCell>
                <TableCell>{brand.name}</TableCell>
                <TableCell className="w-8 px-0.5">
                  <DeleteEntry entryId={brand.id} entryType="brand" />
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
