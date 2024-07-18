import { useState, FormEvent } from "react";
import {  useNavigate } from "react-router-dom";
import { auth } from "../../services/firebaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Input } from "../../components/inputs";
import logo from "../../assets/logo.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Função para lidar com o login
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    if (email.trim() === "" || password.trim() === "") {
      alert("Preencha todos os campos");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/", { replace: true });
    } catch (error) {
      setEmail("");
      setPassword("");
      notifyError()
      console.error("Erro ao fazer login:", error);
    }

    function notifyError() {
      toast.error("Usuário Inválido!", {
        position: "top-right",
        autoClose: 15000,
        theme: "dark",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-900">
      <ToastContainer position="top-right" autoClose={15000} theme="dark" />
      <div className="bg-neutral-800 p-8 rounded-lg shadow-lg w-full sm:max-w-md">
        <header className="flex flex-col items-center mb-6">
          <img src={logo} alt="Workflow" className="w-40" />
          <span className="font-medium text-lg pt-2 text-white">
            Por favor digite suas informações de login
          </span>
        </header>

        <form className="flex flex-col">
          <div className="inputContainer flex flex-col mb-4">
            <label
              htmlFor="email"
              className="font-normal text-base leading-5 mb-2 text-white"
            >
              E-mail
            </label>
            <Input
              type="text"
              placeholder="asguard@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="inputContainer flex flex-col mb-4">
            <label
              htmlFor="password"
              className="font-normal text-base leading-5 mb-2 text-white"
            >
              Senha
            </label>
            <Input
              type="password"
              placeholder="********************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="button bg-zinc-700 text-white font-normal text-base py-3 rounded-lg mt-4 hover:opacity-80"
            onClick={handleLogin}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
