import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      headers.set("X-RapidAPI-Key", import.meta.env.VITE_X_RapidAPI_Key);
      headers.set("X-RapidAPI-Host", import.meta.env.VITE_X_RapidAPI_Host);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: (searchValue) => ({
        url: "/search",
        method: "GET",
        params: {
          q: searchValue,
          part: "snippet,id",
          regionCode: "US",
          maxResults: "50",
          order: "date",
        },
      }),
      transformResponse: (response) => {
        return response.items;
      },
    }),
    videoDetails: builder.query({
      query: (videoId) => ({
        url: "/videos",
        params: {
          part: "contentDetails,snippet,statistics",
          id: videoId,
        },
      }),
      transformResponse: (response) => {
        return response.items[0];
      },
    }),
    videoComments: builder.query({
      query: (videoId) => ({
        url: `/commentThreads`,
        method: "GET",
        params: {
          part: "snippet",
          videoId: videoId,
        },
      }),
      transformResponse: (response) => {
        return response.items;
      },
    }),
    suggestedVideos: builder.query({
      query: (videoId) => ({
        url: "/search",
        method: "GET",
        params: {
          relatedToVideoId: videoId,
          part: "id,snippet",
          type: "video",
          maxResults: "25",
        },
      }),
      transformResponse: (response) => {
        return response.items;
      },
    }),
    channels: builder.query({
      query: (channelId) => ({
        url: "/channels",
        method: "GET",
        params: {
          part: "snippet,statistics",
          id: channelId,
        },
      }),
      transformResponse: (response) => {
        return response.items[0];
      },
    }),
    channelVideos: builder.query({
      query: (channelId) => ({
        url: "/search",
        method: "GET",
        params: {
          channelId: channelId,
          part: "snippet,id",
          order: "date",
          maxResults: "50",
        },
      }),
      transformResponse: (response) => {
        return response.items;
      },
    }),
  }),
});
export const {
  useGetVideosQuery,
  useVideoDetailsQuery,
  useVideoCommentsQuery,
  useSuggestedVideosQuery,
  useChannelsQuery,
  useChannelVideosQuery,
} = apiSlice;
