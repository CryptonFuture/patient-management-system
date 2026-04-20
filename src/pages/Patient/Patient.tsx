import React from 'react'
import PageBreadcrumb from '../../components/common/PageBreadCrumb'
import ComponentCard from '../../components/common/ComponentCard'
import PatientTable from '../../components/tables/PatientTables/PatientTable'

export default function Patient() {
  return (
    <>
      <PageBreadcrumb pageTitle='Patient' />
      <div className='space-y-6'>
        <ComponentCard title='Patient'>
          <PatientTable />
        </ComponentCard>
      </div>
    </>
  )
}
