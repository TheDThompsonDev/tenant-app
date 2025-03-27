"use client";

import Header from "@/app/components/Header";
import ParkingLimitContainer from "../components/ParkingLimitContainer";
import Link from "next/link";
import { Pencil, LucideIcon, UserRound } from "lucide-react";
import LABELS from "../constants/labels";
import ICON_MAP from "../constants/icons";
import { getCurrentUser } from "@/lib/appwrite";
import { Models } from "appwrite";
import { useCallback, useEffect, useState } from "react";
import { VoiceChatButton } from "../components/voicechat/voiceChatButton";
import { VoiceChatModal } from "../components/voicechat/voiceChatModal";
import { useVoiceChat } from "../hooks/useVoiceChat";
import { Toast } from "../components/Toast";

type UserType = Models.User<Models.Preferences>;

interface PropertyData {
  propertyName: string;
  address: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  websiteURL: string;
  phoneNumber: string;
}

const userCache: {
  data: UserType | null;
  timestamp: number;
} = {
  data: null,
  timestamp: 0,
};

const propertyCache: {
  data: PropertyData[] | null;
  timestamp: number;
} = {
  data: null,
  timestamp: 0,
};

const CACHE_EXPIRATION = 30000;

const Dashboard = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [property, setProperty] = useState<PropertyData[] | null>(null);
  const [apartmentNumber, setApartmentNumber] = useState<string>("");

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const reportToastProblem = async () => {
    if (!user) {
      console.error("Tenant not found, cannot report problem!");
      setToast({
        message: "Please sign in to report a problem",
        type: "error",
      });
      return;
    }
    try {
      const res = await fetch("/api/noise", {
        method: "POST",
        body: JSON.stringify({
          user: user.$id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        setToast({
          message: "Your problem has been reported successfully!",
          type: "success",
        });
      } else {
        throw new Error("Failed to report a problem");
      }
      return res.json();
    } catch (error) {
      console.error("error reporting problem:", error);
      setToast({
        message: "Failed to report problem. Please try again",
        type: "error",
      });
    }
  };

  const isCacheValid = useCallback(() => {
    if (!userCache.data || !propertyCache.data) return false;
    const now = Date.now();
    return (
      now - userCache.timestamp < CACHE_EXPIRATION &&
      now - propertyCache.timestamp < CACHE_EXPIRATION
    );
  }, []);

  const fetchUserData = useCallback(async () => {
    try {
      if (isCacheValid()) {
        console.log("Using cached user data");
        setUser(userCache.data as UserType);

        // If we have a cached user,
        //fetch their apartment number
        if (userCache.data?.$id) {
          const response = await fetch(`/api/users/${userCache.data.$id}`);
          if (response.ok) {
            const userData = await response.json();
            if (userData) {
              setApartmentNumber(userData.apartmentNumber || "");
            }
          }
        }
        return;
      }

      console.log("Fetching user data from API");
      const userResponse = await getCurrentUser();

      if (userResponse.success && userResponse.data) {
        setUser(userResponse.data as UserType);
        userCache.data = userResponse.data as UserType;
        userCache.timestamp = Date.now();

        // Fetch the user's apartment number from the db
        if (userResponse.data.$id) {
          const response = await fetch(`/api/users/${userResponse.data.$id}`);
          if (response.ok) {
            const userData = await response.json();
            if (userData) {
              setApartmentNumber(userData.apartmentNumber || "");
            }
          }
        }
      } else {
        console.error("Failed to get user:", userResponse.error);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, [isCacheValid]);

  const fetchPropertyData = useCallback(async () => {
    try {
      if (isCacheValid()) {
        console.log("Using cached property data");
        setProperty(propertyCache.data as PropertyData[]);
        return;
      }

      console.log("Fetching property data from API");
      const propertyResponse = await fetch("/api/property", { method: "GET" });

      const propertyData = await propertyResponse.json();
      console.log("Property:", propertyData);
      setProperty(propertyData);
      propertyCache.data = propertyData;
      propertyCache.timestamp = Date.now();
    } catch (error) {
      console.error("Error fetching property data:", error);
    }
  }, [isCacheValid]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await Promise.all([fetchUserData(), fetchPropertyData()]);
        // reportToastProblem();
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [fetchUserData, fetchPropertyData]);

  const renderIcon = (iconName: string) => {
    if (!iconName || !ICON_MAP[iconName]) return null;
    const IconComponent = ICON_MAP[iconName] as LucideIcon;
    return <IconComponent size={36} />;
  };

  const EditProfileBtn = ({ user }: { user: { name: string } }) => {
    const buttonColor =
      user.name === "admin" ? "bg-secondary-blue" : "bg-primary-green hover:bg-alternate-green hover:text-primary-green";
    const textColor =
      user.name === "admin" ? "text-alternate-light-gray" : "text-alternate-green";
    const hiddenButton = user.name === "admin" ? "hidden" : "block";
    return (
      <Link
        href="/editProfile"
        className={`${buttonColor} ${hiddenButton} border-2 border-white p-1 rounded-lg relative left-10 bottom-[8rem] lg:static lg:border-none lg:px-4 lg:py-2 lg:mt-4 transition-all duration-200 ease-in-out`}
      >
        <div className="block lg:hidden">
          <Pencil size={16} fill="white" />
        </div>
        <div className="hidden lg:block">
          <p className=''>Edit Profile</p>
        </div>
      </Link>
    );
  };

  const Profile = ({ user }: { user: UserType }) => {
    if (!user) return <div>Loading...</div>;
    const userName = user ? user.name : "Loading...";
    const userEmail = user ? user.email : "Loading...";
    const textColor =
      user.name === "admin"
        ? "text-white lg:text-secondary-blue"
        : "text-white";
    const paddingBottom = user.name === "admin" ? "" : "p-10";
    const iconColor =
      user.name === "admin"
        ? " bg-alternate-light-gray text-secondary-blue"
        : "bg-alternate-green text-primary-green";
    return (
      <div
        className={`${textColor} mt-14 ${paddingBottom} flex flex-col items-center lg:items-start relative lg:mt-0 lg:px-4`}
      >
        <UserRound
          width={24}
          height={24}
          className={`w-24 h-24 rounded-full object-cover border-2 border-white lg:relative ${iconColor}`}
        />

        <h3 className="mt-5 text-3xl">{userName}</h3>
        <p>{userEmail}</p>
        {apartmentNumber && <p>Apartment: {apartmentNumber}</p>}
        <EditProfileBtn user={user} />
      </div>
    );
  };

  const Address = ({ user }: { user: UserType }) => {
    const textColor =
      user.name === "admin"
        ? "text-secondary-blue"
        : "text-alternate-light-gray";
    return (
      <div className={`${textColor} p-6 font-semibold text-sm`}>
        {property && property.length > 0 ? (
          <>
            <h2 className="text-2xl">{property[0].propertyName}</h2>
            <p>
              {LABELS.dashboardComponents.addressLabel}
              {property[0].address.address}, {property[0].address.city},{" "}
              {property[0].address.state} {property[0].address.zipCode}{" "}
              {property[0].address.country}
            </p>
            <p>
              {LABELS.dashboardComponents.websiteLabel} {property[0].websiteURL}
            </p>
          </>
        ) : (
          <p>Loading property information...</p>
        )}
        {property && property.length > 0 && (
          <p>
            {LABELS.dashboardComponents.phoneLabel} {property[0].phoneNumber}
          </p>
        )}
      </div>
    );
  };

  const DashboardBtns = ({ user }: { user: UserType }) => {
    const textColor =
      user.name === "admin"
        ? "text-secondary-blue"
        : "text-alternate-light-gray";
    return (
      <div className="p-6">
        <h3 className={`${textColor} hidden lg:block text-3xl mb-4`}>
          {LABELS.dashboardComponents.title}{" "}
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {user?.name === "admin"
            ? Object.entries(LABELS.adminDashboardBtns).map(
                ([label, { href, text, icon }]) => {
                  const Icon = renderIcon(icon);

                  return (
                    <Link
                      key={label}
                      href={href}
                      className="bg-secondary-blue flex flex-col gap-2 items-center justify-center p-6 rounded-lg text-white"
                    >
                      {Icon}
                      <p className="text-white text-center text-xs lg:text-sm">
                        {text}
                      </p>
                    </Link>
                  );
                }
              )
            : Object.entries(LABELS.dashboardBtns).map(
                ([label, { href, text, icon }]) => {
                  const Icon = renderIcon(icon);

                  if (label === "reportProblem") {
                    return (
                      <button
                        key={label}
                        className="bg-primary-green hover:bg-alternate-green flex flex-col gap-2 items-center justify-center p-6 rounded-lg text-alternate-green hover:text-primary-green drop-shadow-md hover:cursor-pointer"
                        onClick={reportToastProblem}
                      >
                        {Icon}
                        <p className=" text-center text-xs lg:text-sm">
                          {text}
                        </p>
                      </button>
                    );
                  }

                  return (
                    <Link
                      key={label}
                      href={href}
                      className="bg-primary-green hover:bg-alternate-green hover:text--green flex flex-col gap-2 items-center justify-center p-6 rounded-lg text-alternate-green hover:text-primary-green transition-all ease-in-out duration-200 drop-shadow-md  "
                    >
                      {Icon}
                      <p className=" text-center text-xs lg:text-sm">
                        {text}
                      </p>
                    </Link>
                  );
                }
              )}
        </div>
      </div>
    );
  };

  const TenantDashboard = ({ user }: { user: UserType }) => {
    const [open, setOpen] = useState(false);
    const [conversationStarted, setConversationStarted] = useState(false);

    const { messages, startConversation, endConversation } = useVoiceChat({});

    const handleStartConversation = async () => {
      await startConversation({
        agentId: "w9HcNnfGpTdqixgjY6vo",
      });
      setConversationStarted(true);
    };

    return (
      <div className="relative h-screen">
        <div className='absolute inset-0 bg-[url("/street-view.jpeg")] bg-cover bg-center lg:bg-none lg:bg-secondary-blue'>
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/20 lg:hidden" />
        </div>
        <div className="relative">
          <Header />
          <div>
            <div className='hidden lg:block lg:w-full lg:h-60 lg:bg-[url("/street-view.jpeg")] bg-cover bg-center'>
              <div className="w-full h-full bg-black/20" />
            </div>

            {/* Mobile */}
            <div className="lg:hidden">
              <Profile user={user} />
              <div className="bg-secondary-blue lg:flex lg:flex-row">
                <Address user={user} />
                <DashboardBtns user={user} />
              </div>
            </div>

            {/* Desktop */}
            <div className="hidden lg:flex flex-row mx-auto max-w-400 relative">
              <div className="flex flex-col w-1/3 px-5 relative bottom-10">
                <Profile user={user} />
                <Address user={user} />
              </div>
              <div className="flex-1">
                <DashboardBtns user={user} />
              </div>
            </div>

            <ParkingLimitContainer />
          </div>
        </div>
        <div className="fixed bottom-2 right-20 mr-2 z-50">
          <VoiceChatButton onClick={() => setOpen(true)} />
        </div>
        <div className="fixed left-1/2 z-50">
          {toast && (
            <Toast
              message="Complaint Reported"
              type={toast.type}
              onDismiss={() => setToast(null)}
            />
          )}
        </div>
        <VoiceChatModal
          open={open}
          onClose={async () => {
            setOpen(false);
            await endConversation();
            setConversationStarted(false);
          }}
          messages={messages}
          startConversation={handleStartConversation}
          endConversation={async () => {
            await endConversation();
            setConversationStarted(false);
          }}
          conversationStarted={conversationStarted}
        />
      </div>
    );
  };

  const AdminDashboard = ({ user }: { user: UserType }) => {
    return (
      <div className="relative">
        <div className='absolute inset-0 bg-[url("/street-view.jpeg")] bg-cover bg-center lg:bg-none lg:bg-alternate-light-gray'>
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/20 lg:hidden" />
        </div>
        <div className="relative">
          <Header />
          <div>
            <div className='hidden lg:block lg:w-full lg:h-60 lg:bg-[url("/street-view.jpeg")] bg-cover bg-center'>
              <div className="w-full h-full bg-black/20" />
            </div>

            {/* Mobile */}
            <div className="lg:hidden">
              <Profile user={user} />
              <div className="bg-alternate-light-gray lg:flex lg:flex-row min-h-screen">
                <Address user={user} />
                <DashboardBtns user={user} />
              </div>
            </div>

            {/* Desktop */}
            <div className="hidden lg:flex flex-row mx-auto max-w-400 relative">
              <div className="flex flex-col w-1/3 px-5 relative bottom-10 min-h-screen">
                <Profile user={user} />
                <Address user={user} />
              </div>
              <div className="flex-1">
                <DashboardBtns user={user} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderDashboard = () => {
    if (!user) return null;

    if (user.name === "admin") {
      return <AdminDashboard user={user} />;
    } else {
      return <TenantDashboard user={user} />;
    }
  };

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <p>Loading...</p>
        </div>
      ) : user ? (
        renderDashboard()
      ) : (
        <div className="flex items-center justify-center h-screen">
          <p className="text-lg text-gray-600">
            Please log in to view your dashboard
          </p>
        </div>
      )}
    </>
  );
};

export default Dashboard;
