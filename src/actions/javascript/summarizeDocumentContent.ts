import { RUNNER_URL } from "./backendConfig";

export const summarizeDocumentContent = async (textInput: string, userToken: string): Promise<{ summary: string } | Error> => {
  const formData = new FormData();
  formData.append("doc", textInput);
  const response = await fetch(`${RUNNER_URL}/summarize`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + userToken,
    },
    body: formData,
  });
  if (!response.ok) {
    const content = await response.text();
    throw new Error(content);
  } else {
    return await response.json();
  }
};
