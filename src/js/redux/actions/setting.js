export const ADD_COLL = 'ADD_COLL'
export const DEL_COLL = 'DEL_COLL'
export const GET_ALL_COLL = 'GET_ALL_COLL'

export const addColl = (field) => ({
    type: 'ADD_COLL',
    field
  })
export const delColl = (id) => ({
    type: 'DEL_COLL',
    id
  })
export const getAllColl = (columns) => ({
  type:'GET_ALL_COLL',
  columns:columns
})


export const ADD_COMPANY = 'ADD_COMPANY'
export const DEL_COMPANY = 'DEL_COMPANY'
export const GET_ALL_COMPANY = 'GET_ALL_COMPANY'

export const addCompany = (field) => ({
  type: 'ADD_COMPANY',
  field
})
export const delCompany = (id) => ({
  type: 'DEL_COMPANY',
  id
})

export const getAllCompany = (companies) => ({
  type:'GET_ALL_COMPANY',
  companies: companies
})