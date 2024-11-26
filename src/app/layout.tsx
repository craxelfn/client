import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import Sidebar from '../components/Sidebar/Sidebar';
import Chatbot from '../components/Chatbot';
import { AuthContextProvider } from '../context/AuthContext';

import './globals.css';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <meta
          name="format-detection"
          content="telephone=no, date=no, email=no, address=no"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <AuthContextProvider>
          <Navbar />
          <div className="flex">
            <Sidebar />
            <main className="flex-grow pb-[250px]">
              {children}
            </main>
          </div>
          <Chatbot />
          <Footer />
        </AuthContextProvider>
      </body>
    </html>
  );
};

export default RootLayout;
