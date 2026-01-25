'use client'

import { makeStore } from "@/app/_lib/store"
import { Provider } from "react-redux"

export default function Providers({ children }: { children: React.ReactNode }) {

  return (
    <Provider store={makeStore}>
        {children}
    </Provider>
  )
}