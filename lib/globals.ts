
import { AiQueryData } from "@/components/ai_query_component";
import { PersonaData } from "@/components/persona_component";
import { v4 as uuidv4 } from "uuid";

// To make things quicker I ignored using a db

export type TagModel = {
  ID: string;
  name: string;
};

export const globalTags: TagModel[] = [];

export function setGlobalTags(tags: string[]) {
  globalTags.length = 0;
  tags.forEach((t) => {
    globalTags.push({
      ID: uuidv4(),
      name: t,
    });
  });
}
export let globalWebsite = "";
export function setGlobalWebsite(w?: string) {
  if (w) globalWebsite = w;
}

export let globalWebsiteDescription = "";
export function setGlobalWebsiteDescription(w?: string) {
  if (w) globalWebsiteDescription = w;
}

export let globalPostPerWeek = 0;
export function setglobalPostPerWeek(post: number) {
  globalPostPerWeek = post;
}

export const globalPersonas: PersonaData[] = [];
export function setGlobalPersonas(personas: PersonaData[]) {
  globalPersonas.length = 0;
  globalPersonas.push(...personas);
}

export const globalQueries: AiQueryData[] = [];
export function setGlobalQueries(data: AiQueryData[]) {
  globalQueries.length = 0;
  globalQueries.push(...data);
}
