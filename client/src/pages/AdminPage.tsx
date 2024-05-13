import { BrandForm } from '@/components/BrandForm'
import { TypeForm } from '@/components/TypeForm'

export const AdminPage = () => {
  return (
    <div className=" mt-6 flex justify-center gap-6">
      <TypeForm />
      <BrandForm />
    </div>
  )
}
