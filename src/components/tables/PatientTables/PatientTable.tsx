import React, { useState, useEffect } from 'react'
import { deletPatient, editPatient, getPatient } from '../../../utils/Services/patient';
import { Pencil, Trash2, EyeIcon, EyeClosed, Eye, EyeClosedIcon, EyeOff, EyeOffIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { Link, useParams } from 'react-router'

import Badge from "../../ui/badge/Badge";

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

// Define the table data using the interface
const tableData: Order[] = [
  {
    id: 1,
    firstname: 'john',
    lastname: 'doe',
    gender: 'male',
    dateOfBirth: '18-11-1989',
    age: 25,
    cnic: 42101 - 6123833 - 3,
    martialStatus: 'single',
    phoneNo: 3222382819,
    emailAddress: 'test@gmail.com',
    address: 'north karachi',
    status: 'Active'

  },
  {
    id: 2,
    firstname: 'john',
    lastname: 'doe',
    gender: 'male',
    dateOfBirth: '18-11-1989',
    age: 25,
    cnic: 42101 - 6123833 - 3,
    martialStatus: 'single',
    phoneNo: 3222382819,
    emailAddress: 'test@gmail.com',
    address: 'north karachi',
    status: 'Active'

  },
  {
    id: 3,
    firstname: 'john',
    lastname: 'doe',
    gender: 'male',
    dateOfBirth: '18-11-1989',
    age: 25,
    cnic: 42101 - 6123833 - 3,
    martialStatus: 'single',
    phoneNo: 3222382819,
    emailAddress: 'test@gmail.com',
    address: 'north karachi',
    status: 'Active'

  },
  {
    id: 4,
    firstname: 'john',
    lastname: 'doe',
    gender: 'male',
    dateOfBirth: '18-11-1989',
    age: 25,
    cnic: 42101 - 6123833 - 3,
    martialStatus: 'single',
    phoneNo: 3222382819,
    emailAddress: 'test@gmail.com',
    address: 'north karachi',
    status: 'Active'

  },
  {
    id: 5,
    firstname: 'john',
    lastname: 'doe',
    gender: 'male',
    dateOfBirth: '18-11-1989',
    age: 25,
    cnic: 42101 - 6123833 - 3,
    martialStatus: 'single',
    phoneNo: 3222382819,
    emailAddress: 'test@gmail.com',
    address: 'north karachi',
    status: 'Active'

  },
];

export default function PatientTable({ search, setSearch }: { search: string, setSearch: any }) {
  const [data, setData] = useState<any[]>([])
  const [toast, setToast] = useState<{ message: string; type: string } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [jumpPage, setJumpPage] = useState('');

  const itemsPerPage = 5;

  // const { id } = useParams()

  const filteredData = data?.filter((patient: any) =>
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


  const fetchPatient = async () => {
    try {
      const res = await getPatient()

      console.log(res.data, 'res.data');
      const { data, message } = res;

      setData(data);

      if (!data || data.length === 0) {
        setToast({
          message: message || "No record found",
          type: "error",
        });
      } else {
        setToast({
          message: message || "Patients loaded successfully",
          type: "success",
        });
      }

      setTimeout(() => {
        setToast(null);
      }, 3000);

    } catch (error: any) {
      console.log(error, 'error');

      setToast({
        message: error?.response?.data?.message || "Something went wrong",
        type: "error",
      });

      setTimeout(() => {
        setToast(null);
      }, 3000);
    }

  }

  const deletePatient = async (id: any) => {
    console.log(id, 'id');

    if (window.confirm('Are you sure you want to delete?')) {
      const res = await deletPatient(id)
      console.log(res.data, 'id');
      setData((prev) => prev.filter((p) => p.id !== id));
    }

  }

  useEffect(() => {
    fetchPatient()
    setCurrentPage(1);
  }, [search])
  return (
    <>


      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">

        <div className="w-full overflow-x-hidden">
          <div style={{ maxHeight: '350px', overflow: 'scrollY' }}>

            <Table className='w-full table-fixed'>
              {/* Table Header */}
              <TableHeader className="border-b">
                <TableRow className='bg-gray-100 dark:bg-gray-800'>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-black-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    S.No
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-black-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Name
                  </TableCell>

                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-black-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    phone No
                  </TableCell>

                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-black-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Email Address
                  </TableCell>


                  <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-black-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Action
                  </TableCell>

                  {/* <TableCell
                  isHeader
                  className="whitespace-nowrap px-5 py-3 font-medium text-black-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Status
                </TableCell> */}

                </TableRow>
              </TableHeader>

              {/* Table Body */}
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {paginatedData && paginatedData.length > 0 ? (
                  paginatedData.map((patient: any) => (
                    <TableRow key={patient.id}>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {patient.id}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {patient.firstname} {patient.lastname}
                      </TableCell>

                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {patient.contact.phone}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {patient.contact.email}
                      </TableCell>

                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <div className="flex items-center gap-3">

                          <Link to={`/view-patient/${patient.id}`}>
                            <button

                              className="text-blue-500 hover:text-blue-700"
                            >
                              <EyeIcon size={18} />
                            </button>
                          </Link>

                          <Link to={`/edit-patient/${patient.id}`}>
                            <button

                              className="text-blue-500 hover:text-blue-700"
                            >
                              <Pencil size={18} />
                            </button>
                          </Link>
                          <button
                            onClick={() => patient.id && deletePatient(patient.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 size={18} />
                          </button>

                        </div>
                      </TableCell>
                      {/* <TableCell className="whitespace-nowrap px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                          <Badge
                              size="sm"
                              color={
                                  patient.status === "Active"
                                      ? "success"
                                      : patient.status === "Inactive"
                                          ? "warning"
                                          : "error"
                              }
                          >
                              {patient.status}
                          </Badge>
                      </TableCell> */}


                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5}>
                      <div className="flex items-center py-4 justify-center text-gray-500">
                        No record found
                      </div>
                    </TableCell>
                  </TableRow>
                )}

              </TableBody>
            </Table>

         
          </div>
          
        </div>
        
      </div>
      <div className="flex items-center justify-between mt-1 border border-gray-200 rounded-lg px-4 py-2">

        {/* LEFT INFO */}
        <div className="text-sm text-gray-500">
          Page {currentPage} of {totalPages}
        </div>

        {/* BUTTONS */}
        <div className="flex items-center gap-2">

          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="px-3 py-1 border rounded-md disabled:opacity-50"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 border rounded-md ${currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : ""
                }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-3 py-1 border rounded-md disabled:opacity-50"
          >
            Next
          </button>

        </div>

      </div>


      {/* <div className="flex flex-wrap items-center justify-between mt-1 border border-gray-200 rounded-lg px-4 py-2 gap-3">

        <div className="text-sm text-gray-500">
          Page {currentPage} of {totalPages}
        </div>

        <div className="flex items-center gap-2 text-sm">
          <span>Rows:</span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1); 
            }}
            className="border rounded-md px-2 py-1"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>

        <div className="flex items-center gap-2">

          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="px-3 py-1 border rounded-md disabled:opacity-50"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 border rounded-md ${currentPage === i + 1 ? "bg-blue-600 text-white" : ""
                }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-3 py-1 border rounded-md disabled:opacity-50"
          >
            Next
          </button>

        </div>

        <div className="flex items-center gap-2 text-sm">
          <span>Go to:</span>
          <input
            type="number"
            min={1}
            max={totalPages}
            value={jumpPage}
            onChange={(e) => setJumpPage(e.target.value)}
            className="w-16 border rounded-md px-2 py-1"
          />

          <button
            onClick={() => {
              const page = Number(jumpPage);
              if (page >= 1 && page <= totalPages) {
                setCurrentPage(page);
              }
            }}
            className="px-2 py-1 border rounded-md bg-gray-100 hover:bg-gray-200"
          >
            Go
          </button>
        </div>

      </div> */}
      {toast && (
        <div
          className={`fixed bottom-10 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg text-white transition-all
                ${toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}
        >
          {toast.message}
        </div>
      )}

    </>
  )
}
