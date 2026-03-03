import PageHeading from "@/component/ui/PageHeading";
import HotelStats from "@/component/share/HotelStats";

function Dashboard() {
  return (
    <div className="w-full flex flex-col gap-5">
      <PageHeading title="Dashboard"/>

      <HotelStats/>

    </div>
  )
}

export default Dashboard;