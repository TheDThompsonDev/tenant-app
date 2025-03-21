const LABELS = {
  navigation: {
    messages: {
      href: "/messaging",
      text: "Messages",
      icon: "messageIcon",
    },
    unlock_door: {
      href: "/passkey",
      text: "Unlock My Door",
      icon: "lockIcon",
    },
    packages: {
      href: "/locker",
      text: "My Packages",
      icon: "packageIcon",
    },
    parking: {
      href: "/parking",
      text: "Guest Parking Pass",
      icon: "parkingIcon",
    },
  },

  featureHighlight: {
    title: "Modern Problems Require Moderns Solutions",
    featureCards: [
      {
        id: "feature-001",
        title: "AI Escalation",
        description:
          "Our AI system detects repeated complaints and automatically escalates unresolved issues.",
      },
      {
        id: "feature-002",
        title: "Smart Lock ",
        description:
          "Unlock doors and grant guest access with a tap. No keys needed.",
      },
      {
        id: "feature-003",
        title: "Secure Package Locker ",
        description:
          "Receive packages securely with smart locker pickup codes.",
      },
      {
        id: "feature-004",
        title: "Guest Parking Permits",
        description: "Generate digital parking passes for guests in seconds.",
      },

      {
        id: "feature-005",
        title: "One-Tap Noise Reporting",
        description:
          "Report noise or disturbances instantly for a quick resolution.",
      },
      {
        id: "feature-006",
        title: "Digital Lease Signing",
        description:
          "Sign and renew leases digitally - fast, secure, and hassle-free.",
      },
    ],
  },

  buttons: {
    FooterSignUp: {
      label: "Sign Up",
      href: "/signup",
    },
  },

  GuestParkingPassForm: {
    lastName: "Tenant Last Name",
    title: "Guest Parking Pass",
    vehicleMake: "Make",
    vehicleModel: "Model",
    vehicleColor: "Color",
    licensePlate: "License Plate",
    apartmentNumber: "Resident Apartment Number",
    submitButton: "Request a Pass",
    parkingPassId: "Parking Pass ID",
    created: "Pass created for",
    expires: "Pass expires: ",
    successMessage: "Your pass has been successfully created",
    formDescription: "Enter your vehicle details to generate a parking pass",
    passHeaderTitle: "Parking Pass ID",
    validityMessage: "Valid for 24 hours",
    qrPlaceholder: "QR Code Placeholder",
    qrScanMessage: "Scan for verification",
    savePassButton: "Save Pass",
    validityFooter: "Pass will be valid for 24 hours from creation",
    placeholders: {
      make: "e.g. Nissan",
      model: "e.g. Altima",
      color: "e.g. Silver",
      licensePlate: "e.g. 123-456",
      lastName: "e.g. Smith",
      apartmentNumber: "e.g. 101"
    },
    copyCodeButton: "Copy Code",
    copiedMessage: "Copied!",
    secureAccessMessage: "Secure access code",
    vehicleDetails: "Vehicle Details",
    parkingPassCode: "Parking Pass Code",
    hoursAccess: "24h Access",
    shareButton: "Share"
  },

  messaging: {
    title: "Messages",
    loading: "Loading messages...",
    compose: "New Message",
    NewMessage: "New Message",
    errorLoading: "Could not load messages. Please try again later.",
    ariaLabel: "Compose new message",
    noMessages: "No messages yet",
    noMessagesDescription: "When you receive messages, they will appear here.",
    composeButton: "Compose a message",
    backToMessages: "Back to Messages",
    noSearchResults: "No messages match your search",
    searchPlaceholder: "Search messages...",
    fromLabel: "From: ",
    subjectLabel: "Subject",
    messageLabel: "Message",
    subjectPlaceholder: "Enter message subject",
    messagePlaceholder: "Type your message here...",
    allFieldsRequired: "All fields are required",
    sendButton: "Send Message",
    sending: "Sending...",
    errorSending: "Failed to send message. Please try again.",
    errorUserInfo: "Failed to get user information",
    errorUserInformation: "User information not available",
    noMessagesFound: "No messages found",
    noSubject: "No Subject",
    cancel: "Cancel",
  },

  contactUs: {
    title: "Contact Us",
    description:
      "Looking for a new place to call home? Contact us today to learn more about our available apartments!",
    form: {
      fullName: "Full Name",
      phone: "Phone",
      email: "Email",
    },
    formSubmitButton: "Send",
  },

  login: {
    title: "Login",
    emailPlaceholder: "Email",
    passwordPlaceholder: "Password",
    submitButton: "Login",
    loggingInText: "Logging in...",
    orLoginWithText: "Or login with",
    errorMessages: {
      invalidCredentials: "Invalid email or password",
      missingFields: "Please enter both email and password",
      generalError: "An error occurred during login",
    },
    page: {
      backLink: "Back",
      noAccountText: "Don't have an account?",
      contactUsLink: "Contact us",
      imageAlt: "Apartment Building",
    },
  },
  dashboardBtns: {
    viewLease: {
      href: "/lease",
      text: "View Lease",
      icon: "leaseIcon",
    },
    guestParking: {
      href: "/parking",
      text: "Guest Parking Pass",
      icon: "guestParkingIcon",
    },
    viewMessages: {
      href: "/messaging",
      text: "View Messages",
      icon: "mailIcon",
    },
    viewPackages: {
      href: "/locker",
      text: "View Packages",
      icon: "packagesIcon",
    },
    reportProblem: {
      href: "/",
      text: "Report a Noise Complaint",
      icon: "problemIcon",
    },
    unlockDoor: {
      href: "/passkey",
      text: "Unlock My Door",
      icon: "unlockIcon",
    },
  },
  adminDashboardBtns: {
    messages: {
      href: "/messaging",
      text: "View Messages",
      icon: "mailIcon",
    },
    guestParking: {
      href: "/",
      text: "Guest Parking",
      icon: "guestParkingIcon",
    },
    lease: {
      href: "/",
      text: "Generate Lease",
      icon: "leaseIcon",
    },
    newTenant: {
      href: "/",
      text: "Create Tenant Account",
      icon: "userPlus",
    },
  },
  dashboardComponents: {
    title: "Dashboard",
    propertyName: "Willow Creek Apartments",
    addressLabel: "Address:",
    propertyAddress: "1250 Willow Creek Dr. Brookdale, TX 75201",
    websiteLabel: "Website:",
    propertyWebsite: "www.willowcreekapts.com",
    phoneLabel: "Phone:",
    propertyPhone: "(555) 867 - 3412",
  },

  editProfile: {
    title: "Edit Profile",
    formLabels: {
      name: "Name",
      email: "Email",
      passwordCheck: "Password required to update email.",
    },
    formBtns: {
      changePasswordBtn: "Change Password",
      cancelBtn: "Cancel",
      saveBtn: "Save changes",
    },
  },

  passcode: {
    searchParams: "Loading...",
    title: "New Key Details",
    message: "created a new guest key code!",
    date: "Date:",
    status: "Status:",
    unit: "Unit #",
    button: "Make another key",
    emailBody: "Hello, here is your guest key code: {code}",
    copyCodeButton: "Copy Code",
    copiedMessage: "Copied!",
    shareButton: "Share",
    secureAccessMessage: "Secure access code",
    hoursAccess: "24h Access",
    emailSubject: "Guest Key Code"
  },

  doorlock: {
    title: "Door Lock",
    unit: "Unit #2",
    ButtonLabel: "Generate Key",
  },

  PackageLocker: {
    numberTitle: "Locker: ",
    accessCodeTitle: "Digital Access Code: ",
    digitLabel: "Access Code Digit"
  },

  PackageDetails: {
    title: "Package Details",
    numberTitle: "Package #:",
    statusTitle: "Package Status: ",
    deliveredTitle: "Time delivered: ",
    pickupTitle: "Picked up: ",
    pickedupStatus: "This package was picked up",
    notify: "Notify us if there are any issues",
    messageBtn: "send a message",
  },

  packageList: {
    title: "Package Locker",
    description: "View and manage your package deliveries",
    readyForPickup: "Ready for pickup",
    pickedUp: "Picked up",
    yourPackages: "Your Packages",
    helpTitle: "Need Help?",
    helpDescription: "If you have any questions about your packages or need assistance, please contact the property management.",
    contactButton: "Contact Leasing",
    actionBtn: "View"
  },
  package: {
    dateTitle: "Date delivered: ",
    timeTitle: "Time delivered: ",
    pickupTitle: "Picked up: ",
    back: "Back",
    notfoundError: "Package not found.",
  },
  createTenant: {
    title: "Create Tenant Account",
    imageAlt: "Apartment Image",
    fieldInfo: {
      noErrorTitle: "No error",
    },
    validateMessages: {
      firstNameRequired: "A first name is required",
      firstNameLength: "First name must be at least 3 characters",
      firstNameNoError: 'No "error" allowed in first name',
      lastNameRequired: "A last name is required",
      lastNameLength: "Last name must be at least 3 characters",
      lastNameNoError: 'No "error" allowed in last name',
      emailRequired: "An email is required",
      emailFormat: "Email must contain '@'",
      emailNoError: 'No "error" allowed in email',
      apartmentNumRequired: "An apartment number is required",
      apartmentNumLength: "Apartment number must be longer than 2 characters",
      apartmentNumberNoError: 'No "error" allowed in apartment number',
      passwordRequired: " a password is required",
      passwordNoError: 'No "error" allowed in password',
    },
    placeholders: {
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      apartmentNumber: "Apartment Number",
      password: "Password",
    },
    sumbit: {
      title: "Create Account",
      loading: "...",
    },
  },
  generateLease: {
    title: "Generate Lease",
    noErrorTitle: "No error",
    firstNameTitle: 'First Name',
    lastNameTitle: 'Last Name',
    phoneTitle: 'Phone',
    securityDepositTitle: 'Security Deposit',
    apartmentTitle: 'Apartment Number',
    leaseStartTitle: 'Lease Start Date',
    leaseEndTitle: 'Lease End Date',
    monthlyRentTitle: 'Monthly Rent',
    submitTitle: 'Generate New Lease',
    validateMessages: {
      firstNameRequired: "A first name is required",
      firstNameLength: "First name must be at least 3 characters",
      firstNameNoError: 'No "error" allowed in first name',
      lastNameRequired: "A last name is required",
      lastNameLength: "Last name must be at least 3 characters",
      lastNameNoError: 'No "error" allowed in last name',
      phoneRequired: 'A phone number is required',
      phoneFormat: 'Invalid phone number',
      phoneNoError: 'No "error" allowed in phone',
      securityDepositRequired: 'Security deposit is required',
      securityDepositNoError: 'No "error" allowed in Security Deposit',
      leaseStartRequired: "Lease start date required",
      leaseStartFormat: 'Invalid start date',
      leaseEndDateRequired: 'Lease end date required',
      leaseEndFormat: 'Invalid end date',
      monthlyRentRequired: 'Monthly rent required',
      monthlyRentFormat: 'Invalid monthly Rent',
      emailRequired: "An email is required",
      emailFormat: "Email must contain '@'",
      emailNoError: 'No "error" allowed in email',
      apartmentNumRequired: "An apartment number is required",
      apartmentNumLength: "Apartment number must be longer than 2 characters",
      apartmentNumberNoError: 'No "error" allowed in apartment number',
      passwordRequired: " a password is required",
      passwordNoError: 'No "error" allowed in password',
    },
  }
};

export default LABELS;
