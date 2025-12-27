"use client";
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

export type WebsiteData = {
  website: string;
  description: string;
  postnumber: number;
};


export interface CompanyComponentProps {
  tags: string[];
  setTags: (tags: string[]) => void;
  onSubmit: (data: WebsiteData) => void;
}

const CompanyComponent = ({
  tags,
  setTags,
  onSubmit,
}: CompanyComponentProps) => {
  const [data, setData] = useState<WebsiteData>({website: "", description: "", postnumber: 1});
  return (
    <div>
      <Card className="xl:w-xl w-full">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Company Info</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="website" className="text-xl">
                  Website
                </Label>
                <Input
                  value={data.website}
                  onChange={(e) => {
                    setData((prevData) => ({
                      ...prevData,
                      website: e.target.value,
                    }));
                  }}
                  id="website"
                  type="url"
                  placeholder="https://www.example.com"
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
                  rows={2}
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

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label className="text-xl" htmlFor="subreddits">
                    subreddits
                  </Label>
                </div>
                <TagInput
                  value={tags}
                  onChange={(tag) => {
                    setTags(tag);
                  }}
                  id="subreddits"
                  placeholder="Add your tags..."
                  className="mb-4 max-w-xl"
                />
              </div>

              <div className="flex items-center justify-start gap-x-4">
                <div className="flex items-center">
                  <Label className="text-xl" htmlFor="postnumbers">
                    Number of post per week
                  </Label>
                </div>
                <Input
                  className="w-20"
                  value={data.postnumber}
                  onChange={(e) => {
                    setData(prevData => ({
                      ...prevData,
                      postnumber: toNumber(e.target.value)
                    }))
                  }}
                  id="postnumbers"
                  type="number"
                  placeholder=""
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2 mt-2">
          <Button
            onClick={() => {
              onSubmit(data);
            }}
            type="submit"
            className="w-full h-12 text-xl hover:cursor-pointer"
          >
            Next
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CompanyComponent;
