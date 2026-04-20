import React, { useState, useEffect } from 'react'
import ComponentCard from "../../../components/common/ComponentCard.tsx";
import Label from "../../../components/form/Label.tsx";
import Input from "../../../components/form/input/InputField.tsx";
import Select from "../../../components/form/Select.tsx";
import { EyeCloseIcon, EyeIcon, TimeIcon } from "../../../icons";
import DatePicker from "../../../components/form/date-picker.tsx";
import { addPatient, getGender } from '../../../utils/Services/patient.tsx';
import { useNavigate } from 'react-router'

export default function AddPatient() {
    const [toast, setToast] = useState<{ message: string; type: string } | null>(null);

    const [gender, setGender] = useState<any[]>([])

    const navigate = useNavigate()

    const [patient, setPatient] = useState({
        firstname: "",
        lastname: "",
        gender: "",
        dateOfBirth: "",
        cnic: "",
        age: "",
        phone: "",
        alternatePhone: "",
        city: "",
        country: "",
        email: "",
        address: "",
        bloodGroup: "",
        height: "",
        weight: "",
        allergies: "",
        diseases: "",
        medications: "",
        emergencyName: "",
        emergencyNumber: "",
        insuranceProvider: "",
        maritalStatus: "",
        occupation: "",
        patientType: "",
        department: "",
        assignedDoctor: "",
        registerDate: ""
    })

    const handOnChangeInput = (e: any) => {
        const { name, value } = e.target
        setPatient({ ...patient, [name]: value })
    }

    const handleSelectChange = (value: string) => {
        setPatient({ ...patient, gender: value });
    };

    const handleOnCitySelectChange = (value: string) => {
        setPatient({ ...patient, city: value });
    };

    const handleOnCountrySelectChange = (value: string) => {
        setPatient({ ...patient, country: value });
    };


    const handleOnSubmit = async () => {
        try {
            const payload = {
                firstname: patient.firstname,
                lastname: patient.lastname,
                gender: patient.gender,
                dateOfBirth: patient.dateOfBirth,
                cnic: patient.cnic,
                age: patient.age,
                phone: patient.phone,
                alternatePhone: patient.alternatePhone,
                city: patient.city,
                country: patient.country,
                email: patient.email,
                address: patient.address,
                bloodGroup: patient.bloodGroup,
                height: patient.height,
                weight: patient.weight,
                allergies: patient.allergies,
                diseases: patient.diseases,
                medications: patient.medications,
                emergencyName: patient.emergencyName,
                emergencyNumber: patient.emergencyNumber,
                insuranceProvider: patient.insuranceProvider,
                maritalStatus: patient.maritalStatus,
                occupation: patient.occupation,
                patientType: patient.patientType,
                department: patient.department,
                assignedDoctor: patient.assignedDoctor,
                registerDate: patient.registerDate

            }

            const res = await addPatient(payload)


            setToast({
                message: res?.data?.message || "Patient created successfully",
                type: "success"
            });

            setPatient(res.data)

            setTimeout(() => {
                setToast(null);
                navigate('/patient');
            }, 2000);

        } catch (error: any) {

            console.log(error?.response, 'error');

            setToast({
                message:
                    error?.response?.data?.message ||
                    error?.response?.data?.error ||
                    "Something went wrong",
                type: "error"
            });

            setTimeout(() => setToast(null), 2000);
        }


    }

    const fetchGender = async () => {
        const res = await getGender()
        console.log(res.data, 'gender');

        setGender(res.data)
    }


    useEffect(() => {
        fetchGender()
    }, [])

    // const options = [
    //     { value: "male", label: "male" },
    //     { value: "female", label: "female" },
    // ];

    const country = [
        { value: "pakistan", label: "pakistan" },
        { value: "india", label: "india" },
    ]

    const city = [
        { value: "karachi", label: "karachi" },
        { value: "dehli", label: "dehli" },
    ]

    const options = gender?.map((item: any) => ({
        value: item.gender,
        label: item.gender
    }))

    return (
        <ComponentCard title="Add Patient">

            <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Basic Patient Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>
                    <Label htmlFor="input">First Name</Label>
                    <Input name='firstname' onChange={handOnChangeInput} type="text" id="input" />
                </div>

                <div>
                    <Label htmlFor="input">Last Name</Label>
                    <Input name='lastname' onChange={handOnChangeInput} type="text" id="input" />
                </div>

                <div>
                    <Label>Gender</Label>
                    <Select

                        options={options}
                        placeholder="Select an option"
                        onChange={handleSelectChange}
                        className="dark:bg-dark-900"
                    />
                </div>

                <div>
                    <DatePicker

                        id="date-picker"
                        label="Date Of Birth"
                        placeholder="Select a date"
                        onChange={(dates, currentDateString) => {
                            setPatient({ ...patient, dateOfBirth: currentDateString });
                        }}
                    />
                </div>


                <div>
                    <Label htmlFor="input">Cnic</Label>
                    <Input name='cnic' onChange={handOnChangeInput} type="text" id="input" />
                </div>



                <div>
                    <Label htmlFor="input">Age</Label>
                    <Input name='age' onChange={handOnChangeInput} type="text" id="input" />
                </div>


            </div>

            <h2 className="text-lg font-semibold text-gray-700 mt-8 mb-4">
                Contact Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>
                    <Label htmlFor="input">Phone No</Label>
                    <Input name='phone' onChange={handOnChangeInput} type="text" id="input" />
                </div>

                <div>
                    <Label htmlFor="input">Alternate No</Label>
                    <Input name='alternatePhone' onChange={handOnChangeInput} type="text" id="input" />
                </div>

                <div>
                    <Label htmlFor="inputTwo">Email Address</Label>
                    <Input name='email' onChange={handOnChangeInput} type="text" id="inputTwo" placeholder="info@gmail.com" />
                </div>

                <div>
                    <Label htmlFor="input">Address</Label>
                    <Input name='address' onChange={handOnChangeInput} type="text" id="input" />
                </div>

                <div>
                    <Label htmlFor="input">City</Label>
                    <Select

                        options={city}
                        placeholder="Select an City"
                        onChange={handleOnCitySelectChange}
                        className="dark:bg-dark-900"
                    />
                </div>

                <div>
                    <Label htmlFor="input">Country</Label>
                    <Select

                        options={country}
                        placeholder="Select an Country"
                        onChange={handleOnCountrySelectChange}
                        className="dark:bg-dark-900"
                    />
                </div>

            </div>

            <h2 className="text-lg font-semibold text-gray-700 mt-8 mb-4">
                Medical Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>
                    <Label>Blood Group</Label>
                    <Input onChange={handOnChangeInput} name="bloodGroup" type="text" />
                </div>

                <div>
                    <Label>Height (cm)</Label>
                    <Input onChange={handOnChangeInput} name="height" type="number" />
                </div>

                <div>
                    <Label>Weight (kg)</Label>
                    <Input onChange={handOnChangeInput} name="weight" type="number" />
                </div>

                <div>
                    <Label>Allergies</Label>
                    <Input onChange={handOnChangeInput} name="allergies" type="text" />
                </div>

                <div>
                    <Label>Chronic Diseases</Label>
                    <Input onChange={handOnChangeInput} name="diseases" type="text" />
                </div>

                <div>
                    <Label>Current Medications</Label>
                    <Input onChange={handOnChangeInput} name="medications" type="text" />
                </div>

                {/* <div>
                    <Label>Medical History</Label>
                    <Input name="medicalHistory" type="text" />
                </div> */}

            </div>

            <h2 className="text-lg font-semibold text-gray-700 mt-8 mb-4">
                Registration / Hospital Info
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>
                    <Label>Patient Type</Label>
                    {/* <Select
                        options={[
                            { label: "New", value: "new" },
                            { label: "Returning", value: "returning" }
                        ]}
                        placeholder="Select Patient Type"
                        onChange={(val) =>
                            setPatient({ ...patient, patientType: val.value })
                        }
                        className="dark:bg-dark-900"
                    /> */}
                    <Input onChange={handOnChangeInput} name="patientType" type="text" />
                </div>

                <div>
                    <Label>Department</Label>
                    <Input name="department" onChange={handOnChangeInput} type="text" />
                </div>

                <div>
                    <Label>Assigned Doctor</Label>
                    <Input name="assignedDoctor" onChange={handOnChangeInput} type="text" />
                </div>

                <div>
                    <Label>Registration Date</Label>
                    <DatePicker
                        id="reg-date"
                        label=""
                        placeholder="Select date"
                        onChange={(dates, currentDateString) => {
                            setPatient({ ...patient, registerDate: currentDateString });
                        }}
                    />
                </div>
            </div>

            <h2 className="text-lg font-semibold text-gray-700 mt-8 mb-4">
                Emergency & Additional Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>
                    <Label>Emergency Contact Name</Label>
                    <Input
                        onChange={handOnChangeInput}
                        name="emergencyName"
                        type="text"
                    />
                </div>

                <div>
                    <Label>Emergency Contact Number</Label>
                    <Input
                        onChange={handOnChangeInput}
                        name="emergencyNumber"
                        type="text"
                    />
                </div>

                <div>
                    <Label>Insurance Provider</Label>
                    <Input
                        onChange={handOnChangeInput}
                        name="insuranceProvider"
                        type="text"
                    />
                </div>

                <div>
                    <Label>Marital Status</Label>
                    <Input
                        name='maritalStatus'
                        onChange={handOnChangeInput}
                        type="text"
                    />
                </div>

                <div>
                    <Label>Occupation</Label>
                    <Input
                        onChange={handOnChangeInput}
                        name="occupation"
                        type="text"
                    />
                </div>

            </div>


            <div className="mt-6 flex justify-end">
                <button
                    onClick={handleOnSubmit}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    create
                </button>
            </div>

            {toast && (
                <div
                    className={`fixed bottom-10 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg text-white transition-all
                ${toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}
                >
                    {toast.message}
                </div>
            )}

        </ComponentCard>
    )
}
