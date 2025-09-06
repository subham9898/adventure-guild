import { createContext, useContext, useState, type ReactNode } from 'react'
import { useUser } from './UserContext'

interface Employee {
  id: string
  name: string
  role: string
  department: string
  reportsTo?: string
}

interface Department {
  id: string
  name: string
  head?: string
}

interface OrganizationContextType {
  employees: Employee[]
  departments: Department[]
  addEmployee: (employee: Employee) => void
  removeEmployee: (employeeId: string) => void
  updateEmployee: (employee: Employee) => void
  addDepartment: (department: Department) => void
  removeDepartment: (departmentId: string) => void
  getEmployeeById: (employeeId: string) => Employee | undefined
  getDepartmentById: (departmentId: string) => Department | undefined
}

const OrganizationContext = createContext<OrganizationContextType | undefined>(undefined)

export const OrganizationProvider = ({ children }: { children: ReactNode }) => {
  const { addXP, addCoins } = useUser()
  
  // Mock organization data
  const initialEmployees: Employee[] = [
    {
      id: '1',
      name: 'Alex Morgan',
      role: 'CEO',
      department: 'Leadership'
    },
    {
      id: '2',
      name: 'Taylor Swift',
      role: 'CTO',
      department: 'Engineering',
      reportsTo: '1'
    },
    {
      id: '3',
      name: 'Jamie Smith',
      role: 'CFO',
      department: 'Finance',
      reportsTo: '1'
    },
    {
      id: '4',
      name: 'Jordan Lee',
      role: 'Frontend Lead',
      department: 'Engineering',
      reportsTo: '2'
    },
    {
      id: '5',
      name: 'Casey Johnson',
      role: 'Backend Lead',
      department: 'Engineering',
      reportsTo: '2'
    },
    {
      id: '6',
      name: 'Riley Brown',
      role: 'HR Director',
      department: 'Human Resources',
      reportsTo: '1'
    }
  ]

  const initialDepartments: Department[] = [
    {
      id: '1',
      name: 'Leadership',
      head: '1'
    },
    {
      id: '2',
      name: 'Engineering',
      head: '2'
    },
    {
      id: '3',
      name: 'Finance',
      head: '3'
    },
    {
      id: '4',
      name: 'Human Resources',
      head: '6'
    }
  ]

  const [employees, setEmployees] = useState<Employee[]>(initialEmployees)
  const [departments, setDepartments] = useState<Department[]>(initialDepartments)

  const addEmployee = (employee: Employee) => {
    setEmployees(prevEmployees => [...prevEmployees, employee])
    // Reward user for adding an employee
    addXP(50)
    addCoins(25)
  }

  const removeEmployee = (employeeId: string) => {
    setEmployees(prevEmployees => prevEmployees.filter(emp => emp.id !== employeeId))
    // Deduct XP/coins when removing an employee
    addXP(-25)
    addCoins(-10)
  }

  const updateEmployee = (employee: Employee) => {
    setEmployees(prevEmployees => 
      prevEmployees.map(emp => emp.id === employee.id ? employee : emp)
    )
    // Reward user for updating an employee
    addXP(10)
    addCoins(5)
  }

  const addDepartment = (department: Department) => {
    setDepartments(prevDepartments => [...prevDepartments, department])
    // Reward user for adding a department
    addXP(100)
    addCoins(50)
  }

  const removeDepartment = (departmentId: string) => {
    setDepartments(prevDepartments => prevDepartments.filter(dept => dept.id !== departmentId))
    // Deduct XP/coins when removing a department
    addXP(-50)
    addCoins(-25)
  }

  const getEmployeeById = (employeeId: string) => {
    return employees.find(emp => emp.id === employeeId)
  }

  const getDepartmentById = (departmentId: string) => {
    return departments.find(dept => dept.id === departmentId)
  }

  return (
    <OrganizationContext.Provider value={{ 
      employees,
      departments,
      addEmployee,
      removeEmployee,
      updateEmployee,
      addDepartment,
      removeDepartment,
      getEmployeeById,
      getDepartmentById
    }}>
      {children}
    </OrganizationContext.Provider>
  )
}

export const useOrganization = () => {
  const context = useContext(OrganizationContext)
  if (context === undefined) {
    throw new Error('useOrganization must be used within an OrganizationProvider')
  }
  return context
}