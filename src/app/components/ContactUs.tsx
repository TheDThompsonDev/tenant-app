import LABELS from "../constants/labels";

export default function ContactUs() {
//   const contactUs = {
//     title: "Contact Us",
//     description:
//       "Looking for a new place to call home? Contact us today to learn more about our available apartments!",
//       form: {
//         fullName: "Full Name",
//         phone: "Phone",
//         email: "Email",
//       },
//     formSubmitButton: "Send",
//   };

  return (
    <section
      id="contact"
      className="flex flex-col justify-center items-center bg-white text-black p-6 font-bold "
    >
      <section className="max-w-lg flex flex-col items-center">
        <h2 className="text-3xl p-4 mt-8">{LABELS.contactUs.title}</h2>
        <p className="p-4 text-center text-md">{LABELS.contactUs.description}</p>

        <form
          action=""
          className="flex flex-col justify-items items-center p-4 w-full"
        >
          <input
            type="text"
            placeholder={LABELS.contactUs.form.fullName}
            className="outline-2 outline-gray-300 rounded-md py-2 px-3 placeholder-black m-2 w-full font-bold focus:placeholder-transparent"
          />

          <input
            type="text"
            placeholder={LABELS.contactUs.form.phone}
            className="outline-2 outline-gray-300 rounded-md py-2 px-2 placeholder-black m-2 w-full font-bold focus:placeholder-transparent"
          />

          <input
            type="email"
            placeholder={LABELS.contactUs.form.email}
            className="outline-2 outline-gray-300 rounded-md py-2 px-2 placeholder-black m-2 w-full font-bold focus:placeholder-transparent"
          />
          <button
            type="submit"
            className="bg-secondary-blue text-white w-50 rounded-md p-2 m-2 w-full cursor-pointer"
          >
            {LABELS.contactUs.formSubmitButton}
          </button>
        </form>
      </section>
    </section>
  );
}
