import React, { useState, useEffect, useContext, createContext, ReactNode} from 'react'

export const QueryContext = createContext(null)

interface QueryProviderProps {
  children: ReactNode;
}

export const QueryProvider = ({children}: QueryProviderProps) => {
    const value = {}
 return (
    <QueryContext.Provider value={value}>{children}</QueryContext.Provider>
 )
}