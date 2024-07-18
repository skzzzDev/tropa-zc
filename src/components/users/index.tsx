import { db } from "../../services/firebaseConnection";
import {
  onSnapshot,
  query,
  orderBy,
  collection,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { FaEdit, FaRegTrashAlt, FaSave, FaTimes } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface InfosProps {
  id: string;
  name: string;
  farm: string;
  drogas: string;
  vendas: number;
}

export default function UserTable() {
  const [informacoes, setInformacoes] = useState<InfosProps[]>([]);
  const [totalFarm, setTotalFarm] = useState<number>(0);
  const [totalVendas, setTotalVendas] = useState<number>(0);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [novoFarm, setNovoFarm] = useState<string>("");
  const [novaVenda, setNovaVenda] = useState<number>(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const infos = collection(db, "tropa-zc");
    const queryRef = query(infos, orderBy("created", "asc"));

    const unsub = onSnapshot(queryRef, (snapshot) => {
      let newInformacoes: InfosProps[] = [];
      let farmTotal = 0;
      let vendasTotal = 0;

      snapshot.forEach((doc) => {
        const data = doc.data();
        const farm = parseInt(data.farm);
        const vendas = parseFloat(data.vendas);

        farmTotal += farm;
        vendasTotal += vendas;

        newInformacoes.push({
          id: doc.id,
          name: data.name,
          farm: data.farm,
          drogas: data.drogas,
          vendas: vendas,
        });
      });

      newInformacoes.sort((a, b) => {
        if (parseInt(a.farm) !== parseInt(b.farm)) {
          return parseInt(b.farm) - parseInt(a.farm);
        }
        return b.vendas - a.vendas;
      });

      setInformacoes(newInformacoes);
      setTotalFarm(farmTotal);
      setTotalVendas(vendasTotal);
    });

    return () => unsub();
  }, []);

  const formatarReais = (valor: number) => {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  function notifyDelete() {
    toast.success("Informações apagadas!", {
      position: "top-right",
      autoClose: 15000,
      theme: "dark",
    });
  }

  const handleRemoverElemento = async (id: string) => {
    try {
      await deleteDoc(doc(db, "tropa-zc", id));
    } catch (error) {
      console.error("Erro ao remover elemento:", error);
    }
  };

  function notifySucess() {
    toast.success("Informações editadas!", {
      position: "top-right",
      autoClose: 15000,
      theme: "dark",
    });
  }

  const handleEditarElemento = async (id: string) => {
    try {
      await updateDoc(doc(db, "tropa-zc", id), {
        farm: novoFarm,
        vendas: novaVenda,
      });
      setEditandoId(null);
      setNovoFarm("");
      setNovaVenda(0);
    } catch (error) {
      console.error("Erro ao editar elemento:", error);
    }
  };

  const iniciarEdicao = (id: string, farm: string, vendas: number) => {
    setEditandoId(id);
    setNovoFarm(farm);
    setNovaVenda(vendas);
  };

  const handleCancelarEdicao = () => {
    setEditandoId(null);
    setNovoFarm("");
    setNovaVenda(0);
  };

  return (
    <div
      className={`overflow-x-auto ${windowWidth > 767 ? "w-1/2 mx-auto" : "w-full"}`}
    >
      <div className="bg-white shadow-md rounded my-6 sm:my-0 overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-neutral-800 text-white">
            <tr>
              <th className="py-3 px-6 text-left">Ranking</th>
              <th className="py-3 px-6 text-left">Nome</th>
              <th className="py-3 px-6 text-left">Farmou</th>
              <th className="py-3 px-6 text-left">Vendas</th>
              <th className="py-3 px-6 text-left">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {informacoes.map((info, index) => (
              <tr key={info.id} className="bg-white">
                <td className="py-4 px-6">{index + 1}</td>
                <td className="py-4 px-6">{info.name}</td>
                <td className="py-4 px-6">
                  {editandoId === info.id ? (
                    <input
                      type="text"
                      value={novoFarm}
                      onChange={(e) => setNovoFarm(e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    />
                  ) : (
                    `${info.farm} unidades`
                  )}
                </td>
                <td className="py-4 px-6">
                  {editandoId === info.id ? (
                    <input
                      type="number"
                      value={novaVenda}
                      onChange={(e) => setNovaVenda(parseFloat(e.target.value))}
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    />
                  ) : (
                    formatarReais(info.vendas)
                  )}
                </td>
                <td className="py-4 px-6">
                  {editandoId === info.id ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          notifySucess();
                          handleEditarElemento(info.id);
                        }}
                        className="text-black hover:text-gray-900"
                      >
                        <FaSave className="h-5 w-5" />
                      </button>
                      <button
                        onClick={handleCancelarEdicao}
                        className="text-black hover:text-black"
                      >
                        <FaTimes className="h-5 w-5" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={() =>
                          iniciarEdicao(info.id, info.farm, info.vendas)
                        }
                        className="text-black hover:text-black"
                      >
                        <FaEdit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => {
                          notifyDelete();
                          handleRemoverElemento(info.id);
                        }}
                        className="text-black hover:text-black"
                      >
                        <FaRegTrashAlt className="h-5 w-5" />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white shadow-md rounded my-6 sm:my-0">
        <table className="min-w-full bg-white">
          <thead className="bg-neutral-800 text-white">
            <tr>
              <th className="py-3 px-6 text-left">Total</th>
              <th className="py-3 px-6 text-left">Total Farm</th>
              <th className="py-3 px-6 text-left">Total Vendas</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="py-4 px-6 font-medium">Todos</td>
              <td className="py-4 px-6 font-medium">{totalFarm} unidades</td>
              <td className="py-4 px-6 font-medium">
                {formatarReais(totalVendas)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
