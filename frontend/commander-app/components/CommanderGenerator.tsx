"use client";  // Client component para interatividade

import React, { useState } from "react";
import { Button } from "@heroui/react";
import { Card, CardBody, Image, Spinner } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";  // Para animações
import { Shuffle, Loader2 } from "lucide-react";  // Ícones, instale: npm i lucide-react

const CommanderGenerator: React.FC = () => {
  const [data, setData] = useState<{ image: string; title: string; description: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateCommander = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:8000/api/item");
      if (!response.ok) throw new Error("Erro ao buscar comandante");
      const result = await response.json();
      setData({
        image: result.image,
        title: result.title,
        description: result.description || "Sem descrição disponível.",
      });
    } catch (err) {
      setError("Erro ao conectar com o backend. Verifique se o servidor está rodando.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl text-center">
      <h1 className="text-4xl font-bold text-purple-400 mb-2 animate-fadeIn">
        Commander Generator
      </h1>
      <p className="text-gray-300 mb-8">Clique para gerar um comandante aleatório de Magic: The Gathering</p>

      <Button
        onPress={generateCommander}
        disabled={loading}
        className="w-full max-w-md bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 px-6 rounded-lg shadow-lg transition-all duration-300"
        startContent={loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Shuffle className="w-6 h-6" />}
        size="lg"
      >
        {loading ? "Gerando..." : "Gerar Comandante Aleatório"}
      </Button>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-4 p-4 bg-red-900 rounded-lg text-center"
          >
            {error}
          </motion.div>
        )}

        {data && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="mt-8"
          >
            <Card className="bg-gray-900 rounded-lg shadow-xl p-6 w-full">
              <CardBody className="flex flex-col md:flex-row items-center gap-6">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <Image
                    src={data.image}
                    alt={data.title}
                    width={256}
                    className="w-64 h-auto rounded-lg shadow-md object-cover"
                  />
                </motion.div>
                <div className="flex-1 text-left">
                  <h2 className="text-2xl font-bold text-purple-400 mb-4 animate-fadeIn">
                    {data.title}
                  </h2>
                  <p className="text-gray-300 leading-relaxed animate-fadeIn">
                    {data.description}
                  </p>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CommanderGenerator;
