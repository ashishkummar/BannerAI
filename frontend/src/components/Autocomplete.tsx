import React, { useState, useEffect } from "react";
import { Autocomplete, TextField, SxProps } from "@mui/material";

interface ModelOption {
  label: string;
  value: string;
}

interface ModelSelectorProps {
  onModelChange: (model: string) => void;
  sx?: SxProps; // Accept sx prop
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({ onModelChange, sx }) => {
  const [modelOptions, setModelOptions] = useState<ModelOption[]>([]);
  const [selectedModel, setSelectedModel] = useState<ModelOption | null>(null);

  // Fetch models from the backend
  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/models");
        const data = await response.json();
        
        // Convert the backend model list into the required format
        const formattedModels: ModelOption[] = data.models.map((model: string) => ({
          label: model,
          value: model,
        }));

        setModelOptions(formattedModels);
        setSelectedModel(formattedModels.find((m) => m.value === data.selectedModel) || formattedModels[0]);
      } catch (error) {
        console.error("Error fetching model list:", error);
      }
    };

    fetchModels();
  }, []);

  return (
    <Autocomplete
      options={modelOptions}
      getOptionLabel={(option) => option.label}
      value={selectedModel}
      onChange={(event, newValue) => {
        setSelectedModel(newValue);
        if (newValue) {
          onModelChange(newValue.value);
        }
      }}
      renderInput={(params) => <TextField {...params} label="🤖 Select AI Model" variant="outlined" />}
      sx={{ width: 300, ...sx }} // Apply sx prop
    />
  );
};
