import {
  deleteBrandById,
  deleteDeviceById,
  deleteDeviceTypeById,
} from '@/api/deviceApi'
import axios from 'axios'
import { Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { Toaster } from './ui/toaster'
import { toast } from './ui/use-toast'

const entryTypeMap = {
  device: 'Device',
  deviceType: 'Device type',
  brand: 'Device brand',
}

export const DeleteEntry = ({
  entryId,
  entryType,
}: {
  entryId: number
  entryType: 'device' | 'deviceType' | 'brand'
}) => {
  const [dialogOpen, setDialogOpen] = useState(false)

  const deleteFunction = () => {
    if (entryType === 'brand')
      deleteBrandById(entryId).catch((e) => {
        if (axios.isAxiosError(e)) {
          toast({
            variant: 'destructive',
            title: 'Something went wrong',
            description: e.response?.data.message,
          })
        }
      })
    if (entryType === 'deviceType')
      deleteDeviceTypeById(entryId).catch((e) => {
        if (axios.isAxiosError(e)) {
          toast({
            variant: 'destructive',
            title: 'Something went wrong',
            description: e.response?.data.message,
          })
        }
      })
    if (entryType === 'device')
      deleteDeviceById(entryId).catch((e) => {
        if (axios.isAxiosError(e)) {
          toast({
            variant: 'destructive',
            title: 'Something went wrong',
            description: e.response?.data.message,
          })
        }
      })
  }

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger>
          <Button
            variant="outline"
            size="icon"
            className="size-6 p-1 hover:bg-slate-300"
          >
            <Trash2 />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Warning!</DialogTitle>
            <DialogDescription>
              Are you sure to delete {entryTypeMap[entryType]}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => deleteFunction()}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Toaster />
    </>
  )
}
