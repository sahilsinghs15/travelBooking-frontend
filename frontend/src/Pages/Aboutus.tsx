import Footer from "../Components/Footer";

function Aboutus() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-blue-800 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-3xl font-bold">TravelSearch</div>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="/" className="hover:text-yellow-400">Home</a></li>
              <li><a href="/travel-packages" className="hover:text-yellow-400">Destinations</a></li>
              <li><a href="/aboutus" className="hover:text-yellow-400">About</a></li>
              {/* Add login/signup links or profile dropdown here as needed */}
            </ul>
          </nav>
        </div>
      </header>

      <main className="py-12">
        <div className="container mx-auto px-4">
          <section className="bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 text-white py-12 rounded-lg shadow-lg">
            <h2 className="text-6xl font-bold text-center mb-8">About Us</h2>
            <div className="flex flex-col md:flex-row items-center justify-between">
              <section className="md:w-1/2 px-4 mb-8 md:mb-0">
                <h3 className="text-4xl font-bold mb-4">TravelSearch</h3>
                <h4 className="text-2xl text-teal-200 font-semibold mb-4">
                  Contact Us: 913-686-5327 | Email: support@travelsearch.com
                </h4>
                <p className="text-lg mb-6">
                  At TravelSearch, we're dedicated to turning your travel dreams into reality. Our passionate team of travel experts
                  is committed to providing you with the best flights, accommodations, and experiences to fit your unique preferences
                  and budget. We strive to make your travel planning as seamless and enjoyable as possible with our intuitive platform
                  and personalized service.
                </p>
                <p className="text-lg mb-6">
                  With years of experience in the industry, we offer a range of services to cater to every traveler’s needs. Whether you’re
                  looking for a relaxing beach vacation, an adventurous getaway, or a cultural city tour, we have you covered. Our user-friendly
                  website and dedicated customer support team ensure that your journey begins and ends with ease.
                </p>
                <p className="text-lg">
                  Join us at TravelSearch and embark on your next adventure with confidence. Let us help you create memories that will
                  last a lifetime.
                </p>
              </section>
              <div className="md:w-1/2 px-4">
                <img
                  src="https://images.pexels.com/photos/3278215/pexels-photo-3278215.jpeg?cs=srgb&dl=pexels-freestockpro-3278215.jpg&fm=jpg"
                  alt="Travel Experience"
                  className="rounded-lg shadow-lg w-full h-auto object-cover"
                />
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer/>
    </div>
  );
}

export default Aboutus;
