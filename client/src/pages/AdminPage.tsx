import { BrandForm } from '@/components/BrandForm'
import { DeviceForm } from '@/components/DeviceForm'
import { TypeForm } from '@/components/TypeForm'
import { observer } from 'mobx-react-lite'

export const AdminPage = observer(() => {
  return (
    <div className="mt-6 flex justify-center gap-6">
      <TypeForm />
      <BrandForm />
      <DeviceForm />
    </div>
  )
})
