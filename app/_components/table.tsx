type ColumnDataType<T, TValue> = {
  accessorFn: (row: T) => TValue,
  header: string,
  size: number
}

type TableProps<T> = {
  columns: ColumnDataType<T, unknown>[]
  data: T[]
}

export default function Table<T>({
  columns,
  data
}: TableProps<T>) {

  return (
    <table>
      <thead>
        <tr>
          {
            columns.map((col) => {
              return (
                <th key={col.header} >{col.header}</th>
              )
            })
          }
        </tr>
      </thead>

      <tbody>
        {
          data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {
                columns.map((col, colIndex) => (
                  <td key={colIndex}>
                    {
                      col.accessorFn(row) as string
                    }
                  </td>
                ))
              }
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}