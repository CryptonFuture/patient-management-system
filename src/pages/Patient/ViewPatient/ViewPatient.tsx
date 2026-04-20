import React, { useState, useEffect } from 'react'
import ComponentCard from '../../../components/common/ComponentCard'
import { viewPatient } from '../../../utils/Services/patient';
import { useParams } from 'react-router';

export default function ViewPatient() {
    const [ patients, setPatients ] = useState<any>({})

    const {id} = useParams()

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
        if(id) {
            fetchViewPatient()
        }
    }, [id])

  return (
      <ComponentCard title="View Patient">
  <div className="flex flex-wrap gap-4">

    {/* Basic Info */}
    <div className="w-full">
      <h3 className="font-semibold text-lg">Basic Information</h3>
    </div>

    <div className="w-full sm:w-1/2 lg:w-1/3">
      <p><strong>First Name:</strong> {patients?.firstname}</p>
    </div>

    <div className="w-full sm:w-1/2 lg:w-1/3">
      <p><strong>Last Name:</strong> {patients?.lastname}</p>
    </div>

    <div className="w-full sm:w-1/2 lg:w-1/3">
      <p><strong>Gender:</strong> {patients?.gender}</p>
    </div>

    <div className="w-full sm:w-1/2 lg:w-1/3">
      <p><strong>Date Of Birth:</strong> {patients?.dateOfBirth}</p>
    </div>

    <div className="w-full sm:w-1/2 lg:w-1/3">
      <p><strong>Age:</strong> {patients?.age}</p>
    </div>

    <div className="w-full sm:w-1/2 lg:w-1/3">
      <p><strong>CNIC:</strong> {patients?.cnic}</p>
    </div>

    {/* Contact Info */}
    <div className="w-full">
      <h3 className="font-semibold text-lg mt-4">Contact Information</h3>
    </div>

    <div className="w-full sm:w-1/2 lg:w-1/3">
      <p><strong>Phone:</strong> {patients?.contact?.phone}</p>
    </div>

    <div className="w-full sm:w-1/2 lg:w-1/3">
      <p><strong>Email:</strong> {patients?.contact?.email}</p>
    </div>

    <div className="w-full sm:w-1/2 lg:w-1/3">
      <p><strong>Address:</strong> {patients?.contact?.address}</p>
    </div>

    {/* Medical Info */}
    <div className="w-full">
      <h3 className="font-semibold text-lg mt-4">Medical Information</h3>
    </div>

    <div className="w-full sm:w-1/2 lg:w-1/3">
      <p><strong>Blood Group:</strong> {patients?.medical?.bloodGroup}</p>
    </div>

    <div className="w-full sm:w-1/2 lg:w-1/3">
      <p><strong>Allergies:</strong> {patients?.medical?.allergies}</p>
    </div>

    <div className="w-full sm:w-1/2 lg:w-1/3">
      <p><strong>Diseases:</strong> {patients?.medical?.diseases}</p>
    </div>

    {/* Emergency Info */}
    <div className="w-full">
      <h3 className="font-semibold text-lg mt-4">Emergency Contact</h3>
    </div>

    <div className="w-full sm:w-1/2 lg:w-1/3">
      <p><strong>Name:</strong> {patients?.emergency?.emergencyName}</p>
    </div>

    <div className="w-full sm:w-1/2 lg:w-1/3">
      <p><strong>Phone:</strong> {patients?.emergency?.emergencyNumber}</p>
    </div>

    <div className="w-full sm:w-1/2 lg:w-1/3">
      <p><strong>Marital Status:</strong> {patients?.emergency?.maritalStatus}</p>
    </div>

    {/* Registration Info */}
    <div className="w-full">
      <h3 className="font-semibold text-lg mt-4">Registration Info</h3>
    </div>

    <div className="w-full sm:w-1/2 lg:w-1/3">
      <p><strong>Department:</strong> {patients?.registration?.department}</p>
    </div>

    <div className="w-full sm:w-1/2 lg:w-1/3">
      <p><strong>patient Type:</strong> {patients?.registration?.patientType}</p>
    </div>

    <div className="w-full sm:w-1/2 lg:w-1/3">
      <p><strong>Registration Date:</strong> {patients?.registration?.registerDate}</p>
    </div>

    <div className="w-full sm:w-1/2 lg:w-1/3">
      <p><strong>Doctor Assigned:</strong> {patients?.registration?.assignedDoctor}</p>
    </div>

  </div>
</ComponentCard>
  )
}
