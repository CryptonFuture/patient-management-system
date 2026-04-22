import React, { useState, useEffect } from 'react'
import ComponentCard from '../../../components/common/ComponentCard'
import { viewPatient } from '../../../utils/Services/patient';
import { useParams } from 'react-router';

export default function ViewPatient() {
    const [patients, setPatients] = useState<any>({})

    const { id } = useParams()

    const patient = {
        id: 11,
        firstname: "tested",
        lastname: "test",
        gender: "male",
        maritalStatus: "single",
        address: "nk",
        dateOfBirth: "2026-04-08",
        cnic: "42101-6123833-9",
        phone: "03222382819",
        email: "apr003@gmail.com",
        age: 37,
        status: "Active",
        createdAt: "2026-04-09T11:36:45.704Z"
    };

    const fetchViewPatient = async () => {
        const res = await viewPatient(id)
        console.log(res);

        setPatients(res)
    }

    useEffect(() => {
        if (id) {
            fetchViewPatient()
        }
    }, [id])

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
                    <p>{patients?.firstname}</p>
                </div>

                <div>
                    <p className="text-gray-900 font-normal">Last Name</p>
                    <p>{patients?.lastname}</p>
                </div>

                <div>
                    <p className="text-gray-900 font-normal">Gender</p>
                    <p>{patients?.gender}</p>
                </div>

                <div>
                    <p className="text-gray-900 font-normal">Date Of Birth</p>
                    <p>{patients?.dateOfBirth}</p>
                </div>

                <div>
                    <p className="text-gray-900 font-normal">Age</p>
                    <p>{patients?.age}</p>
                </div>

                <div>
                    <p className="text-gray-900 font-normal">CNIC</p>
                    <p>{patients?.cnic}</p>
                </div>

                {/* Contact Info */}
                <div className="col-span-3 mt-4">
                    <h3 className="text-lg text-gray-900 font-medium">
                        Contact Information
                    </h3>
                </div>

                <div>
                    <p className="text-gray-900 font-normal">Phone</p>
                    <p>{patients?.contact?.phone}</p>
                </div>

                <div>
                    <p className="text-gray-900 font-normal">Email</p>
                    <p>{patients?.contact?.email}</p>
                </div>

                <div>
                    <p className="text-gray-900 font-normal">Address</p>
                    <p>{patients?.contact?.address}</p>
                </div>

                {/* Medical Info */}
                <div className="col-span-3 mt-4">
                    <h3 className="text-lg text-gray-900 font-medium">
                        Medical Information
                    </h3>
                </div>

                <div>
                    <p className="text-gray-900 font-normal">Blood Group</p>
                    <p>{patients?.medical?.bloodGroup}</p>
                </div>

                <div>
                    <p className="text-gray-900 font-normal">Allergies</p>
                    <p>{patients?.medical?.allergies}</p>
                </div>

                <div>
                    <p className="text-gray-900 font-normal">Diseases</p>
                    <p>{patients?.medical?.diseases}</p>
                </div>

                {/* Emergency Info */}
                <div className="col-span-3 mt-4">
                    <h3 className="text-lg text-gray-900 font-medium">
                        Emergency Contact
                    </h3>
                </div>

                <div>
                    <p className="text-gray-900 font-normal">Name</p>
                    <p>{patients?.emergency?.emergencyName}</p>
                </div>

                <div>
                    <p className="text-gray-900 font-normal">Phone</p>
                    <p>{patients?.emergency?.emergencyNumber}</p>
                </div>

                <div>
                    <p className="text-gray-900 font-normal">Marital Status</p>
                    <p>{patients?.emergency?.maritalStatus}</p>
                </div>

                {/* Registration Info */}
                <div className="col-span-3 mt-4">
                    <h3 className="text-lg text-gray-900 font-medium">
                        Registration Info
                    </h3>
                </div>

                <div>
                    <p className="text-gray-900 font-normal">Department</p>
                    <p>{patients?.registration?.department}</p>
                </div>

                <div>
                    <p className="text-gray-900 font-normal">Patient Type</p>
                    <p>{patients?.registration?.patientType}</p>
                </div>

                <div>
                    <p className="text-gray-900 font-normal">Registration Date</p>
                    <p>{patients?.registration?.registerDate}</p>
                </div>

                <div>
                    <p className="text-gray-900 font-normal">Doctor Assigned</p>
                    <p>{patients?.registration?.assignedDoctor}</p>
                </div>

            </div>
        </ComponentCard>
    )
}
