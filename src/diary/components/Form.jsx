

import { useState, useContext } from 'react'
import { Context } from '../Diary'

export default function Form(){
  const { formdata } = useContext(Context)
  return <div>
  formdata
  {JSON.stringify(formdata)}
  </div>
}