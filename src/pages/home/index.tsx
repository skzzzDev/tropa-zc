import { useState, useEffect } from "react";
import { Header } from "../../components/header";
import { Loading } from "../../components/loading";
import  Template  from '../../components/cards/';
import UserTable from "../../components/users";
import { Footer } from "../../components/footer";

export function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="bg-[#494949] min-h-screen">
      <Header />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-col items-center">
          <div className="mt-10 sm:flex sm:justify-start">
            <Template />
          </div>

          <div className="mt-10 w-full px-4">
            <UserTable />
          </div>

          <Footer />
        </div>
      )}
    </div>
  );
}
