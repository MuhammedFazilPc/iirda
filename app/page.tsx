
import React, { use } from "react";


export default function HomePage() {
  return (
    <>
      <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: "url('/stage_ai.jpg')" }}>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black opacity-60 z-10"></div>

        {/* Blurred background */}
        {/* <div className="absolute inset-0 backdrop-blur-sm"></div> */}

        {/* Navbar */}
        {/* <Navbar /> */}

        {/* Text over the background image */}
        <div className="absolute bottom-20 left-10 text-left text-white z-10">
          <h3 className="text-5xl font-bold">Your vision, our expertise. Events made extraordinary</h3>
          <p className="mt-4 text-lg">Discover the future with us</p>
          <div className="mt-8 space-x-4">
            {/* Call Button */}
            <a href="tel:+918304050894">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-500">
                Call Us
              </button>
            </a>

            {/* WhatsApp Button */}
            <a href="https://wa.me/message/RQ44I22HB7WLL1" target="_blank" rel="noopener noreferrer">
              <button className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-400">
                WhatsApp Us
              </button>
            </a>
          </div>
          <div className="mt-4">
            <a href="/partner" target="_blank" rel="noopener noreferrer">
              <button className="px-6 py-3 bg-amber-500 text-white rounded-md hover:bg-amber-400">
                Working Partner
              </button>
            </a>
          </div>

        </div>
      </div>


      {/* Scrollable content after the image */}
      <div className="px-4 py-16 bg-white space-y-16">
        <section id="section1">
          <h2 className="text-3xl font-semibold text-gray-800">iirda:The best event management company in kerala</h2>
          <p className="mt-4 text-gray-600">
            Welcome to Iirda, your trusted partner in creating extraordinary events. Whether you're envisioning a grand corporate gathering, a magical wedding celebration, or a personalized gathering, we're here to turn your dreams into reality.

            With our expertise and passion for event planning, we'll work closely with you to design and execute events that exceed your expectations. From venue selection and decor to entertainment and catering, we handle every detail with precision and care.

            Experience the Iirda difference. Let's create unforgettable memories together
          </p>
        </section>
        <section id="section2">
          <h2 className="text-3xl font-semibold text-gray-800">Complete Event Solutions</h2>
          <h3 className="text-2xl font-semibold text-gray-700">Venue Selection</h3>
          <p className="mt-4 text-gray-600">
            From grand ballrooms to intimate gardens, we find the perfect
            venue for your needs, size, and budget.          </p>
          <h3 className="text-2xl font-semibold text-gray-700">Design & Decor</h3>
          <p className="mt-4 text-gray-600">
            Our creative team brings your vision to life with stunning floral
            arrangements, themed decor, and custom lighting.
          </p>
          <h3 className="text-2xl font-semibold text-gray-700">Catering & Bar Services</h3>
          <p className="mt-4 text-gray-600">
            We offer a wide selection of culinary delights, from gourmet menus
            to themed buffets, tailored to your tastes.
          </p>
          <h3 className="text-2xl font-semibold text-gray-700">Entertainment & Activities
          </h3>
          <p className="mt-4 mb-2 text-gray-600">
            From live music to interactive games, we curate engaging
            entertainment that keeps your guests entertained and engaged.
          </p>
        </section>

        <section id="section3">
          <h2 className="text-3xl font-semibold text-gray-800">Seamless Execution</h2>
          <h3 className="text-2xl font-semibold text-gray-700">Planning</h3>
          <p className="mt-4 text-gray-600">
            Our dedicated event planners work closely with you to
            understand your vision and objectives.
          </p>
          <h3 className="text-2xl font-semibold text-gray-700">Logistics & Coordination
          </h3>
          <p className="mt-4 text-gray-600">
            We manage all logistical details, ensuring smooth setup,
            vendor coordination, and timely execution.
          </p>
          <h3 className="text-2xl font-semibold text-gray-700">On-site Management
          </h3>
          <p className="mt-4 text-gray-600">
            Our team oversees every aspect of the event, ensuring
            flawless execution and addressing any needs.

          </p>
        </section>

        <section id="section3">
          <h2 className="text-3xl font-semibold text-gray-800">Seamless Execution</h2>
          <p className="mt-4 text-gray-600">
            Get in touch with us through various contact methods listed below. We'd love to hear from you!
          </p>
        </section>
      </div>
    </>
  );
}

