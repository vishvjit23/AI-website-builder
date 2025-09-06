import { getQueryClient, trpc } from "@/trpc/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Client } from "./client";
import { Suspense } from "react";

export default function Home() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.hello.queryOptions({ text: "vishvjit, it's a prefetch query" }))
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Client />
      </Suspense>
    </HydrationBoundary>
  );
}
