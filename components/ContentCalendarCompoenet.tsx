"use client";
import { ContentCalendar, createContentCalendar } from "@/lib/calendar.util";
import {
  globalPersonas,
  globalPostPerWeek,
  globalQueries,
  globalTags,
  globalWebsite,
  globalWebsiteDescription,
} from "@/lib/globals";
import React, { useEffect, useState } from "react";
import { Spinner } from "./ui/spinner";
import { formatDateSimple } from "@/lib/timeslot.util";

const ContentCalendarCompoenet = () => {
  const [result, setResult] = useState<ContentCalendar[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);

    const fetchCalendar = async () => {
      const result = await createContentCalendar({
        website: globalWebsite,
        description: globalWebsiteDescription,
        subreddits: globalTags,
        numOfPostPerWeeks: globalPostPerWeek,
        personas: globalPersonas,
        queries: globalQueries,
      });

      setResult(result);
      setLoading(false);
    };

    fetchCalendar();
  }, []);
  return (
    <div className="flex flex-col items-center justify-center  min-h-screen min-w-screen">
      {loading ? <Spinner /> : null}
      {result.length > 0 ? <ResultComponent result={result} /> : null}
    </div>
  );
};

function ResultComponent({ result }: { result: ContentCalendar[] }) {
  return (
    <div
      className="flex flex-col items-center gap-y-4 
    mt-10 ring-1 rounded-md ring-gray-200 py-4 px-2 mb-8"
    >
      <div className="flex items-center justify-center max-w-6xl px-4 pt-2 gap-x-3">
        <div className="w-40 text-xl font-semibold ">
          <h1>Subreddits</h1>
          <h1>Persona</h1>
        </div>

        <h1 className="w-60 text-xl font-semibold">title</h1>
        <h1 className="w-60 text-xl font-semibold">Body</h1>
        <h1 className="w-50 text-xl font-semibold">Query</h1>
        <h1 className="w-50 text-xl font-semibold">Date & Time</h1>
      </div>
      {result.map((item, index) => (
        <div>
          <div className="max-w-6xl flex items-center justify-center px-4 pt-2 gap-x-3">
            <div className="w-40  text-xl">
              <h1>{item.subreddit}</h1>
              <h1>{item.persona}</h1>
            </div>
            <div className="whitespace-pre-wrap w-60 text-xl font-semibold">
              {item.title}
            </div>

            <div className="whitespace-pre-wrap w-60 text-md font-semibold">
              {item.body}
            </div>

            <div className="whitespace-pre-wrap w-50 text-xl">
              {item.queryId}
            </div>

            <div className="whitespace-pre-wrap w-50 text-xl font-semibold">
              {formatDateSimple(item.time)}
            </div>
          </div>
          <hr  className="mt-4" />
        </div>
      ))}
    </div>
  );
}

export default ContentCalendarCompoenet;
