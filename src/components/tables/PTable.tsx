import React from 'react'
import { Pencil, Trash2, EyeIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Link } from 'react-router'

interface PTableProps {
  toast: any
  totalPages: number;
  paginatedData: any[];
  handleDelete: (id: string | number) => void;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export const PTable: React.FC<PTableProps> = ({toast, totalPages, paginatedData, handleDelete, currentPage, setCurrentPage}) => {
  return (
    <>
     <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="w-full overflow-x-hidden">
          <div style={{ maxHeight: '350px', overflow: 'scrollY' }}>
            <Table className='w-full table-fixed'>
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
                            onClick={() => patient.id && handleDelete(patient.id)}
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

        <div className="text-sm text-gray-500">
          Page {currentPage} of {totalPages}
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

      <div
        className={`fixed bottom-10 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg text-white transition-all duration-300 ease-in-out
    ${toast
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-5 scale-95 pointer-events-none"
          }
    ${toast?.type === "success" ? "bg-green-600" : "bg-red-600"}
  `}
      >
        {toast?.message}
      </div>
    </>
  )
}
