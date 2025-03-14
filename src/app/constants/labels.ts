const LABELS = {
  navigation: {
    messages: {
      href: '/',
      text: 'Messages',
      icon: 'messageIcon',
    },
    unlock_door: {
      href: '/',
      text: 'Unlock My Door',
      icon: 'lockIcon',
    },
    packages: {
      href: '/',
      text: 'My Packages',
      icon: 'packageIcon',
    },
    parking: {
      href: '/',
      text: 'Guest Parking Pass',
      icon: 'parkingIcon',
    },
  },

  featureHighlight: {
    title: 'Modern Problems Require Moderns Solutions',
    featureCards: [
      {
        id: 'feature-001',
        title: 'AI Escalation',
        description:
          'Our AI system detects repeated complaints and automatically escalates unresolved issues.',
      },
      {
        id: 'feature-002',
        title: 'Smart Lock ',
        description:
          'Unlock doors and grant guest access with a tap. No keys needed.',
      },
      {
        id: 'feature-003',
        title: 'Secure Package Locker ',
        description:
          'Receive packages securely with smart locker pickup codes.',
      },
      {
        id: 'feature-004',
        title: 'Guest Parking Permits',
        description: 'Generate digital parking passes for guests in seconds.',
      },

      {
        id: 'feature-005',
        title: 'One-Tap Noise Reporting',
        description:
          'Report noise or disturbances instantly for a quick resolution.',
      },
      {
        id: 'feature-006',
        title: 'Digital Lease Signing',
        description:
          'Sign and renew leases digitally - fast, secure, and hassle-free.',
      },
    ],
  },

        buttons:{
        FooterSignUp: {
          label: "Sign Up",
          href: "/signup",
        },
      },
  
  GuestParkingPassForm: {
    title: 'Guest Parking Pass',
    vehicleMake: 'Make',
    vehicleModel: 'Model',
    vehicleColor: 'Color',
    licensePlate: 'License Plate',
    apartmentNumber: 'Resident Apartment Number',
    submitButton: 'Request a Pass',
    parkingPassId: 'Parking Pass ID',
    created: 'Pass created for',
    expires: 'Pass expires: ',
  },

  contactUs: {
    title: 'Contact Us',
    description:
      'Looking for a new place to call home? Contact us today to learn more about our available apartments!',
    form: {
      fullName: 'Full Name',
      phone: 'Phone',
      email: 'Email',
    },
    formSubmitButton: 'Send',
  },

};

export default LABELS;
