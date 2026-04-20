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
    cnic: 42101-6123833-3,
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
    cnic: 42101-6123833-3,
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
    cnic: 42101-6123833-3,
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
    cnic: 42101-6123833-3,
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
    cnic: 42101-6123833-3,
    martialStatus: 'single',
    phoneNo: 3222382819,
    emailAddress: 'test@gmail.com',
    address: 'north karachi',
    status: 'Active'
   
  },
];

export default function PatientTable() {
  const [data, setData] = useState<any[]>([])

  // const { id } = useParams()
  

  const fetchPatient = async () => {
    const res = await getPatient()
      setData(res.data);
      console.log(res.data, 'res.data');
  }


  const deletePatient = async (id: any) => {
    console.log(id, 'id');
    
    if(window.confirm('Are you sure you want to delete?')) {
      const res = await deletPatient(id)
      console.log(res.data, 'id');
      setData((prev) => prev.filter((p) => p.id !== id));
    }
   
  }



  useEffect(() => {
  fetchPatient()
  }, [])
  return (
    <>
       <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      
      <div className="w-full overflow-x-hidden">
      <div style={{maxHeight: '350px', overflow: 'scrollY'}}>
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
              {data.map((patient: any) => (
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
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
    </>
  )
}
