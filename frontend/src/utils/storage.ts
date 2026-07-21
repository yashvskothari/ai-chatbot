const STORAGE_KEY = "ai-chatbot-conversations";

export const loadConversations = () => {
  const data = localStorage.getItem(STORAGE_KEY);

  return data ? JSON.parse(data) : [];
};

export const saveConversations = (data: unknown) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(data)
  );
};