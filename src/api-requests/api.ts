import { AxiosStatic } from "axios";
import { IPage, JobListing, PositionFunction } from "@/models/models";

export default class BaseApi {
  public axios!: AxiosStatic;
  protected baseUrl: string;

  constructor(url: string, axios: AxiosStatic) {
    this.baseUrl = url;
    this.axios = axios;
  }

  public getPositionFunctions = (): Promise<IPage<PositionFunction>> =>
    this.axios
      .get(`${this.baseUrl}job/position-functions/?page_size=100`)
      .then((response) => response.data);

  public getJobListings = (
    page_size: number | undefined,
    positionFunctions: Array<String>
  ): Promise<IPage<JobListing>> =>
    this.axios
      .get(
        `${
          this.baseUrl
        }job/listings/?page=1&page_size=${page_size}&use_pagination=True
        ${
          positionFunctions.length != 0
            ? "&position_functions=" + positionFunctions.join(",")
            : ""
        }`
      )
      .then((response) => response.data);
}
