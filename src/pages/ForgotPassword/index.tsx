import React, { useState } from "react";
import { auth } from "../../config/firebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Por favor, ingresa un correo electrónico.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage(
        "Se ha enviado un enlace de restablecimiento de contraseña a tu correo."
      );
      setError(null);

      setTimeout(() => navigate("/login"), 3000);
    } catch (e) {
      setError("Hubo un error al enviar el correo de restablecimiento.");
      console.log(e);
      setMessage(null);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Olvidé mi contraseña
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo electrónico"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Button
            disabled={!email}
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            Enviar enlace
          </Button>
        </form>
        {error && (
          <p className="mt-4 text-center text-red-500 text-sm">{error}</p>
        )}
        {message && (
          <p className="mt-4 text-center text-green-500 text-sm">{message}</p>
        )}
      </div>
    </div>
  );
};
