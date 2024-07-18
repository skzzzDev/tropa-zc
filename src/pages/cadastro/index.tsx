import { FormEvent, useState } from "react";
import { Header } from "../../components/header";
import { Input } from "../../components/inputs";
import { db } from "../../services/firebaseConnection";
import { FaUsersCog } from "react-icons/fa";
import { Footer } from "../../components/footer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { addDoc, collection } from "firebase/firestore";

export function Cadastro() {
  const [name, setName] = useState("");
  const [farm, setFarm] = useState("");
  const [drogas, setDrogas] = useState("");
  const [vendas, setVendas] = useState("");

  function handleRegister(e: FormEvent) {
    e.preventDefault();

    if (
      name === "" ||
      farm === "" ||
      drogas === "" ||
      vendas === ""
    ) {
      alert("Preencha todos os campos!");
      return;
    }

    addDoc(collection(db, "tropa-zc"), {
      name: name,
      farm: farm,
      drogas: drogas,
      vendas: vendas,
      created: new Date(),
    })
      .then(() => {
        setName("");
        setFarm("");
        setDrogas("");
        setVendas("");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }

  function notifySucess() {
    toast.success("Informações enviadas!", {
      position: "top-right",
      autoClose: 15000,
      theme: "dark",
    });
  }

  return (
    <div>
      <Header />
      <div className="min-h-screen flex flex-col items-center bg-[#494949]">
      <ToastContainer position="top-right" autoClose={15000} theme="dark" />
        <header className="flex flex-col items-center mt-8 mb-6 text-center">
          <FaUsersCog className="text-white text-4xl" />
          <span className="font-medium text-lg pt-2 text-white">
            Digite as Informações
          </span>
        </header>
        <div className="bg-neutral-800 p-8 rounded-lg w-full max-w-4xl">
        <form className="flex flex-col" onSubmit={(event) => { notifySucess(); handleRegister(event); }}>
        <div className="grid grid-cols-1 gap-4 mb-4">
              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className="font-normal text-base leading-5 mb-2 text-white"
                >
                  Nome
                </label>
                <Input
                  type="text"
                  placeholder="Nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
  
              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className="font-normal text-base leading-5 mb-2 text-white"
                >
                  Farm
                </label>
                <Input
                  type="text"
                  placeholder="10 unidades"
                  value={farm}
                  onChange={(e) => setFarm(e.target.value)}
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="text"
                  className="font-normal text-base leading-5 mb-2 text-white"
                >
                  Drogas Baú
                </label>
                <Input
                  type="text"
                  placeholder="10.000"
                  value={drogas}
                  onChange={(e) => setDrogas(e.target.value)}
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="text"
                  className="font-normal text-base leading-5 mb-2 text-white"
                >
                  Vendas
                </label>
                <Input
                  type="text"
                  placeholder="R$ 10.000"
                  value={vendas}
                  onChange={(e) => setVendas(e.target.value)}
                />
              </div>
            </div>
            
            <button className="button bg-zinc-700 text-white font-normal text-base py-3 rounded-lg mt-4 w-full hover:opacity-80">
              Enviar
            </button>
          </form>
        </div>

        <Footer />
      </div>
    </div>
  );
  
}
