import { cache } from "react";
import { ServerUrl } from "./config";
import axios from "axios";
export const fetchAllTrips = async (params) => {
  try {
    const response = await axios.post(`${ServerUrl}/tripPlans/getAllTripPlans`);

    if (response.data) {
      const data = response.data;
      console.log(data);
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchTripPlan = cache(async (slug) => {
  try {
    const response = await axios.get(`${ServerUrl}/tripPlans/viewTripPlan`, {
      params: { slug: slug },
    });

    if (response.data) {
      const data = response.data;
      console.log(data);
      return data;
    }
  } catch (error) {
    console.log(error);
  }
});

export const fetchTripByCategory = async (category) => {
  try {
    const response = await axios.post(
      `${ServerUrl}/tripPlans/getAllTripPlans`,
      { category: category }
    );

    if (response.data) {
      const data = response.data;
      console.log(data);
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchBatch = cache(async (slug) => {
  try {
    const response = await axios.get(`${ServerUrl}/tripRequirement/viewTrip`, {
      params: { slug: slug },
    });

    if (response.data) {
      const data = response.data;
      console.log(data);
      return data;
    }
  } catch (error) {
    console.log(error);
  }
});
