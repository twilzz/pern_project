import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ROUTES } from '@/utils/constants'
import { useNavigate } from 'react-router-dom'

export const PageNotFound = () => {
  const navigate = useNavigate()
  return (
    <div className="w-full flex items-center justify-center pt-8">
      <Card className="w-[400px] rounded-lg border p-4 shadow-lg">
        <CardHeader>
          <CardTitle className="flex justify-center">
            404 Page Not Found
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button onClick={() => navigate(ROUTES.SHOP)}>Main Page</Button>
        </CardContent>
      </Card>
    </div>
  )
}
