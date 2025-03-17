const LABELS = {
  navigation: {
    messages: {
      href: "/Messaging",
      text: "Messages",
      icon: "messageIcon",
    },
    unlock_door: {
      href: "/passkey",
      text: "Unlock My Door",
      icon: "lockIcon",
    },
    packages: {
      href: "/",
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
  },

  messaging: {
    title: "Messages",
    loading: "Loading messages...",
    compose: "New Message",
    NewMessage: "New Message",
    errorLoading: "Could not load messages. Please try again later.",
    ariaLabel: "Compose new message",
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
      href: "/",
      text: "View Lease",
      icon: "leaseIcon",
    },
    guestParking: {
      href: "/",
      text: "Guest Parking Pass",
      icon: "guestParkingIcon",
    },
    viewMessages: {
      href: "/",
      text: "View Messages",
      icon: "mailIcon",
    },
    viewPackages: {
      href: "/",
      text: "View Packages",
      icon: "packagesIcon",
    },
    reportProblem: {
      href: "/",
      text: "Report a Problem",
      icon: "problemIcon",
    },
    unlockDoor: {
      href: "/",
      text: "Unlock My Door",
      icon: "unlockIcon",
    },
  },

  editProfile: {
    title: "Edit Profile",
    formLabels: {
      name: "Name",
      email: "Email",
    },
    formBtns: {
      cancelBtn: "Cancel",
      saveBtn: "Save changes",
    },
  },

  doorlock: {
    title: "Door Lock",
    unit: "Unit #2",
    ButtonLabel: "Generate Key",
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
  },

    package: {
      back: "Back",
      packageCards: [
        {
          id: "package-001",
          date: "3/15/25",
          time: "3:00 PM",
          locker: "A1",
          lockerCode: "1234",
          status: "Ready for pickup",
          pickupDate: "",
        },
        {
          id: "package-002",
          date: "3/11/25",
          time: "10:08 AM",
          locker: "A3",
          lockerCode: "2468",
          status: "Ready for pickup",
          pickupDate: "",
        },
        {
          id: "package-003",
          date: "3/1/25",
          time: "10:08 AM",
          locker: "A2",
          lockerCode: "1200",
          status: "Picked up",
          pickupDate: "3/2/25",
        },
        {
          id: "package-004",
          date: "2/15/25",
          time: "11:08 AM",
          locker: "A1",
          lockerCode: "0101",
          status: "Picked up",
          pickupDate: "2/15/25",
        },
      ],
    },

};

export default LABELS;
