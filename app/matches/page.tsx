import { useMemo } from "react";
import Table from "../_components/table";

export default function Page() {

type Person = {
  name: {
    firstName: string
    lastName: string
  }
  address: string
  city: string
  state: string
}

type ColumnDataType<T, TValue> = {
  accessorFn: (row: T) => TValue,
  header: string,
  size: number
}

const data: Person[] = [
  {
    name: { firstName: 'John', lastName: 'Doe' },
    address: '261 Erdman Ford',
    city: 'East Daphne',
    state: 'Kentucky',
  },
  {
    name: { firstName: 'Jane', lastName: 'Doe' },
    address: '769 Dominic Grove',
    city: 'Columbus',
    state: 'Ohio',
  },
  {
    name: { firstName: 'Joe', lastName: 'Doe' },
    address: '566 Brakus Inlet',
    city: 'South Linda',
    state: 'West Virginia',
  },
  {
    name: { firstName: 'Kevin', lastName: 'Vandy' },
    address: '722 Emie Stream',
    city: 'Lincoln',
    state: 'Nebraska',
  },
  {
    name: { firstName: 'Joshua', lastName: 'Rolluffs' },
    address: '32188 Larkin Turnpike',
    city: 'Omaha',
    state: 'Nebraska',
  },
]

const columns = useMemo<ColumnDataType<Person, string>[]>(
  () => [
    {
      accessorFn: (row) => row.name.firstName,
      header: 'First Name',
      size: 150,
    },
    {
      accessorFn: (row) => row.name.lastName,
      header: 'Last Name',
      size: 150,
    },
    {
      accessorFn: (row) => row.address,
      header: 'Address',
      size: 150,
    },
    {
      accessorFn: (row) => row.city,
      header: 'City',
      size: 150,
    },
    {
      accessorFn: (row) => row.state,
      header: 'State',
      size: 150,
    }
  ],
  []
);



  return <Table data={data} columns={columns}/>
}