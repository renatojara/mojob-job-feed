<template>
  <div class="job-feed my-4">
    <div class="d-flex justify-space-between">
      <Treeselect
        v-model="positions"
        :flat="true"
        :multiple="true"
        :options="positionFunctions"
        :normalizer="normalizer"
        placeholder="FILTER BY POSITION"
        class="treeSelect"
        @input="positionFunctionChanged()"
        @blur="positionFunctionChanged()"
      />
      <v-select
        :items="sortItems"
        v-model="selected"
        item-text="text"
        item-value="value"
        class="select pb-12"
        @change="paginated()"
      ></v-select>
    </div>
    <div class="d-flex flex-column mt-4">
      <v-card
        class="mb-4"
        elevation="4"
        rounded="lg"
        v-for="(jobListing, i) in jobListings"
        :key="i"
      >
        <v-card-title>
          {{ jobListing.job.title }}
        </v-card-title>
        <v-card-text class="details">
          {{ jobListing.job.unit.display_name }}
          <span class="mx-1"> • </span>
          {{ jobListing.job.position_function.name_en }}
          <span class="mx-1"> • </span>
          {{ moment(jobListing.job.due_date).format("LLL") }}
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { JobListing, PositionFunction } from "@/models/models";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { node } from "@/models/node";
// @ts-ignore
import Treeselect from "@riophae/vue-treeselect/";

@Component({
  components: {
    Treeselect,
  },
})
export default class JobFeed extends Vue {
  @Prop({ default: () => [], type: Array as () => JobListing[] })
  private jobListings!: JobListing[];
  @Prop({ default: () => [], type: Array as () => PositionFunction[] })
  private positionFunctions!: PositionFunction[];

  private positions: Array<String> = [];

  private sortItems: any[] = [
    { value: 5, text: "5 Per Page" },
    { value: 25, text: "25 Per Page" },
    { value: 0, text: "Display all" },
  ];
  private selected: {} = { value: 5, text: "5 Per Page" };

  private moment = require("moment");

  public normalizer(node: node) {
    return {
      id: node.id,
      label: node.name,
      children: node.children,
    };
  }

  public paginated() {
    this.$emit("paginated", this.selected);
  }

  public positionFunctionChanged() {
    this.$emit("positionFunctionChanged", this.positions);
  }
}
</script>

<style scoped>
.treeSelect {
  max-width: 184px;
  max-height: 36px;
  align-self: center;
}
.select {
  max-width: 124px;
  max-height: 36px;
  font-weight: 900;
  font-size: 12px;
  letter-spacing: 1.3px;
}
.positionFilter {
}
</style>
