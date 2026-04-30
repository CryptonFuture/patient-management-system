import React, { useState, useEffect } from 'react'
import ComponentCard from '../../../components/common/ComponentCard'
import { viewPatient } from '../../../utils/Services/patient';
import { useParams } from 'react-router';
import { useGetPatientByIdQuery } from '../../../utils/RTKQuery/Patients/ApiPatients';

export default function ViewPatient() {
    const { id }: any = useParams()
    const { data, error, isLoading } = useGetPatientByIdQuery(id);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading patient</p>;

    const patient = data?.data || data; 

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading patient</p>;

    return (
        <ComponentCard title="View Patient">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-500">

                {/* Basic Info */}
                <div className="col-span-3">
                    <h3 className="text-lg text-gray-900 font-medium">
                        Basic Information
                    </h3>
                </div>

                <div>
                    <p className="text-gray-900 font-normal">First Name</p>
                    <p>{patient?.firstname}</p>
                </div>

                <div>
                    <p className="text-gray-900 font-normal">Last Name</p>
                    <p>{patient?.lastname}</p>
                </div>

                <div>
                    <p className="text-gray-900 font-normal">Gender</p>
                    <p>{patient?.gender}</p>
                </div>

                <div>
                    <p className="text-gray-900 font-normal">Date Of Birth</p>
                    <p>{patient?.dateOfBirth}</p>
                </div>

                <div>
                    <p className="text-gray-900 font-normal">Age</p>
                    <p>{patient?.age}</p>
                </div>

                <div>
                    <p className="text-gray-900 font-normal">CNIC</p>
                    <p>{patient?.cnic}</p>
                </div>

                {/* Contact Info */}
                <div className="col-span-3 mt-4">
                    <h3 className="text-lg text-gray-900 font-medium">
                        Contact Information
                    </h3>
                </div>

                <div>
                    <p className="text-gray-900 font-normal">Phone</p>
                    <p>{patient?.contact?.phone}</p>
                </div>

                <div>
                    <p className="text-gray-900 font-normal">Email</p>
                    <p>{patient?.contact?.email}</p>
                </div>

                <div>
                    <p className="text-gray-900 font-normal">Address</p>
                    <p>{patient?.contact?.address}</p>
                </div>

                {/* Medical Info */}
                <div className="col-span-3 mt-4">
                    <h3 className="text-lg text-gray-900 font-medium">
                        Medical Information
                    </h3>
                </div>

                <div>
                    <p className="text-gray-900 font-normal">Blood Group</p>
                    <p>{patient?.medical?.bloodGroup}</p>
                </div>

                <div>
                    <p className="text-gray-900 font-normal">Allergies</p>
                    <p>{patient?.medical?.allergies}</p>
                </div>

                <div>
                    <p className="text-gray-900 font-normal">Diseases</p>
                    <p>{patient?.medical?.diseases}</p>
                </div>

                {/* Emergency Info */}
                <div className="col-span-3 mt-4">
                    <h3 className="text-lg text-gray-900 font-medium">
                        Emergency Contact
                    </h3>
                </div>

                <div>
                    <p className="text-gray-900 font-normal">Name</p>
                    <p>{patient?.emergency?.emergencyName}</p>
                </div>

                <div>
                    <p className="text-gray-900 font-normal">Phone</p>
                    <p>{patient?.emergency?.emergencyNumber}</p>
                </div>

                <div>
                    <p className="text-gray-900 font-normal">Marital Status</p>
                    <p>{patient?.emergency?.maritalStatus}</p>
                </div>

                {/* Registration Info */}
                <div className="col-span-3 mt-4">
                    <h3 className="text-lg text-gray-900 font-medium">
                        Registration Info
                    </h3>
                </div>

                <div>
                    <p className="text-gray-900 font-normal">Department</p>
                    <p>{patient?.registration?.department}</p>
                </div>

                <div>
                    <p className="text-gray-900 font-normal">Patient Type</p>
                    <p>{patient?.registration?.patientType}</p>
                </div>

                <div>
                    <p className="text-gray-900 font-normal">Registration Date</p>
                    <p>{patient?.registration?.registerDate}</p>
                </div>

                <div>
                    <p className="text-gray-900 font-normal">Doctor Assigned</p>
                    <p>{patient?.registration?.assignedDoctor}</p>
                </div>

            </div>
        </ComponentCard>
    )
}
