export type Sector = {
    id: string;
    name: string;
    slug: string;
    description: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
    paperIds: string[];
    papers: any[];
  };