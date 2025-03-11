export default function ContactUs() {
  return (
    <section id="contact" className="flex flex-col justify-center items-center bg-white text-black p-6 font-bold ">
      <section className="max-w-lg flex flex-col items-center">
        <h2 className="text-3xl p-4 mt-8">Contact Us</h2>
        <p className="p-4 text-center text-md">
          Looking for a new place to call home? Contact us today to learn more
          about our available apartments!
        </p>

        <form
          action=""
          className="flex flex-col justify-items items-center p-4 w-full"
        >
          <input
            type="text"
            placeholder="Full name"
            className="outline-2 outline-gray-300 rounded-md py-2 px-3 placeholder-black m-2 w-full font-bold focus:placeholder-transparent"
          />

          <input
            type="text"
            placeholder="Phone"
            className="outline-2 outline-gray-300 rounded-md py-2 px-2 placeholder-black m-2 w-full font-bold focus:placeholder-transparent"
          />

          <input
            type="text"
            placeholder="Email"
            className="outline-2 outline-gray-300 rounded-md py-2 px-2 placeholder-black m-2 w-full font-bold focus:placeholder-transparent"
          />
          <button
            type="submit"
            className="bg-secondary-blue text-white w-50 rounded-md p-2 m-2 w-full cursor-pointer"
          >
            Send
          </button>
        </form>
      </section>
    </section>
  );
}
