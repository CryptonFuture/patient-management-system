import React, { useState, useEffect } from 'react'
import ComponentCard from "../../../components/common/ComponentCard.tsx";
import Label from "../../../components/form/Label.tsx";
import Input from "../../../components/form/input/InputField.tsx";
import Select from "../../../components/form/Select.tsx";
import { EyeCloseIcon, EyeIcon, TimeIcon } from "../../../icons";
import DatePicker from "../../../components/form/date-picker.tsx";
import { addPatient, getBloodGroup, getDepartment, getDiseases, getGender, getPatientType } from '../../../utils/Services/patient.tsx';
import { useNavigate } from 'react-router'
import {getCountry, getCity, getState, getZipcode} from '../../../utils/Services/location.tsx'
import { locationData } from '../../../utils/locationData/locationData.tsx';
import { useAddPatientMutation } from '../../../utils/RTKQuery/Patients/ApiPatients.ts';

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

export default function AddPatient() {
    const [toast, setToast] = useState<{ message: string; type: string } | null>(null);

    const [addPatient] = useAddPatientMutation();
    
    const [errors, setErrors] = useState<PatientErrors>({});
    const [gender, setGender] = useState<any[]>([])
    const [department, setDepartment] = useState<any[]>([])
    const [patientType, setPatientType] = useState<any[]>([])
    const [bloodGroup, setBloodGroup] = useState<any[]>([])
    const [Diseases, setDiseases] = useState<any[]>([])

    // const [countries, setCountries] = useState([]);
    // const [states, setStates] = useState([]);
    // const [cities, setCities] = useState([]);
    // const [zipcodes, setZipcodes] = useState([]);

    // const [selectedCountry, setSelectedCountry] = useState<any>(null);
    // const [selectedState, setSelectedState] = useState<any>(null);
    // const [selectedCity, setSelectedCity] = useState<any>(null);
    // const [selectedZipcode, setSelectedZipcode] = useState<any>(null);

    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [zipcodes, setZipcodes] = useState([]);

    const [selectedCountry, setSelectedCountry] = useState<any>("");
    const [selectedState, setSelectedState] = useState<any>("");
    const [selectedCity, setSelectedCity] = useState<any>("");
    const [selectedZipcode, setSelectedZipcode] = useState<any>("");

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
        state: "",
        zipcode: "",
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

    

    const handOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setPatient({ ...patient, [name]: value })
    }

    const handleSelectDepartmentChange = (value: string) => {
        setPatient({ ...patient, department: value });
    };

    const handleSelectBloodGroupChange = (value: string) => {
        setPatient({ ...patient, bloodGroup: value });
    };

    const handleSelectDiseasesChange = (value: string) => {
        setPatient({ ...patient, diseases: value });
    };

    const handleSelectChange = (value: any) => {
        setPatient({ ...patient, gender: value });
    };

      const handlePatientTypeSelectChange = (value: string) => {
        setPatient({ ...patient, patientType: value });
    };

  
    const handleOnCountrySelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {

        // if (!selected || selected.value == null || isNaN(selected.value)) {
        //     console.log("Invalid selection");
        //     return;
        // }

        // console.log(selected.value, 'selected.value');
        

        // console.log(selected, 'selected');
        
        // setSelectedCountry(selected)

        // setSelectedState(null);
        // setSelectedCity(null);
        // setSelectedZipcode(null);

        // setStates([])
        // setCities([])
        // setZipcodes([])

        // const countryId = Number(selected.value)

        // if (!countryId || isNaN(countryId)) {
        //     console.log("Invalid countryId:", countryId);
        //     return;
        // }

        // console.log(countryId, 'countryId');
        

        // const res = await getState(countryId)
        
        
        // const countryData =  res.map((s: any) => ({
        //     label: s.name,
        //     value: s.id
        // }))
        // setStates(countryData)

        // console.log(countryData, 'stateData');
        
        // setPatient({ ...patient, country: value });

        const countryId = Number(e.target.value);

        setSelectedCountry(countryId);
        setSelectedState("");
        setSelectedCity("");
        setSelectedZipcode("");

        const country = locationData.find((c: any) => c.id === countryId);

        setStates(country?.states || []);
        setCities([]);
        setZipcodes([]);

    };

    const handleOnStateSelectChange = async (e: any) => {
        // setSelectedState(selected)

        // setSelectedCity(null);
        // setSelectedZipcode(null);

        // setCities([])
        // setZipcodes([])

        // const res = await getCity(selected?.value)
        
        // const stateData =  res.map((citi: any) => ({
        //     label: citi.name,
        //     value: citi.id
        // }))
        // setCities(stateData)

        // console.log(stateData, 'stateData');

        // setPatient({ ...patient, state: value });

        const stateId = Number(e.target.value);

        setSelectedState(stateId);
        setSelectedCity("");
        setSelectedZipcode("");

        const country = locationData.find((c: any) => c.id === selectedCountry);
        const state = country?.states.find((s: any) => s.id === stateId);

        setCities(state?.cities || []);
        setZipcodes([]);
    };

      const handleOnCitySelectChange = async (e: any) => {
        // setSelectedCity(selected)

        // setSelectedZipcode(null);

        // setZipcodes([])

        // const res = await getZipcode(selected?.value)
        
        // const cityData =  res.map((z: any) => ({
        //     label: z.name,
        //     value: z.id
        // }))
        // setZipcodes(cityData)

        // console.log(cityData, 'stateData');

        // setPatient({ ...patient, city: value });

          const cityId = Number(e.target.value);

          setSelectedCity(cityId);
          setSelectedZipcode("");

          const country = locationData.find((c: any) => c.id === selectedCountry);
          const state = country?.states.find((s: any) => s.id === selectedState);
          const city = state?.cities.find((c: any) => c.id === cityId);

          setZipcodes(city?.zipcodes || []);
    };


    const handleOnZipcodeSelectChange = (e: any) => {
        console.log("Selected Zipcode:", e);
        // setPatient({ ...patient, zipcode: value });
        // setSelectedZipcode(selected);
        setSelectedZipcode(e.target.value);
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


    const handleOnSubmit = async () => {
        try {
            if (!validate()) return;
            const payload = {
                firstname: patient.firstname,
                lastname: patient.lastname,
                gender: patient.gender,
                dateOfBirth: patient.dateOfBirth,
                cnic: patient.cnic,
                age: patient.age,
                phone: patient.phone,
                alternatePhone: patient.alternatePhone,
                city: selectedCity,
                country: selectedCountry,
                state: selectedState,
                zipcode: selectedZipcode,
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

            const res = await addPatient(payload).unwrap()


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

    const fetchBloodGroup = async () => {
        const res = await getBloodGroup()
        console.log(res.data, 'blood-group');

        setBloodGroup(res.data)
    }

    const fetchDiseases = async () => {
        const res = await getDiseases()
        console.log(res.data, 'diseases');

        setDiseases(res.data)
    }

    const getCountries = () => {
        // const res = await getCountry()
        // const countryData = res.map((c: any) => ({
        //     label: c.name,
        //     value: Number(c.id)
        // }))
        // console.log(countryData, 'country');
        
        // setCountries(countryData)

       
        setCountries(locationData)
    }




    useEffect(() => {
        fetchGender()
        fetchDepartment()
        getCountries()
        fetchPatientType()
        fetchBloodGroup()
        fetchDiseases()
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

    const depatments = department?.map((item: any) => ({
        value: item.name,
        label: item.name
    }))

    const type = patientType?.map((item: any) => ({
        value: item.name,
        label: item.name
    }))

    const blood = bloodGroup?.map((item: any) => ({
        value: item.name,
        label: item.name
    }))

      const diseases = Diseases?.map((item: any) => ({
        value: item.name,
        label: item.name
    }))

    return (
        <ComponentCard title="Add Patient">

            <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Basic Patient Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>
                    <Label htmlFor="input">First Name</Label>
                    <Input 
                        name='firstname' 
                        onChange={handOnChangeInput}
                        type="text" 
                        id="input" 
                         placeholder='Enter a firstname'
                         className={errors.firstname ? "border-red-500" : ""}
                        />

                    {errors.firstname && (
                        <p className="text-red-500 text-sm">{errors.firstname}</p>
                    )}
                </div>

                <div>
                    <Label htmlFor="input">Last Name</Label>
                    <Input 
                    name='lastname' 
                    onChange={handOnChangeInput} 
                    type="text" 
                    id="input" 
                    placeholder='Enter a lastname'
                    className={errors.lastname ? "border-red-500" : ""}
                    />
                      {errors.lastname && (
                        <p className="text-red-500 text-sm">{errors.lastname}</p>
                    )}
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
                    <Input 
                    name='cnic' 
                    onChange={handOnChangeInput} 
                    type="text" 
                    id="input" 
                    placeholder='Enter a cnic'
                    className={errors.cnic ? "border-red-500" : ""}
                    />
                    {errors.cnic && (
                        <p className="text-red-500 text-sm">{errors.cnic}</p>
                    )}
                </div>



                <div>
                    <Label htmlFor="input">Age</Label>
                    <Input 
                    name='age' 
                    onChange={handOnChangeInput} 
                    type="text" 
                    id="input" 
                    placeholder='Enter a age'
                    />
                </div>


            </div>

            <h2 className="text-lg font-semibold text-gray-700 mt-8 mb-4">
                Contact Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>
                    <Label htmlFor="input">Phone No</Label>
                    <Input 
                    name='phone' 
                    onChange={handOnChangeInput} 
                    type="text" 
                    id="input" 
                    placeholder='Enter a phone'
                    className={errors.phone ? "border-red-500" : ""}
                    />
                     {errors.phone && (
                        <p className="text-red-500 text-sm">{errors.phone}</p>
                    )}
                </div>

                <div>
                    <Label htmlFor="input">Alternate No</Label>
                    <Input  placeholder='Enter a alternate number' name='alternatePhone' onChange={handOnChangeInput} type="text" id="input" />
                </div>

                <div>
                    <Label htmlFor="inputTwo">Email Address</Label>
                    <Input 
                    name='email' 
                    onChange={handOnChangeInput} 
                    type="text" 
                    id="inputTwo"
                    placeholder="info@gmail.com" 
                    className={errors.email ? "border-red-500" : ""}
                     />
                      {errors.phone && (
                        <p className="text-red-500 text-sm">{errors.email}</p>
                    )}
                </div>

                <div>
                    <Label htmlFor="input">Address</Label>
                    <Input placeholder='Enter a address' name='address' onChange={handOnChangeInput} type="text" id="input" />
                </div>

                <div className="mb-3">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Country
                    </label>
                    <div className="relative">
                        <select 
                        value={selectedCountry} 
                        onChange={handleOnCountrySelectChange}
                        className="w-full h-11 px-3 py-2 pr-10 border border-gray-300 rounded-md bg-white text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Select Country</option>
                            {countries.map((c: any) => (
                                <option key={c.id} value={c.id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                     
                    </div>
                </div>

                <div className="mb-3">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">State</label>
                    <div className='relative'>
                        <select
                            value={selectedState}
                            onChange={handleOnStateSelectChange}
                            disabled={!selectedCountry}
                            className="w-full h-11 px-3 py-2 pr-10 border border-gray-300 rounded-md bg-white text-sm shadow-sm 
                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                            disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"

                        >
                        <option value="">Select State</option>
                            {states.map((s: any) => (
                                <option key={s.id} value={s.id}>
                                    {s.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="mb-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">City</label>
                    <div className='relative'>
                        <select
                            value={selectedCity}
                            onChange={handleOnCitySelectChange}
                            disabled={!selectedState}
                             className="w-full h-11 px-3 py-2 pr-10 border border-gray-300 rounded-md bg-white text-sm shadow-sm 
                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                            disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"

                        >
                            <option value="">Select City</option>
                            {cities.map((c: any) => (
                                <option key={c.id} value={c.id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="mb-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Zipcode</label>
                    <div className='relative'>
                        <select
                            value={selectedZipcode}
                            onChange={handleOnZipcodeSelectChange}
                            disabled={!selectedCity}
                             className="w-full h-11 px-3 py-2 pr-10 border border-gray-300 rounded-md bg-white text-sm shadow-sm 
                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                            disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"

                        >
                            <option value="">Select Zipcode</option>
                            {zipcodes.map((z, index) => (
                                <option key={index} value={z}>
                                    {z}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* <div>
                    <Label htmlFor="input">Country</Label>
                    <Select

                        options={countries}
                        placeholder="Select an Country"
                        onChange={handleOnCountrySelectChange}
                        className="dark:bg-dark-900"
                    />
                </div>

                 <div>
                    <Label htmlFor="input">State</Label>
                    <Select

                        options={states}
                        placeholder="Select an State"
                        onChange={handleOnStateSelectChange}
                        className="dark:bg-dark-900"
                    />
                </div>
                

                 <div>
                    <Label htmlFor="input">City</Label>
                    <Select

                        options={cities}
                        placeholder="Select an City"
                        onChange={handleOnCitySelectChange}
                        className="dark:bg-dark-900"
                    />
                </div>

                 <div>
                    <Label htmlFor="input">Zipcode</Label>
                    <Select

                        options={zipcodes}
                        placeholder="Select an Zipcode"
                        onChange={handleOnZipcodeSelectChange}
                        className="dark:bg-dark-900"
                    />
                </div> */}

            </div>

            <h2 className="text-lg font-semibold text-gray-700 mt-8 mb-4">
                Medical Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <Label>Blood Group</Label>
                    <Select
                        options={blood}
                        placeholder="Select an option"
                        onChange={handleSelectBloodGroupChange}
                        className="dark:bg-dark-900"
                    />
                </div>

                <div>
                    <Label>Height (cm)</Label>
                    <Input placeholder='Enter a height' onChange={handOnChangeInput} name="height" type="number" />
                </div>

                <div>
                    <Label>Weight (kg)</Label>
                    <Input placeholder='Enter a weight' onChange={handOnChangeInput} name="weight" type="number" />
                </div>

                <div>
                    <Label>Allergies</Label>
                    <Input placeholder='Enter a allergies' onChange={handOnChangeInput} name="allergies" type="text" />
                </div>

                <div>
                    <Label>Chronic Diseases</Label>
                    <Select
                        options={diseases}
                        placeholder="Select an option"
                        onChange={handleSelectDiseasesChange}
                        className="dark:bg-dark-900"
                    />
                </div>

                <div>
                    <Label>Current Medications</Label>
                    <Input placeholder='Enter a medications' onChange={handOnChangeInput} name="medications" type="text" />
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
                    <Label>PatientType</Label>
                    <Select

                        options={type}
                        placeholder="Select an option"
                        onChange={handlePatientTypeSelectChange}
                        className="dark:bg-dark-900"
                    />
                    
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
                </div>

                {/* <div>
                    <Label>Department</Label>
                    <Input placeholder='Enter a department' name="department" onChange={handOnChangeInput} type="text" />
                </div> */}

                <div>
                    <Label>Department</Label>
                    <Select

                        options={depatments}
                        placeholder="Select an option"
                        onChange={handleSelectDepartmentChange}
                        className="dark:bg-dark-900"
                    />
                </div>

                <div>
                    <Label>Assigned Doctor</Label>
                    <Input placeholder='Enter a assigned doctor' name="assignedDoctor" onChange={handOnChangeInput} type="text" />
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
                        placeholder='Enter a emergency name'
                    />
                </div>

                <div>
                    <Label>Emergency Contact Number</Label>
                    <Input
                        onChange={handOnChangeInput}
                        name="emergencyNumber"
                        type="text"
                        placeholder='Enter a emergency number'

                    />
                </div>

                <div>
                    <Label>Insurance Provider</Label>
                    <Input
                        onChange={handOnChangeInput}
                        name="insuranceProvider"
                        type="text"
                        placeholder='Enter a insurance provider'
                    />
                </div>

                <div>
                    <Label>Marital Status</Label>
                    <Input
                        name='maritalStatus'
                        onChange={handOnChangeInput}
                        type="text"
                        placeholder='Enter a marital status'
                    />
                </div>

                <div>
                    <Label>Occupation</Label>
                    <Input
                        onChange={handOnChangeInput}
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
