import { cache } from "react";
import { ServerUrl } from "./config";
import axios from "axios";
export const fetchAllTrips = async (params) => {
  try {
    const response = await axios.post(`${ServerUrl}/tripPlans/getAllTripPlans`, {
      page: params?.page || 1,
      limit: params?.limit || 8, // increased default limit to show more trips
      category: params?.category,
      startDate: params?.startDate,
      endDate: params?.endDate
    });

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
    const response = await axios.get(`${ServerUrl}/tripRequirement/viewAllTrips`, {
      params: { slug: slug },
    });
    
    if (response.data) {
      const data = response.data;
      // console.log('batch>>>',data);
      return data;
    }
  } catch (error) {
    console.log('Batch data not found:', error);
    // Return a default empty object with result property to match expected structure
    return { result: {} };
  }
});

export const fetchAllCategories = cache(async () => {
  try {
    const response = await axios.get(`${ServerUrl}/tripcategory/getCategoryList`);
    
    if (response.data) {
      const data = response.data;
      return data.result;
    }
  } catch (error) {
    console.log('Failed to fetch categories:', error);
    return [];
  }
});
