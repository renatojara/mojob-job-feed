<template>
  <div class="home">
    <job-feed
      :job-listings="jobListings"
      :position-functions="positionFunctionFilters"
      @paginated="paginated($event)"
      @positionFunctionChanged="positionFunctionsChanged($event)"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import JobFeed from "@/components/JobFeed.vue";
import BaseApi from "@/api-requests/api";
import { IPage, JobListing, PositionFunction } from "@/models/models";

@Component({
  components: {
    JobFeed,
  },
})
export default class Home extends Vue {
  private mojobApi: BaseApi | null = null;
  private positionFunctionFilters: PositionFunction[] = [];
  private jobListings: JobListing[] = [];
  private pageSize: number = 5;
  private positionFunctions: Array<String> = [];
  private count: number | undefined = 0;

  private async mounted() {
    this.mojobApi = new BaseApi(
      "https://test-api.mojob.io/public/",
      this.axios
    );
    await this.getJobListings();
    await this.getJobLocationFilters();
  }

  public async getJobListings() {
    try {
      const jobListingsResponsePage: IPage<JobListing> = await this.mojobApi!.getJobListings(
        this.pageSize === 0 ? this.count : this.pageSize ,
        this.positionFunctions
      );
      if (jobListingsResponsePage.results) {
        this.jobListings = jobListingsResponsePage.results;
        this.count = jobListingsResponsePage.count;
        console.log(this.jobListings);
      } else {
        console.log("Failed loading job listings");
      }
    } catch (e) {
      console.log("Failed loading job listings");
      console.log(e);
    }
  }

  public async getJobLocationFilters() {
    try {
      const jobLocationFiltersResponsePage: IPage<PositionFunction> = await this.mojobApi!.getPositionFunctions();
      if (jobLocationFiltersResponsePage.results) {
        this.positionFunctionFilters = jobLocationFiltersResponsePage.results;
        console.log(JSON.stringify(this.positionFunctionFilters, null, 2));
        console.log(this.positionFunctionFilters);
      } else {
        console.log("Failed loading position function filters");
      }
    } catch (e) {
      console.log("Failed loading position function filters");
      console.log(e);
    }
  }

  public async paginated(size: number) {
    this.pageSize = size;
    await this.getJobListings();
  }

  public async positionFunctionsChanged(positionFunctions: Array<String>) {
    this.positionFunctions = positionFunctions;
    await this.getJobListings();
  }
}
</script>
