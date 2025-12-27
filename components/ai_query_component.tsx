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

export type AiQueryData = {
  ID: string
  query?: string;
};

export interface AiQueryComponentProps {
  onSubmit: () => void;
  onAddData: (data: AiQueryData) => void;
}

const AICuqryComponent = ({ onAddData, onSubmit }: AiQueryComponentProps) => {
  const [data, setData] = useState<AiQueryData>({ID: uuidv4()});
  const [enableNextButton, setEnableNextButton] = useState<boolean>(true);

  return (
    <div>
      <Card className="xl:w-xl w-full">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">AI Query</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
             
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label className="text-xl" htmlFor="query">
                    Query
                  </Label>
                </div>
                <textarea
                  className="ring-1 ring-gray-100 p-2 rounded-md"
                  rows={3}
                  cols={50}
                  value={data.query}
                  onChange={(e) => {
                    setData((prevData) => ({
                      ...prevData,
                      query: e.target.value,
                      ID: uuidv4()
                    }));
                  }}
                  name="query"
                  placeholder="AI Query"
                  id="query"
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
                query: "",
                ID: uuidv4()
              });
              setEnableNextButton(false)
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

export default AICuqryComponent;
