import React, { useState } from 'react';
import { Box, Stepper, Step, StepLabel, Button, Paper } from '@mui/material';
import { MortgageApplication } from '../../types/MortgageApplication';
import PersonalDetailsSection from './sections/PersonalDetailsSection';
import DependentsSection from './sections/DependentsSection';
import AddressHistorySection from './sections/AddressHistorySection';
import IncomeSection from './sections/IncomeSection';
import AdverseSection from './sections/AdverseSection';
import InsuranceSection from './sections/InsuranceSection';
import MortgageRequirementsSection from './sections/MortgageRequirementsSection';
import PropertyInformationSection from './sections/PropertyInformationSection';
import CreditCommitmentsSection from './sections/CreditCommitmentsSection';
import PropertyPortfolioSection from './sections/PropertyPortfolioSection';
import ContactsSection from './sections/ContactsSection';
import BankDetailsSection from './sections/BankDetailsSection';
import AdditionalInformationSection from './sections/AdditionalInformationSection';

const steps = [
  'Personal Details',
  'Dependents',
  'Address History',
  'Income',
  'Adverse',
  'Insurance',
  'Mortgage Requirements',
  'Property Information',
  'Credit Commitments',
  'Property Portfolio',
  'Contacts',
  'Bank Details',
  'Additional Information'
];

const MortgageApplicationForm: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<MortgageApplication>({
    personalDetails: {
      numberOfApplicants: '',
      title: '',
      firstName: '',
      middleNames: '',
      surname: '',
      nameChanged: false,
      dateOfBirth: '',
      age: '',
      anticipatedRetirementAge: '',
      timeUntilRetirement: '',
      gender: '',
      maritalStatus: '',
      countryOfBirth: '',
      nationality: '',
      citizenship: '',
      countryOfResidence: '',
      nationalInsuranceNo: '',
      mobileNumber: '',
      workNumber: '',
      emailAddress: '',
      preferredContactMethod: '',
      preferredContactTime: '',
      firstTimeBuyer: false,
      hasRentalProperty: false,
      hasProminentPublicFunction: false,
      hasPowerOfAttorney: false,
      hasLongTermCare: false,
      hasCriminalConvictions: false,
      hasWill: false,
      wantsProductUpdates: false
    },
    dependents: [],
    addressHistory: [],
    income: {
      employmentStatus: '',
      employmentDetails: [],
      additionalIncome: []
    },
    adverse: {
      latePayments: false,
      currentArrears: false,
      missedPayments: false,
      paydayLoans: false,
      ccjs: false,
      defaults: false,
      ivaOrDmp: false,
      paymentArrangements: false,
      bankruptcy: false,
      repossession: false,
      mortgageDeclined: false,
      exceededCreditLimit: false,
      otherCreditProblems: false
    },
    insurance: {
      hasLifeInsurance: false,
      hasCriticalIllnessCover: false,
      hasIncomeProtection: false,
      hasBuildingsInsurance: false
    },
    mortgageRequirements: {
      type: 'Purchase',
      propertyType: 'Residential',
      productType: '',
      productTerm: 0,
      mortgageTerm: 0,
      mortgageAmount: 0,
      maximumMonthlyBudget: 0,
      loanToValue: 0,
      features: {
        addFeeToLoan: false,
        freeValuation: false,
        freeConveyancing: false,
        cashback: false,
        noEarlyRepaymentPenalties: false,
        allowOverpayments: false
      }
    },
    propertyInformation: {
      address: {
        country: '',
        buildingName: '',
        buildingNumber: '',
        streetName: '',
        town: '',
        city: '',
        postcode: '',
        onElectoralRegister: false,
        bankAccountsRegistered: false,
        residencyStatus: '',
        moveInDate: '',
        timeAtAddress: ''
      },
      propertyType: '',
      propertyStyle: '',
      tenure: '',
      isExLocalAuthority: false,
      isNewBuild: false,
      buildDate: '',
      wallConstruction: '',
      roofConstruction: '',
      hasSprayFoamInsulation: false,
      hasSolarPanels: false,
      hasCommercialProperties: false,
      bedrooms: 0,
      bathrooms: 0,
      wcs: 0,
      receptionRooms: 0,
      kitchens: 0,
      parkingFacilities: '',
      epcRating: '',
      groundRent: 0,
      serviceCharge: 0
    },
    creditCommitments: [],
    propertyPortfolio: {
      properties: []
    },
    contacts: {
      estateAgentInvolved: false,
      valuationAccessContact: {
        name: '',
        phone: '',
        email: ''
      }
    },
    bankDetails: {
      accountHolder: '',
      sortCode: '',
      accountNumber: '',
      bankName: ''
    },
    additionalInformation: {
      incomeChanges: '',
      earlyRepaymentPlans: '',
      planToMove: ''
    }
  });

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log(formData);
  };

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return <PersonalDetailsSection data={formData.personalDetails} onChange={(data) => setFormData({ ...formData, personalDetails: data })} />;
      case 1:
        return <DependentsSection data={formData.dependents} onChange={(data) => setFormData({ ...formData, dependents: data })} />;
      case 2:
        return <AddressHistorySection data={formData.addressHistory} onChange={(data) => setFormData({ ...formData, addressHistory: data })} />;
      case 3:
        return <IncomeSection data={formData.income} onChange={(data) => setFormData({ ...formData, income: data })} />;
      case 4:
        return <AdverseSection data={formData.adverse} onChange={(data) => setFormData({ ...formData, adverse: data })} />;
      case 5:
        return <InsuranceSection data={formData.insurance} onChange={(data) => setFormData({ ...formData, insurance: data })} />;
      case 6:
        return <MortgageRequirementsSection data={formData.mortgageRequirements} onChange={(data) => setFormData({ ...formData, mortgageRequirements: data })} />;
      case 7:
        return <PropertyInformationSection data={formData.propertyInformation} onChange={(data) => setFormData({ ...formData, propertyInformation: data })} />;
      case 8:
        return <CreditCommitmentsSection data={formData.creditCommitments} onChange={(data) => setFormData({ ...formData, creditCommitments: data })} />;
      case 9:
        return <PropertyPortfolioSection data={formData.propertyPortfolio} onChange={(data) => setFormData({ ...formData, propertyPortfolio: data })} />;
      case 10:
        return <ContactsSection data={formData.contacts} onChange={(data) => setFormData({ ...formData, contacts: data })} />;
      case 11:
        return <BankDetailsSection data={formData.bankDetails} onChange={(data) => setFormData({ ...formData, bankDetails: data })} />;
      case 12:
        return <AdditionalInformationSection data={formData.additionalInformation} onChange={(data) => setFormData({ ...formData, additionalInformation: data })} />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>

      <Paper elevation={3} sx={{ p: 3 }}>
        {renderStep()}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
          >
            {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default MortgageApplicationForm; 