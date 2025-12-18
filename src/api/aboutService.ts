import axios from "axios";
import { ABOUT_API } from "./endpoints";

export interface AboutInfo {
  name: string;
  tagline: string;
  stats: {
    activeLearners: number;
    courses: number;
    satisfaction: number;
  };
}

export const getAboutInfo = async (): Promise<AboutInfo> => {
  const res = await axios.get<AboutInfo>(ABOUT_API.GET);
  return res.data;
};
