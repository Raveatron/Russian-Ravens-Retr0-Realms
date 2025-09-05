import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import type { StoryState } from '../types';
import Tooltip from './Tooltip';

interface StoryGeneratorProps {
  onSceneGenerated: (storyState: StoryState) => void;
  currentPrompt: string;
}

const StoryGenerator: React.FC<StoryGeneratorProps> = ({ onSceneGenerated, currentPrompt: initialPrompt }) => {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const storySchema = {
    type: Type.OBJECT,
    properties: {
        dm_narration: {
            type: Type.STRING,
            description: "Detailed, engaging narration for the Dungeon Master to read to the players. Describe the scene, characters, and events. Should be 2-4 paragraphs."
        },
        player_choices: {
            type: Type.ARRAY,
            description: "A list of 3-4 distinct choices the players can make.",
            items: {
                type: Type.OBJECT,
                properties: {
                    text: {
                        type: Type.STRING,
                        description: "The text for the choice button, representing a player action."
                    },
                    prompt_for_next_scene: {
                        type: Type.STRING,
                        description: "A new prompt for the AI to generate the next scene if this choice is selected."
                    }
                },
            }
        },
        image_generation_prompt: {
            type: Type.STRING,
            description: "A detailed, descriptive prompt for an AI image generator to create a fantasy art style scene image based on the narration. Should focus on the environment, mood, and key subjects. E.g., 'A dark, foreboding cave entrance, glowing faintly with eerie green light, ancient runes carved around the stone archway, digital painting, fantasy.'"
        }
    }
  };

  const handleGenerateScene = async () => {
    if (!prompt) return;
    setIsGenerating(true);
    setError(null);
    try {
      // Step 1: Generate story content and image prompt
      const textResponse = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          systemInstruction: "You are a creative and engaging Dungeons & Dragons Dungeon Master. Your task is to generate a story scene based on the user's prompt. Provide rich, descriptive narration for the DM, 3-4 distinct player choices, and a separate, detailed prompt for an AI image generator to create a scene that matches the narration.",
          responseMimeType: "application/json",
          responseSchema: storySchema,
        },
      });

      const jsonStr = textResponse.text.trim();
      const generatedState = JSON.parse(jsonStr);

      // Step 2: Generate the image using the prompt from Step 1
      const imageResponse = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: generatedState.image_generation_prompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: '16:9',
        },
      });

      const base64ImageBytes = imageResponse.generatedImages[0].image.imageBytes;

      const newState: StoryState = {
        narration: generatedState.dm_narration,
        choices: generatedState.player_choices,
        sceneImage: base64ImageBytes,
      };

      onSceneGenerated(newState);
      setPrompt(''); // Clear prompt for next turn

    } catch (err) {
      setError('The story took an unexpected turn... The AI failed to generate a response. Please try again.');
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-gray-900/60 p-4 rounded-lg border border-gray-700 space-y-4">
      <h3 className="text-xl font-bold text-white text-center">AI Story Generator</h3>
      <div>
        <label htmlFor="story-prompt" className="block text-sm font-medium text-gray-300 mb-1">
          Story Prompt
        </label>
        <Tooltip tip="Enter a prompt to start or continue the story. The AI will generate a scene based on this." className="block w-full">
            <textarea
            id="story-prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., The party enters a dark cave and smells sulfur..."
            className="w-full h-24 bg-gray-900/80 border border-gray-600 rounded-md p-2 text-white focus:ring-purple-500 focus:border-purple-500"
            disabled={isGenerating}
            />
        </Tooltip>
      </div>
      {error && <p className="text-red-400 text-sm text-center">{error}</p>}
      <Tooltip tip="Click to generate the next scene. This will call the AI and may take a few seconds." className="block w-full">
        <button
            onClick={handleGenerateScene}
            disabled={isGenerating || !prompt}
            className="w-full px-4 py-3 bg-purple-700 text-white font-bold rounded-lg hover:bg-purple-600 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
            {isGenerating ? 'Generating Scene...' : 'Generate Scene'}
        </button>
      </Tooltip>
    </div>
  );
};

export default StoryGenerator;