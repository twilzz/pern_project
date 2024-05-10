import { createDeviceType, getDeviceType } from "@/api/deviceApi"
import { Button } from "@/components/ui/button"
import {  Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"

export const AdminPage = () => {

const form = useForm<{name:string}>({
    defaultValues: {
      name: '',
    },
  })

  function onSubmit({name:string}) {
    getDeviceType().then(data => console.log(data))
  }

  return (
    <div className="w-full flex items-center justify-center pt-8">
      <div className="w-[400px] rounded-lg border p-4 shadow-lg">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Devices Type</FormLabel>
                    <FormControl>
                      <Input placeholder="Devices Type" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter Devices Type
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Create type</Button>
            </form>
          </Form>
      </div>
    </div>)
}



  
