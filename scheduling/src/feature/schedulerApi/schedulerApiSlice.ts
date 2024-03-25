import { FetchBaseQueryError, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCollection } from '../../firebase';
import { FirebaseCollection } from '../../constants';

export const schedulerApi = createApi({
  reducerPath: 'schedulerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SCHED_BACKEND_URL,
    prepareHeaders(headers) {
      return headers;
    },
  }),
  endpoints(builder) {
    return {
      fetchPeople: builder.query<People[], void>({
        queryFn: async () => {
          try {
            const { data } = await getCollection<People>(FirebaseCollection.People);
            return { data };
          } catch (error) {
            return { error: error as FetchBaseQueryError };
          }
        },
      }),
      fetchTask: builder.query<Task[], void>({
        queryFn: async () => {
          try {
            const { data } = await getCollection<Task>(FirebaseCollection.Task);
            return { data };
          } catch (error) {
            return { error: error as FetchBaseQueryError };
          }
        },
      }),
      fetchProject: builder.query<Project[], void>({
        queryFn: async () => {
          try {
            const { data } = await getCollection<Project>(FirebaseCollection.Project);
            return { data };
          } catch (error) {
            return { error: error as FetchBaseQueryError };
          }
        },
      }),
      fetchRoles: builder.query<Role[], void>({
        queryFn: async () => {
          try {
            const { data } = await getCollection<Role>(FirebaseCollection.Role);
            return { data };
          } catch (error) {
            return { error: error as FetchBaseQueryError };
          }
        },
      }),
      fetchDepartment: builder.query<Department[], void>({
        queryFn: async () => {
          try {
            const { data } = await getCollection<Department>(FirebaseCollection.Department);
            return { data };
          } catch (error) {
            return { error: error as FetchBaseQueryError };
          }
        },
      }),
      fetchTag: builder.query<Tag[], void>({
        queryFn: async () => {
          try {
            const { data } = await getCollection<Tag>(FirebaseCollection.Tag);
            return { data };
          } catch (error) {
            return { error: error as FetchBaseQueryError };
          }
        },
      }),
    };
  },
});

export const {
  useFetchPeopleQuery, useFetchProjectQuery,
  useFetchTaskQuery, useFetchRolesQuery,
  useFetchDepartmentQuery,
  useFetchTagQuery,
} = schedulerApi;
export default schedulerApi;
