import { employeeDatas, employeeNames } from '../data/Data'

class EmployeeData {
  Age: number = 0
  BusinessTravel: string = ''
  DailyRate: number = 0
  Department: string = ''
  DistanceFromHome: number = 0
  Education: number = 0
  EducationField: string = ''
  EmployeeNumber: number = 0
  EnvironmentSatisfaction: number = 0
  Gender: string = ''
  HourlyRate: number = 0
  JobInvolvement: number  = 0
  JobLevel: number = 0
  JobRole: string = ''
  JobSatisfaction: number = 0
  MaritalStatus: string = ''
  MonthlyIncome: number = 0
  MonthlyRate: number = 0
  NumCompaniesWorked: number = 0
  OverTime: string = ''
  PercentSalaryHike: number = 0
  PerformanceRating: number = 0
  RelationshipSatisfaction: number = 0
  StockOptionLevel: number = 0
  TotalWorkingYears: number = 0
  TrainingTimesLastYear: number = 0
  WorkLifeBalance: number = 0
  YearsAtCompany: number = 0
  YearsInCurrentRole: number = 0
  YearsSinceLastPromotion: number = 0
  YearsWithCurrManager: number = 0
}

class Employee extends EmployeeData {
  name: string = ''
  id: number = 0
}

// id start from 0
function GetEmployee(id: number): Employee {
  const data = JSON.parse(employeeDatas[id]) as EmployeeData
  const employee = data as Employee
  employee.name = employeeNames[id]
  employee.id = id + 1
  return employee
}

export { GetEmployee, Employee, EmployeeData }