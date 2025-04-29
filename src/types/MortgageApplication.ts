export interface PersonalDetails {
  numberOfApplicants: string;
  title: string;
  firstName: string;
  middleNames: string;
  surname: string;
  nameChanged: boolean;
  dateOfBirth: string;
  age: string;
  anticipatedRetirementAge: string;
  timeUntilRetirement: string;
  gender: string;
  maritalStatus: string;
  countryOfBirth: string;
  nationality: string;
  citizenship: string;
  countryOfResidence: string;
  nationalInsuranceNo: string;
  mobileNumber: string;
  workNumber: string;
  emailAddress: string;
  preferredContactMethod: string;
  preferredContactTime: string;
  firstTimeBuyer: boolean;
  hasRentalProperty: boolean;
  hasProminentPublicFunction: boolean;
  hasPowerOfAttorney: boolean;
  hasLongTermCare: boolean;
  hasCriminalConvictions: boolean;
  hasWill: boolean;
  wantsProductUpdates: boolean;
}

export interface Dependent {
  name: string;
  age: string;
  relationship: string;
}

export interface Address {
  country: string;
  buildingName: string;
  buildingNumber: string;
  streetName: string;
  town: string;
  city: string;
  postcode: string;
  onElectoralRegister: boolean;
  bankAccountsRegistered: boolean;
  residencyStatus: string;
  moveInDate: string;
  timeAtAddress: string;
}

export interface Income {
  employmentStatus: string;
  employmentDetails: EmploymentDetail[];
  additionalIncome: AdditionalIncome[];
}

export interface EmploymentDetail {
  employerName: string;
  jobTitle: string;
  startDate: string;
  endDate?: string;
  income: number;
}

export interface AdditionalIncome {
  type: string;
  amount: number;
  frequency: string;
}

export interface Adverse {
  latePayments: boolean;
  currentArrears: boolean;
  missedPayments: boolean;
  paydayLoans: boolean;
  ccjs: boolean;
  defaults: boolean;
  ivaOrDmp: boolean;
  paymentArrangements: boolean;
  bankruptcy: boolean;
  repossession: boolean;
  mortgageDeclined: boolean;
  exceededCreditLimit: boolean;
  otherCreditProblems: boolean;
}

export interface Insurance {
  hasLifeInsurance: boolean;
  hasCriticalIllnessCover: boolean;
  hasIncomeProtection: boolean;
  hasBuildingsInsurance: boolean;
}

export interface MortgageRequirements {
  type: 'Purchase' | 'Remortgage';
  propertyType: 'Residential' | 'Buy-To-Let';
  productType: string;
  productTerm: number;
  mortgageTerm: number;
  mortgageAmount: number;
  maximumMonthlyBudget: number;
  loanToValue: number;
  features: {
    addFeeToLoan: boolean;
    freeValuation: boolean;
    freeConveyancing: boolean;
    cashback: boolean;
    noEarlyRepaymentPenalties: boolean;
    allowOverpayments: boolean;
  };
}

export interface PropertyInformation {
  address: Address;
  propertyType: string;
  propertyStyle: string;
  tenure: string;
  isExLocalAuthority: boolean;
  isNewBuild: boolean;
  buildDate: string;
  wallConstruction: string;
  roofConstruction: string;
  hasSprayFoamInsulation: boolean;
  hasSolarPanels: boolean;
  hasCommercialProperties: boolean;
  bedrooms: number;
  bathrooms: number;
  wcs: number;
  receptionRooms: number;
  kitchens: number;
  parkingFacilities: string;
  epcRating: string;
  groundRent: number;
  serviceCharge: number;
}

export interface CreditCommitment {
  type: string;
  provider: string;
  accountNumber: string;
  balance: number;
  monthlyPayment: number;
  toBeRepaid: boolean;
}

export interface PropertyPortfolio {
  properties: Property[];
}

export interface Property {
  address: Address;
  value: number;
  mortgage: number;
  monthlyPayment: number;
  monthlyRent: number;
}

export interface Contact {
  estateAgentInvolved: boolean;
  estateAgentDetails?: {
    name: string;
    company: string;
    phone: string;
    email: string;
  };
  solicitorDetails?: {
    name: string;
    company: string;
    phone: string;
    email: string;
  };
  valuationAccessContact: {
    name: string;
    phone: string;
    email: string;
  };
}

export interface BankDetails {
  accountHolder: string;
  sortCode: string;
  accountNumber: string;
  bankName: string;
}

export interface AdditionalInformation {
  incomeChanges: string;
  earlyRepaymentPlans: string;
  planToMove: string;
}

export interface MortgageApplication {
  personalDetails: PersonalDetails;
  dependents: Dependent[];
  addressHistory: Address[];
  income: Income;
  adverse: Adverse;
  insurance: Insurance;
  mortgageRequirements: MortgageRequirements;
  propertyInformation: PropertyInformation;
  creditCommitments: CreditCommitment[];
  propertyPortfolio: PropertyPortfolio;
  contacts: Contact;
  bankDetails: BankDetails;
  additionalInformation: AdditionalInformation;
} 