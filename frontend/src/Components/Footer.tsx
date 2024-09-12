import { BsFacebook, BsInstagram, BsYoutube } from 'react-icons/bs';

function Footer() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();

    return (
        <footer className="bg-gray-800 text-white py-5 px-4 sm:px-10 flex flex-col sm:flex-row items-center justify-between">
            <section className="text-center sm:text-left mb-4 sm:mb-0">
                <p className="text-sm sm:text-base">
                    Copyright {year} | All rights reserved | TravelSearch Company
                </p>
            </section>
            <section className="flex items-center justify-center gap-4 sm:gap-6 text-xl sm:text-2xl">
                <a 
                    href="https://facebook.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-yellow-500 transition-colors duration-300"
                >
                    <BsFacebook />
                </a>
                <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-yellow-500 transition-colors duration-300"
                >
                    <BsInstagram />
                </a>
                <a 
                    href="https://youtube.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-yellow-500 transition-colors duration-300"
                >
                    <BsYoutube />
                </a>
            </section>
        </footer>
    );
}

export default Footer;
