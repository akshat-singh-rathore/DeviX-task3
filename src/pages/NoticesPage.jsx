import { DashboardLayout } from '../components/layout/DashboardLayout'
import { NoticeBoard } from '../components/NoticeBoard'

export function NoticesPage() {
  return (
    <DashboardLayout title="Notice Board">
      <NoticeBoard />
    </DashboardLayout>
  )
}
