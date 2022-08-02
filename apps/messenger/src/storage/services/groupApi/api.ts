import { sourceApi } from "storage/services/sourceApi";
import { apiRoutes } from "configs/apiRoutes";
import { IGroup } from "@group-api";

export const api = sourceApi.injectEndpoints({
  endpoints: (builder) => ({
    getGroups: builder.query<IGroup[], void>({
      query: () => apiRoutes.APP_GET_GROUPS.url,
      providesTags: (result) => {
        return result
          ? [
            ...result.map(({ id }) => ({ type: "Group" as const, id })),
            {type: "Group", id: "LIST"}
          ]
          : [{type: "Group", id: "LIST"}]
      },
    }),
    getConversations: builder.query<any[], void>({
      query: () => apiRoutes.APP_GET_CONVERSATIONS.url,
    }),
  }),
});