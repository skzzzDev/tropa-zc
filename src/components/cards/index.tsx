import { useEffect, useState } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const template = () => {
  const [somaTotal, setSomaTotal] = useState({ farm: 0, vendas: 0 });
  const [valor, setValor] = useState(1000);
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(valor);

  useEffect(() => {
    const itemsRef = collection(db, "tropa-zc");
    const queryRef = query(itemsRef, orderBy("created", "asc"));

    const unsubscribe = onSnapshot(queryRef, (snapshot) => {
      let totalFarm = 0;
      let totalVendas = 0;

      snapshot.forEach((doc) => {
        totalFarm += parseFloat(doc.data().farm);
        totalVendas += parseFloat(doc.data().vendas);
      });

      setSomaTotal({ farm: totalFarm, vendas: totalVendas });
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchValor = async () => {
      const docRef = doc(db, "dinheiro", "vqSXTVDkSa5BZHDFGXQe");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const valorFromFirestore = docSnap.data().valor;
        setValor(valorFromFirestore);
      }
    };

    fetchValor();
  }, []);

  const handleSave = async () => {
    try {
      const docRef = doc(db, "dinheiro", "vqSXTVDkSa5BZHDFGXQe");
      await updateDoc(docRef, {
        valor: inputValue,
        timestamp: new Date(),
      });

      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const updatedValor = docSnap.data().valor;
        setValor(updatedValor);
      }

      setIsEditing(false);
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  };

  const formatarMoeda = (valor: number) => {
    const options = {
      style: "currency",
      currency: "BRL",
    } as Intl.NumberFormatOptions; // Definir o tipo corretamente

    return valor.toLocaleString("pt-BR", options);
  };

  return (
    <div className="flex space-x-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-96 border border-neutral-800 border-r-4 mr-4 flex items-center">
        <div className="flex-grow">
          <h2 className="text-xl font-bold mb-2">Total Dinheiro Atual</h2>
          <p className="text-gray-700">{formatarMoeda(valor)}</p>
          <p className="text-gray-700">Tropa da ZC</p>
          {isEditing && (
            <div className="mt-4 flex items-center">
              <input
                type="number"
                className="border p-2 rounded"
                value={inputValue}
                onChange={(e) => setInputValue(parseInt(e.target.value))}
              />
              <button
                className="ml-2 text-green-500 hover:text-green-700"
                onClick={handleSave}
              >
                <FontAwesomeIcon icon={faEdit} /> Salvar
              </button>
            </div>
          )}
        </div>
        <div className="flex flex-col items-center space-y-2 ml-4">
          <button className="text-gray-700 hover:text-blue-700">
            <FontAwesomeIcon icon={faEdit} onClick={() => setIsEditing(true)} />
          </button>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 w-96 h-36 border border-neutral-800 border-r-4 mr-4">
        <h2 className="text-xl font-bold mb-2">Total de Drogas</h2>
        <p className="text-gray-700">{formatarMoeda(somaTotal.farm)}</p>
        <p className="text-gray-700">Tropa da ZC</p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 w-96 h-36 border border-neutral-800 border-r-4 mr-4">
        <h2 className="text-xl font-bold mb-2">Total de Vendas</h2>
        <p className="text-gray-700">{formatarMoeda(somaTotal.vendas)}</p>
        <p className="text-gray-700">Tropa da ZC</p>
      </div>
    </div>
  );
};

export default template;
