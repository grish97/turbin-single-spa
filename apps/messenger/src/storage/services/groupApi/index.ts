import { createSelector } from "@reduxjs/toolkit";
import { api as taskApi } from "./api";

export const selectGroupsResult = taskApi.endpoints.getGroups.select();
export const selectGroupData = createSelector(
  selectGroupsResult,
  groupResult => groupResult.data
);

export const { useGetGroupsQuery, useGetConversationsQuery } = taskApi;

export default taskApi;