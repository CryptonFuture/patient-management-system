import React, { useEffect, useState } from 'react'
import ComponentCard from "../../../components/common/ComponentCard.tsx";
import Label from "../../../components/form/Label.tsx";
import Input from "../../../components/form/input/InputField.tsx";
import Select from "../../../components/form/Select.tsx";
import { EyeCloseIcon, EyeIcon, TimeIcon } from "../../../icons";
import DatePicker from "../../../components/form/date-picker.tsx";
import { editPatient, updatePatient, getGender, getDepartment, getPatientType } from '../../../utils/Services/patient.tsx';
import { useNavigate, useParams } from 'react-router'
import ToggleSwitch from '../../../components/form/form-elements/ToggleSwitch.tsx';
import { useUpdatePatientMutation } from '../../../utils/RTKQuery/Patients/ApiPatients.ts';

type ToggleProps = {
  checked?: boolean;
  onChange: () => void;
};

type Patient = {
  firstname?: string;
  lastname?: string;
  gender?: string;
  dateOfBirth?: string;
  cnic?: string;
  phone?: string;
  email?: string;
  address?: string;
};

type PatientErrors = {
  [key in keyof Patient]?: string;
};

export default function UpdatePatient() {
    const [toast, setToast] = useState<{ message: string; type: string } | null>(null);
    const [errors, setErrors] = useState<PatientErrors>({});
    
    const [updatePatient] = useUpdatePatientMutation();
    
    const normalize = (val: string) => val?.trim().toLowerCase();
    const navigate = useNavigate()
    const { id }: any = useParams()

    const [patient, setPatient] = useState<any>({
        firstname: "",
        lastname: "",
        gender: "",
        dateOfBirth: "",
        cnic: "",
        age: "",
        status: true,

        contact: {
            phone: "",
            alternatePhone: "",
            city: "",
            country: "",
            state: "",
            zipcode: "",
            email: "",
            address: "",
            status: true
        },

        medical: {
            bloodGroup: "",
            height: "",
            weight: "",
            allergies: "",
            diseases: "",
            medications: "",
             status: true
        },

        emergency: {
            emergencyName: "",
            emergencyNumber: "",
            insuranceProvider: "",
            maritalStatus: "",
            occupation: "",
             status: true
        },

        registration: {
            patientType: "",
            department: "",
            assignedDoctor: "",
            registerDate: "",
            status: true
        }
    })



    const [gender, setGender] = useState<any[]>([])
    const [department, setDepartment] = useState<any[]>([])
    const [patientType, setPatientType] = useState<any[]>([])


    const handOnChangeInput = (e: any) => {
        const { name, value } = e.target
        setPatient({ ...patient, [name]: value })
    }

    const handleOnStatusSelectChange = () => {
        setPatient((prev: any) => ({
            ...prev,
            status: !prev?.status
        }));
 
    };

     const validate = (): boolean => {
        const newErrors: PatientErrors = {};

        if (!patient.firstname) newErrors.firstname = "first name is required";
        if (!patient.lastname) newErrors.lastname = "last name is required";
        if (!patient.cnic) newErrors.cnic = "cnic is required";
        if (!patient.phone) newErrors.phone = "phone is required";
        if (!patient.email) newErrors.email = "email is required";

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleOnStatusContactSelectChange = () => {
        setPatient((prev: any) => {
            const newContact = {
                ...(prev?.contact || {}),
                status: !prev?.contact?.status
            };

            return {
                ...prev,
                contact: newContact   // ✅ new object (no shared reference)
            };
        });
    };

//     const handleOnChangeStatusSelectChange = () => {
//     setPatient((prev: any) => ({
       
//         emergency: {
//             ...prev?.emergency,
//             status: !prev?.status
//         },

//         register: {
//             ...prev?.register,
//             status: !prev?.status
//         },

//         medical: {
//             ...prev?.medical,
//             status: !prev?.status
//         }
//     }));
// };

    const handleSelectChange = (selected: any) => {
        setPatient((prev: any) => ({
            ...prev,
            gender: selected.value
        }));
    };

     const handleOnDepartmentSelectChange = (value: any) => {
        setPatient((prev: any) => ({
            ...prev,
            registration: {
                ...prev.registration,
                department: value.value || value
            }
          
        }));
    };

    const handleOnPatientTypeSelectChange = (value: any) => {
        setPatient((prev: any) => ({
            ...prev,
            registration: {
                ...prev.registration,
                patientType: value.value || value
            }
          
        }));
    };

    const handleOnCitySelectChange = (value: any) => {
        setPatient((prev: any) => ({
            ...prev,
            contact: {
                ...prev.contact,
                city: value.value || value
            }
        }));
    };

    const handleOnCountrySelectChange = (value: any) => {
        setPatient((prev: any) => ({
            ...prev,
            contact: {
                ...prev.contact,
                country: value.value || value
            }
        }));
    };

    const handleOnStateSelectChange = (value: any) => {
        setPatient((prev: any) => ({
            ...prev,
            contact: {
                ...prev.contact,
                state: value.value || value
            }
        }));
    };

    const handleOnZipCodeSelectChange = (value: any) => {
        setPatient((prev: any) => ({
            ...prev,
            contact: {
                ...prev.contact,
                zipcode: value.value || value
            }
        }));
    };

    const handleContactChange = (e: any) => {
        const { name, value } = e.target;

        setPatient((prev: any) => ({
            ...prev,
            contact: {
                ...prev.contact,
                [name]: value
            }
        }));
    };

    const handleMedicalChange = (e: any) => {
        const { name, value } = e.target;

        setPatient((prev: any) => ({
            ...prev,
            medical: {
                ...prev.medical,
                [name]: value
            }
        }));
    };

    const handleEmergencyChange = (e: any) => {
        const { name, value } = e.target;

        setPatient((prev: any) => ({
            ...prev,
            emergency: {
                ...prev.emergency,
                [name]: value
            }
        }));
    };

    const handleRegistrationChange = (e: any) => {
        const { name, value } = e.target;

        setPatient((prev: any) => ({
            ...prev,
            registration: {
                ...prev.registration,
                [name]: value
            }
        }));
    };

    const handleOnSubmit = async () => {
        try {
            // if (!validate()) return;
            const payload = {
                firstname: patient.firstname,
                lastname: patient.lastname,
                gender: patient.gender,
                dateOfBirth: patient.dateOfBirth,
                cnic: patient.cnic,
                age: patient.age,
                status: patient.status ? true : false,

                contact: {
                    phone: patient.contact?.phone,
                    alternatePhone: patient.contact?.alternatePhone,
                    city: patient.contact?.city,
                    country: patient.contact?.country,
                    state: patient.contact?.state,
                    zipcode: patient.contact?.zipcode,
                    email: patient.contact?.email,
                    address: patient.contact?.address,
                    status: patient.status ? true : false
                },

                medical: {
                    bloodGroup: patient.medical?.bloodGroup,
                    height: patient.medical?.height,
                    weight: patient.medical?.weight,
                    allergies: patient.medical?.allergies,
                    diseases: patient.medical?.diseases,
                    medications: patient.medical?.medications,
                    status: patient.status ? true : false
                },

                emergency: {
                    emergencyName: patient.emergency?.emergencyName,
                    emergencyNumber: patient.emergency?.emergencyNumber,
                    insuranceProvider: patient.emergency?.insuranceProvider,
                    maritalStatus: patient.emergency?.maritalStatus,
                    occupation: patient.emergency?.occupation,
                    status: patient.status ? true : false
                },

                registration: {
                    patientType: patient.registration?.patientType,
                    department: patient.registration?.department,
                    assignedDoctor: patient.registration?.assignedDoctor,
                    registerDate: patient.registration?.registerDate,
                    status: patient.status ? true : false
                }
            }

            const res = await updatePatient({ id, body: payload }).unwrap();

            setToast({
                message: res?.data?.message || "Patient updated successfully",
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

    const fetchDepartment = async () => {
        const res = await getDepartment()
        console.log(res.data, 'department');
    
        setDepartment(res.data)
    }

    const fetchPatientType = async () => {
        const res = await getPatientType()
        console.log(res.data, 'patient-type');
    
        setPatientType(res.data)
    }


    useEffect(() => {
        fetchGender()
        fetchDepartment()
        fetchPatientType()
    }, [])

    // const options: any = [
    //     { value: "male", label: "male" },
    //     { value: "female", label: "female" },
    // ];

    const options: any = gender?.map((item: any) => ({
        value: item.gender,
        label: item.gender
    }))

    const depatments = department?.map((item: any) => ({
        value: item.name,
        label: item.name
    }))

    const type = patientType?.map((item: any) => ({
        value: item.name,
        label: item.name
    }))

    const country = [
        { value: "pakistan", label: "pakistan" },
        { value: "india", label: "india" },
    ]

    const city = [
        { value: "karachi", label: "karachi" },
        { value: "dehli", label: "dehli" },
    ]


    const editpatient = async (id: any) => {
        console.log(id, 'id');
        const res = await editPatient(id)
        console.log(res, 'id');
        setPatient(res)
    }

    const ToggleSwitch = ({ checked = false, onChange }: ToggleProps) => (
        <div
            onClick={onChange}
            className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition ${checked ? 'bg-blue-600' : 'bg-gray-300'
                }`}
        >
            <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${checked ? 'translate-x-6' : ''
                    }`}
            />
        </div>
    );

    useEffect(() => {
        if (id) {
            editpatient(id)
        }
    }, [id])

    return (
        // <ComponentCard title="Update Patient">
        //     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        //         <div>
        //             <Label htmlFor="input">First Name</Label>
        //             <Input value={patient?.firstname || ''} name='firstname' onChange={handOnChangeInput} type="text" id="input" />
        //         </div>

        //         <div>
        //             <Label htmlFor="input">Last Name</Label>
        //             <Input value={patient?.lastname || ''} name='lastname' onChange={handOnChangeInput} type="text" id="input" />
        //         </div>

        //         <div>
        //             <Label>Gender</Label>
        //             <Select

        //                 options={options}
        //                 placeholder="Select an option"
        //                 onChange={handleSelectChange}
        //                 className="dark:bg-dark-900"
        //             />
        //         </div>

        //         <div>
        //             <DatePicker
        //                 key={patient?.dateOfBirth}
        //                 id="date-picker"
        //                 label="Date Of Birth"
        //                 placeholder="Select a date"
        //                 defaultDate={
        //                     patient?.dateOfBirth ? new Date(patient.dateOfBirth) : ''
        //                 }
        //                 onChange={(dates: any, currentDateString: string) => {
        //                     setPatient((prev: any) => ({
        //                         ...prev,
        //                         dateOfBirth: currentDateString
        //                     }));
        //                 }}
        //             />
        //         </div>

        //         <div>
        //             <Label htmlFor="input">Marital Status</Label>
        //             <Input value={patient?.maritalStatus || ''} name='maritalStatus' onChange={handOnChangeInput} type="text" id="input" />
        //         </div>

        //         <div>
        //             <Label htmlFor="input">Address</Label>
        //             <Input value={patient?.address || ''} name='address' onChange={handOnChangeInput} type="text" id="input" />
        //         </div>

        //         <div>
        //             <Label htmlFor="input">Cnic</Label>
        //             <Input disabled value={patient?.cnic || ''} name='cnic' onChange={handOnChangeInput} type="text" id="input" />
        //         </div>

        //         <div>
        //             <Label htmlFor="input">Phone No</Label>
        //             <Input value={patient?.contact?.phone || ''} name='phone' onChange={handOnChangeInput} type="text" id="input" />
        //         </div>

        //         <div>
        //             <Label htmlFor="input">Age</Label>
        //             <Input value={patient?.age || ''} name='age' onChange={handOnChangeInput} type="text" id="input" />
        //         </div>

        //         <div>
        //             <Label htmlFor="inputTwo">Email Address</Label>
        //             <Input disabled value={patient?.contact?.email || ''} name='email' onChange={handOnChangeInput} type="text" id="inputTwo" placeholder="info@gmail.com" />
        //         </div>


        //     </div>
        //     <div className="mt-6 flex justify-end">
        //         <button
        //             onClick={handleOnSubmit}
        //             className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        //         >
        //             update
        //         </button>
        //     </div>

        //     {toast && (
        //         <div
        //             className={`fixed bottom-10 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg text-white transition-all
        //         ${toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}
        //         >
        //             {toast.message}
        //         </div>
        //     )}

        // </ComponentCard>

        <ComponentCard title="Update Patient">

            <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Basic Patient Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>
                    <Label htmlFor="input">First Name</Label>
                    <Input className={errors.firstname ? "border-red-500" : ""} placeholder='Enter a firstname' value={patient?.firstname || ''} name='firstname' onChange={handOnChangeInput} type="text" id="input" />
                  {errors.firstname && (
                        <p className="text-red-500 text-sm">{errors.firstname}</p>
                    )}
                </div>

                <div>
                    <Label htmlFor="input">Last Name</Label>
                    <Input className={errors.lastname ? "border-red-500" : ""} placeholder='Enter a lastname' value={patient?.lastname || ''} name='lastname' onChange={handOnChangeInput} type="text" id="input" />
                  {errors.lastname && (
                        <p className="text-red-500 text-sm">{errors.lastname}</p>
                    )}
                </div>

                {/* <div>
                    <Label>Gender</Label>
                    <Select
              
                        options={options}
                        placeholder="Select an option"
                        onChange={handleSelectChange}
                        className="dark:bg-dark-900"
                    />
                </div> */}

                <div className="mb-3">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Gender
                    </label>

                    <select
                        value={patient.gender}
                        onChange={handleSelectChange}
                        className="w-full h-11 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm shadow-sm 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                           dark:bg-gray-800 dark:text-white"
                    >
                        <option value="">Select Gender</option>

                        {gender.map((g) => (
                            <option key={g.id} value={g.gender}>
                                {g.gender}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <DatePicker

                        id="date-picker"
                        label="Date Of Birth"
                        placeholder="Select a date"
                        defaultDate={
                            patient?.dateOfBirth ? new Date(patient.dateOfBirth) : ''
                        }
                        onChange={(dates: any, currentDateString: string) => {
                            setPatient((prev: any) => ({
                                ...prev,
                                dateOfBirth: currentDateString
                            }));
                        }}
                    />
                </div>


                <div>
                    <Label htmlFor="input">Cnic</Label>
                    <Input className={errors.cnic ? "border-red-500" : ""} placeholder='Enter a cnic' value={patient?.cnic || ''} name='cnic' onChange={handOnChangeInput} type="text" id="input" />
                    {errors.cnic && (
                            <p className="text-red-500 text-sm">{errors.cnic}</p>
                    )}
                </div>



                <div>
                    <Label htmlFor="input">Age</Label>
                    <Input placeholder='Enter a age' value={patient?.age || ''} name='age' onChange={handOnChangeInput} type="text" id="input" />
                </div>
                
                {/* <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">

                    <h2 className="text-lg font-medium text-gray-700">
                        Status
                    </h2>

                    <div className="flex items-center gap-2">
                       

                        <ToggleSwitch
                            checked={patient?.status}
                            onChange={handleOnStatusSelectChange}
                        />
                    </div>

                </div> */}

            </div>

            <h2 className="text-lg font-semibold text-gray-700 mt-8 mb-4">
                Contact Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>
                    <Label htmlFor="input">Phone No</Label>
                    <Input className={errors.phone ? "border-red-500" : ""} placeholder='Enter a phone' value={patient?.contact?.phone || ''} name='phone' onChange={handleContactChange} type="text" id="input" />
                  {errors.phone && (
                        <p className="text-red-500 text-sm">{errors.phone}</p>
                    )}
                </div>

                <div>
                    <Label htmlFor="input">Alternate No</Label>
                    <Input placeholder='Enter a alternate number' value={patient?.contact?.alternatePhone || ''} name='alternatePhone' onChange={handleContactChange} type="text" id="input" />
                </div>

                <div>
                    <Label htmlFor="inputTwo">Email Address</Label>
                    <Input className={errors.email ? "border-red-500" : ""} placeholder='Enter a email' value={patient?.contact?.email || ''} name='email' onChange={handleContactChange} type="text" id="inputTwo" />
                    {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email}</p>
                    )}
                </div>

                <div>
                    <Label htmlFor="input">Address</Label>
                    <Input placeholder='Enter a address' value={patient?.contact?.address || ''} name='address' onChange={handleContactChange} type="text" id="input" />
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

                 <div className='hidden'>
                    <Label htmlFor="input">State</Label>
                    <Select
                      
                        options={city}
                        placeholder="Select an State"
                        onChange={handleOnStateSelectChange}
                        className="dark:bg-dark-900"
                    />
                </div>

                <div className='hidden'>
                    <Label htmlFor="input">ZipCode</Label>
                    <Select

                        options={country}
                        placeholder="Select an Zipcode"
                        onChange={handleOnZipCodeSelectChange}
                        className="dark:bg-dark-900"
                    />
                </div>

                 {/* <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">

                    <h2 className="text-lg font-medium text-gray-700">
                        Status
                    </h2>

                    <div className="flex items-center gap-2">
                       

                        <ToggleSwitch
                            checked={patient?.contact?.status}
                            onChange={handleOnStatusContactSelectChange}
                        />
                    </div>

                </div> */}

            </div>

            <h2 className="text-lg font-semibold text-gray-700 mt-8 mb-4">
                Medical Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>
                    <Label>Blood Group</Label>
                    <Input placeholder='Enter a blood group' value={patient?.medical?.bloodGroup || ''} onChange={handleMedicalChange} name="bloodGroup" type="text" />
                </div>

                <div>
                    <Label>Height (cm)</Label>
                    <Input placeholder='Enter a height' value={patient?.medical?.height || ''} onChange={handleMedicalChange} name="height" type="number" />
                </div>

                <div>
                    <Label>Weight (kg)</Label>
                    <Input placeholder='Enter a weight' value={patient?.medical?.weight || ''} onChange={handleMedicalChange} name="weight" type="number" />
                </div>

                <div>
                    <Label>Allergies</Label>
                    <Input placeholder='Enter a allergies' value={patient?.medical?.allergies || ''} onChange={handleMedicalChange} name="allergies" type="text" />
                </div>

                <div>
                    <Label>Chronic Diseases</Label>
                    <Input placeholder='Enter a diseases' value={patient?.medical?.diseases || ''} onChange={handleMedicalChange} name="diseases" type="text" />
                </div>

                <div>
                    <Label>Current Medications</Label>
                    <Input placeholder='Enter a medications' value={patient?.medical?.medications || ''} onChange={handleMedicalChange} name="medications" type="text" />
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

                {/* <div>
                                    <div>
                    <Label>PatientType</Label>
                    <Select

                        options={type}
                        placeholder="Select an option"
                        onChange={handleOnPatientTypeSelectChange}
                        className="dark:bg-dark-900"
                    />
                    
                   
                </div>
                   
                </div> */}

                 <div className="mb-3">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Patient Type
                    </label>

                    <select
                        value={patient.registration.patientType}
                        onChange={handleOnPatientTypeSelectChange}
                        className="w-full h-11 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm shadow-sm 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                           dark:bg-gray-800 dark:text-white"
                    >
                        <option value="">Select Patient Type</option>

                        {patientType.map((pt) => (
                            <option key={pt.id} value={pt.name}>
                                {pt.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Department
                    </label>

                    <select
                        value={patient.registration.department}
                        onChange={handleOnDepartmentSelectChange}
                        className="w-full h-11 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm shadow-sm 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                           dark:bg-gray-800 dark:text-white"
                    >
                        <option value="">Select Department</option>

                        {department.map((d) => (
                            <option key={d.id} value={d.name}>
                                {d.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <Label>Assigned Doctor</Label>
                    <Input placeholder='Enter a assigned doctor' value={patient?.registration?.assignedDoctor || ''} name="assignedDoctor" onChange={handleRegistrationChange} type="text" />
                </div>

                <div>
                    <Label>Registration Date</Label>
                    <DatePicker
                        id="reg-date"
                        label=""
                        placeholder="Select date"
                        defaultDate={
                            patient?.registration?.registerDate ? new Date(patient.registration.registerDate) : ''
                        }
                        onChange={(dates: any, currentDateString: string) => {
                            setPatient((prev: any) => ({
                                ...prev,
                                registration: {
                                    ...prev.registration,
                                    registerDate: currentDateString
                                }
                            }));
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
                        value={patient?.emergency?.emergencyName || ''}
                        onChange={handleEmergencyChange}
                        name="emergencyName"
                        type="text"
                        placeholder='Enter a emergency name'
                    />
                </div>

                <div>
                    <Label>Emergency Contact Number</Label>
                    <Input
                        value={patient?.emergency?.emergencyNumber || ''}
                        onChange={handleEmergencyChange}
                        name="emergencyNumber"
                        type="text"
                        placeholder='Enter a emergency number'
                    />
                </div>

                <div>
                    <Label>Insurance Provider</Label>
                    <Input
                        value={patient?.emergency?.insuranceProvider || ''}
                        onChange={handleEmergencyChange}
                        name="insuranceProvider"
                        type="text"
                        placeholder='Enter a insurance provider'
                    />
                </div>

                <div>
                    <Label>Marital Status</Label>
                    <Input
                        value={patient?.emergency?.maritalStatus || ''}
                        name='maritalStatus'
                        onChange={handleEmergencyChange}
                        type="text"
                        placeholder='Enter a marital status'
                    />
                </div>

                <div>
                    <Label>Occupation</Label>
                    <Input
                        value={patient?.emergency?.occupation || ''}
                        onChange={handleEmergencyChange}
                        name="occupation"
                        type="text"
                        placeholder='Enter a occupation'
                    />
                </div>

            </div>


            <div className="mt-6 flex justify-end">
                <button
                    onClick={handleOnSubmit}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    update
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
