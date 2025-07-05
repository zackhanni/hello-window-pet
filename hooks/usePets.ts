// import { useQuery } from "@tanstack/react-query";

// export const usePets = () => {
//   return useQuery({
//     queryKey: ["pets"],
//     queryFn: async () => {
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/pets`
//       );
//       return res.data;
//     },
//     staleTime: 1000 * 60 * 5, // 5 minutes
//     cacheTime: 1000 * 60 * 10, // 10 minutes
//   });
// };
