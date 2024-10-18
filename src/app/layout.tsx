import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import Sidebar from '../components/Sidebar/Sidebar';

import "./globals.css";


const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col  ">
        <Navbar />

        
        <div className="flex">
          <Sidebar /> 
          <main className="flex-grow pb-[250px]"> 
            {children}
          </main>
        </div>

        <Footer  />
      </body>
    </html>
  );
};

export default RootLayout;