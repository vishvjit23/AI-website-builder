"use client"

import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query";

export const Client = () => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.hello.queryOptions({ text: "vishvjit, it's a prefetch query" }))

    return (
        <div className="text-center">
            {JSON.stringify(data)}
        </div>
    )
}