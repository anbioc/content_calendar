"use client";
import { v4 as uuidv4 } from "uuid";
import React, { useState } from "react";
import TagInput from "./taginput";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toNumber } from "@/lib/utils";

export type PersonaData = {
  ID: string;
  name?: string;
  description?: string;
};

export interface CompanyComponentProps {
  onSubmit: () => void;
  onAddData: (data: PersonaData) => void;
}

const PersonaComponent = ({ onAddData, onSubmit }: CompanyComponentProps) => {
  const [data, setData] = useState<PersonaData>({ ID: uuidv4() });
  const [enableNextButton, setEnableNextButton] = useState<boolean>(true);
  const [id, setID] = useState<string>(uuidv4());

  return (
    <div>
      <Card className="xl:w-xl w-full">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Persona</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="website" className="text-xl">
                  Name
                </Label>
                <Input
                  value={data.name}
                  onChange={(e) => {
                    setData((prevData) => ({
                      ...prevData,
                      name: e.target.value,
                    }));
                  }}
                  id="name"
                  type="text"
                  placeholder="John"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label className="text-xl" htmlFor="description">
                    description
                  </Label>
                </div>
                <textarea
                  className="ring-1 ring-gray-100 p-2 rounded-md"
                  rows={3}
                  cols={50}
                  value={data.description}
                  onChange={(e) => {
                    setData((prevData) => ({
                      ...prevData,
                      description: e.target.value,
                    }));
                  }}
                  name="description"
                  placeholder="Company description"
                  id="description"
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex mt-2 items-center justify-between">
          <Button
            onClick={() => {
              onAddData(data);
              setData({
                ID: id,
                description: "",
                name: "",
              });
              setID(uuidv4());
              setEnableNextButton(false);
            }}
            type="button"
            className="h-12  text-xl hover:cursor-pointer me-6"
          >
            Add
          </Button>
          <Button
            onClick={() => {
              onSubmit();
            }}
            disabled={enableNextButton}
            type="submit"
            className="w-2/5 h-12 text-xl hover:cursor-pointer"
          >
            Next
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PersonaComponent;
