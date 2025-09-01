import PageTitle from "@/components/PageTitle";
import SectorsTable from "./table";
import { useSectorsQuery } from "./queries";
import Loader from "@/components/Loader";

export default function KnowledgeResearchPaperSectors() {


  const { data: sectors, isLoading, } = useSectorsQuery();

  

  return (
    <div className=" max-w-4xl space-y-6 w-full px-3 py-12 mx-auto">
      <PageTitle title="Sectors" subtitle="Manage the sectors for the research papers and blogs" titleHref="/knowledge/sectors" />
      {isLoading ? <Loader /> : <SectorsTable sectors={sectors || []} />}
    </div>
  )
}