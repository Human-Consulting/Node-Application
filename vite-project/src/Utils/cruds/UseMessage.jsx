import axios from "axios";

const API_URL = "http://localhost:3001";

const useMessage = () => {
  const sendMessage = async (chatId, newMessage) => {
    try {
      // Primeiro busca o chat completo
      const response = await axios.get(`${API_URL}/chats/${chatId}`);
      const chat = response.data;

      // Define o novo id para a mensagem (incrementa com base nas existentes)
      const newId = chat.messages.length > 0 
        ? Math.max(...chat.messages.map(m => m.id)) + 1 
        : 1;

      const updatedMessages = [
        ...chat.messages,
        { id: newId, ...newMessage }
      ];

      // Atualiza o chat com a nova lista de mensagens
      await axios.patch(`${API_URL}/chats/${chatId}`, { messages: updatedMessages });

      return updatedMessages;
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      return null;
    }
  };

  return { sendMessage };
};

export default useMessage;
