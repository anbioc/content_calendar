"use client";
import AICuqryComponent, { AiQueryData } from "@/components/ai_query_component";
import { setGlobalQueries } from "@/lib/globals";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const page = () => {

  const [data, setData] = useState<AiQueryData[]>([])
  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center">
      <AICuqryComponent
        onSubmit={function (): void {
          setGlobalQueries(data)
          redirect("/calendar")
        }}
        onAddData={function (data: AiQueryData): void {
          setData(prevData => [...prevData, data])
          toast(`${data.query} added to queries`)
        }}
      />
    </div>
  );
};

export default page;
