import { PersonaData } from "@/components/persona_component";
import { globalPersonas, globalQueries, globalTags, TagModel } from "./globals";
import { AiQueryData } from "@/components/ai_query_component";
import { getTimeSlotsDaily, TimeSlot } from "./timeslot.util";
import {cycle} from "itertools"
import { v4 as uuidv4 } from "uuid";
import { sleep } from "./utils";
import { randomAIBody, sendQueryToAIAgent } from "./ai.util";


export interface ContenCalendarProps {
  website: string;
  description: string;
  subreddits: TagModel[];
  numOfPostPerWeeks: number;
  personas: PersonaData[];
  queries: AiQueryData[];
}

export interface ContentCalendar {
  id: string;
  subreddit: string;
  title: string;
  body: string;
  persona: string;
  time: Date;
  queryId: string[];
}

/**
 * Current allowed daily sub reddit post is max 2 but I set it to 5 for showcasing.
 */
const MAX_ALLOWED_POST_PER_SUBREDDIT = 5;

export async function createContentCalendar(
  data: ContenCalendarProps
): Promise<ContentCalendar[]> {

  await sleep(2000)
  const result: ContentCalendar[] = [];

  const postPerDay = data.numOfPostPerWeeks / 7;

  let subRedditMap: Map<string, number>;
  // iterate through next 7 days
  for (let i = 0; i < 7; i++) {
    let currentDate: Date = new Date();
    currentDate.setDate(currentDate.getDate() + i)
    subRedditMap = new Map<string, number>();
    const datetimes = getTimeSlotsDaily();

    // pick subeddits and AI queries using round-robin
    const subreddtIter = pickSubreddit()
    const queryIter = pickAQuery()
    const personaIter = pickPersona()

    // loop to push number of post per day
    for (let post = 0; post < postPerDay; post++) {
      const subreddit: string = subreddtIter.next().value;
      const query: AiQueryData = queryIter.next().value;
      const persona = personaIter.next().value


      if ((subRedditMap.get(subreddit) || 0) < MAX_ALLOWED_POST_PER_SUBREDDIT) {
        updateMap(subRedditMap, subreddit);

        // pick a priority date
        const time = datetimes.pop();
        console.log(`selected timeslot: ${JSON.stringify(time)}`)
        currentDate = updateTimeDate(currentDate, time!);

        console.log(`selected time: ${currentDate.toString()}`)


        const body = await queryAi(query.query || "");

        result.push({
          id: uuidv4(),
          subreddit: subreddit,
          title: query.query || "",
          body: body,
          persona: persona,
          time: currentDate,
          queryId: [query.ID],
        });
      } else {
        console.log(
          "subreddit post max limit reached, ignoring post to avoid banning from reddit"
        );
      }
    }
  }
  return result;
}

function pickPersona(): IterableIterator<string> {
  const personas = globalPersonas.map((p) => (p.name!))
  return cycle(personas)
}

function pickSubreddit(): IterableIterator<string> {
    
  const subreddits = globalTags.map((t) => (t.name))
    return cycle(subreddits)
}

function pickAQuery(): IterableIterator<AiQueryData> {
    return cycle(globalQueries)
}

async function queryAi(query: string) {
//   try {
// const result = await sendQueryToAIAgent(query)
//   return result as string
//   } catch(e) {
//     console.log(e)
//   }

return randomAIBody()
}

function updateMap(subRedditMap: Map<string, number>, subreddit: string) {
  if (subRedditMap.has(subreddit)) {
    subRedditMap.set(subreddit, (subRedditMap.get(subreddit) || 0) + 1);
  } else {
    subRedditMap.set(subreddit, 1);
  }
}

function updateTimeDate(currentDate: Date, time: TimeSlot) {
  const newDate = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth(),
  currentDate.getDate(),
  time.hour,    // hours
  time.minute,    // minutes
  time.seconds      // seconds
);

return newDate
  // return new Date(currentDate.setHours(time?.hour || 0, time?.minute || 0, time?.seconds || 0, 0));

}


