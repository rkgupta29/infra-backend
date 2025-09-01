import { apiRequest } from "@/api";
import { useQuery, useMutation } from "@tanstack/react-query";
import { type  Sector } from "./types";

// Query to get all sectors
export const useSectorsQuery =  () => useQuery({
  queryKey: ["knowledge", "sectors"],
  queryFn: async () => {
    const response = await apiRequest<Sector[]>("GET", "/knowledge/sectors");
    return response;
  },
});

// Mutation to toggle sector visibility status by id
export const useToggleSectorStatus = () => useMutation({
  mutationFn: async (id: string) => {
    const response = await apiRequest<Sector>("PATCH", `/knowledge/sectors/${id}/toggle-status`);
    return response;
  },
});

// Mutation to delete a sector by id
export const useDeleteSector = () => useMutation({
  mutationFn: async (id: string) => {
    const response = await apiRequest<void>("DELETE", `/knowledge/sectors/${id}`);
    return response;
  },
});
export const useUpdateSector = () => useMutation({
    mutationFn: async ({id,data}: {id: string,data: Partial<Sector>}) => {
      const response = await apiRequest<void>("PATCH", `/knowledge/sectors/${id}`, data);
      return response;
    },
  });
  

// Mutation to create a new sector
export const useCreateSector = () => useMutation({
  mutationFn: async (data: { name: string; slug: string; active?: boolean }) => {
    const response = await apiRequest<Sector>("POST", `/knowledge/sectors`, data);
    return response;
  },
});

