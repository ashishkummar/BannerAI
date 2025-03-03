import axios from "axios";

interface UserPrompt {
  userId: string;
  promptText: string;
}

export const saveUserPrompt = async (data: UserPrompt): Promise<void> => {
  try {
    const response = await axios.post<{ message: string }>(
      "http://localhost:5000/api/savePrompt",
      data
    );

    console.log(response.data.message); // "Prompt saved successfully!"
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
    } else {
      console.error("Unexpected error:", error);
    }
  }
};
