import { Card } from "@/components/ui/card";
import { AppointmentsList } from "../../../components/appointments-list";
import { StatsCards } from "../../../components/stats-cards";
import { PerformanceCharts } from "../../../components/performance-charts";
import { QuickSchedule } from "../../../components/quick-schedule";

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <StatsCards />
      <PerformanceCharts />
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <div className="flex flex-col h-[450px] p-6">
            <h2 className="text-2xl font-semibold tracking-tight">Upcoming Appointments</h2>
            <AppointmentsList />
          </div>
        </Card>
        <Card className="col-span-3">
          <div className="flex flex-col h-[450px]">
            <QuickSchedule />
          </div>
        </Card>
      </div>
    </div>
  );
}