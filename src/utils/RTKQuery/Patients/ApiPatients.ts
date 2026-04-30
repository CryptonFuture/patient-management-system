import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from '../Api/axiosBaseQuery'
import { patients } from '../../endpoints/endepoints'

export const patientApi = createApi({
    reducerPath: 'patientApi',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['Patients'],
    endpoints: (builder) => ({
        getPatients: builder.query<any, void>({
            query: () => ({
                url: `${patients}`,
                method: 'GET'
            }),
            providesTags: ['Patients']
        }),
      
        deletePatient: builder.mutation<any, number>({
            query: (id) => ({
              url: `${patients}/${id}`,
              method: 'DELETE'  
            }),
            invalidatesTags: ['Patients']
        }),

        addPatient: builder.mutation<any, any>({
            query: (body) => ({
              url: `${patients}`,
              method: 'POST',
              data: body  
            }),
            invalidatesTags: ['Patients']
        }),

        getPatientById: builder.query<any, number>({
            query: (id) => ({
                url: `${patients}/${id}`,
                method: 'GET',
            }),
            
        }),

        updatePatient: builder.mutation<any, { id: number; body: any }>({
            query: ({ id, body }) => ({
                url: `${patients}/${id}`,
                method: 'PUT', 
                data: body,
            }),
            invalidatesTags: ['Patients'], 
        }),
    })
})

export const {
    useGetPatientsQuery, 
    useDeletePatientMutation,
    useAddPatientMutation,
    useGetPatientByIdQuery,
    useUpdatePatientMutation, 
} = patientApi