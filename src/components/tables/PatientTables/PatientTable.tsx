import React, { useState, useEffect } from 'react'
import { useGetPatientsQuery, useDeletePatientMutation } from '../../../utils/RTKQuery/Patients/ApiPatients'
import { PTable } from '../PTable';

interface Order {
  id: number;
  firstname: string
  lastname: string
  gender: string
  dateOfBirth: any
  age: number
  cnic: number
  martialStatus: string
  phoneNo: number
  emailAddress: string
  address: string
  status: string
}

interface Patient {
  id: number;
  firstname: string
  lastname: string
  gender: string
  dateOfBirth: any
  age: number
  cnic: number
  martialStatus: string
  phoneNo: number
  emailAddress: string
  address: string
  status: string
}


export default function PatientTable({ search }: { search: string, setSearch: any }) {
   const { data, error, isLoading } = useGetPatientsQuery();
   const [deletePatient] = useDeletePatientMutation();

  const [toast] = useState<{ message: string; type: string } | null>(null);

  const patients = data?.data || data || [];

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);

  const filteredData = patients.filter((patient: any) =>
    `${patient.firstname} ${patient.lastname}`
      .toLowerCase()
      .includes(search.toLowerCase()) ||
    patient.contact?.phone?.toLowerCase().includes(search.toLowerCase()) ||
    patient.contact?.email?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / pageSize);

  const startIndex = (currentPage - 1) * pageSize;

  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + pageSize
  );


  const handleDelete  = async (id: any) => {
    console.log(id, 'id');

    if (window.confirm('Are you sure you want to delete?')) {
      const res = await deletePatient(id).unwrap()
      console.log(res.data, 'id');
    }

  }

  useEffect(() => {
    setCurrentPage(1);
  }, [search])


  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  return (
    <>
     <PTable 
      toast={toast}
      totalPages={totalPages}
      paginatedData={paginatedData}
      handleDelete={handleDelete}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
     />
    </>
  )
}
