import { BrandForm } from '@/components/BrandForm'
import { DeviceForm } from '@/components/DeviceForm'
import { useStore } from '@/components/StoreContext'
import { TypeForm } from '@/components/TypeForm'
import { observer } from 'mobx-react-lite'

export const AdminPage = observer(() => {
  const {
    store: {
      userStore: { isAuth },
    },
  } = useStore()

  console.log(isAuth)

  if (!isAuth) return <div>U're not authorized</div>

  return (
    <div className="mt-6 flex justify-center gap-6">
      <TypeForm />
      <BrandForm />
      <DeviceForm />
    </div>
  )
})
