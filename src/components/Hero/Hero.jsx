import React from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';

const BannerSection = () => {
  return (
    <main className="overflow-hidden">
      <section className="">
        <div className="max-w-6xl mx-auto px-5">
          <div className="relative grid items-center gap-12 md:grid-cols-2 lg:grid-cols-[1fr_max-content] lg:gap-16 lg:mt-0 lg:mb-28">
            {/* Image */}
            <img 
              src="https://i.ibb.co/vB5LTFG/Headphone.png"
              alt="banner" 
              className="block max-w-[18rem] h-auto mt-8 justify-self-center md:order-1 md:max-w-[20rem] lg:max-w-[25rem] lg:mr-20"
            />

            {/* Content */}
            <div className="flex flex-col items-start gap-7">
              <h1 className="font-bold text-[clamp(2.648rem,6vw,4.241rem)] leading-tight tracking-tight">
                Experience Media Like Never Before
              </h1>
              <p className="text-[clamp(1rem,2vw,1.125rem)] text-gray-200 balance">
                Enjoy award-winning stereo beats with wireless listening freedom and sleek,
                streamlined with premium padded and delivering first-rate playback.
              </p>
              <button className="inline-flex items-center justify-center gap-2 px-8 py-3 font-medium text-white bg-gray-900 rounded shadow-md hover:bg-gray-800 transition-colors">
                Our Products
                <ArrowForwardIcon className="w-5 h-5 text-black" />
              </button>
            </div>

            {/* Social Links */}
            <div className="absolute top-1/4 right-0 grid justify-items-center gap-2">
              <div className="relative py-12">
                <div className="absolute top-0 left-1/2 w-px h-8 bg-black -translate-x-1/2"></div>
                <div className="flex flex-col gap-4 py-4">
                  <a href="#" className="text-black hover:text-gray-500 transition-colors">
                    <FacebookIcon className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-black hover:text-gray-500 transition-colors">
                    <InstagramIcon className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-black hover:text-gray-500 transition-colors">
                    <TwitterIcon className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-black hover:text-gray-500 transition-colors">
                    <YouTubeIcon className="w-6 h-6" />
                  </a>
                </div>
                <div className="absolute bottom-0 left-1/2 w-px h-8 bg-black -translate-x-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default BannerSection;
