import React, { useState } from 'react'
import PageBreadcrumb from '../../components/common/PageBreadCrumb'
import ComponentCard from '../../components/common/ComponentCard'
import PatientTable from '../../components/tables/PatientTables/PatientTable'

export default function Patient() {
    const [search, setSearch] = useState<string>('');

  return (
    <>
      <PageBreadcrumb pageTitle='Patient' />
      <div className='space-y-6'>
        <ComponentCard 
          title='Patient' 
          search={search}
          setSearch={setSearch}
          >
          <PatientTable 
            search={search}
            setSearch={setSearch} 
            />
        </ComponentCard>
      </div>
    </>
  )
}
