interface PackageDetailsProps {
  id: string;
  lockerNumber: string;
  lockerCode: string;
}

export default function PackageDetails({
  id,
  lockerNumber,
  lockerCode,
}: PackageDetailsProps) {
  const splitCode = lockerCode.split("");

  return (
    <div className="flex items-center justify-center flex-col rounded-md p-4 text-center text-white w-full lg:w-1/2 m-auto bg-secondary-blue text-white  ">
      <span className="text-xl font-bold ">Locker: {lockerNumber}</span>
      {/* TODO: generate digital access code instead of hard coded*/}
      <span className="text-xl font-bold ">Digital Access Code: </span>

      <div className="flex my-4">
        {splitCode.map((digit, index) => (
          <div key={index}>
            <p className="text-2xl font-bold border p-4 rounded-md mx-4 bg-primary-green">
              {digit}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
