"use client";
import PersonaComponent, { PersonaData } from "@/components/persona_component";
import { setGlobalPersonas } from "@/lib/globals";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const page = () => {
  const [data, setData] = useState<PersonaData[]>([]);
  return (
    <div className="min-h-screen min-w-screen flex flex-col items-center justify-center">
      <PersonaComponent
        onAddData={(data: PersonaData) => {
          toast(`${data.name} is added to persona list with ID ${data.ID}`);
          setData((prevData) => [...prevData, data]);
        }}
        onSubmit={() => {
          if (data.length == 0) {
            toast("Please add at least one persona");
            return;
          }

          setGlobalPersonas(data);

          redirect("/query");
        }}
      />
    </div>
  );
};

export default page;
