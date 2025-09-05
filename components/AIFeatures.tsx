import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

interface AIFeaturesProps {
  character: { name: string; race: string; charClass: string };
  onPortraitGenerated: (base64: string) => void;
  onBackstoryGenerated: (backstory: string) => void;
}

const AIFeatures: React.FC<AIFeaturesProps> = ({ character, onPortraitGenerated, onBackstoryGenerated }) => {
  const [portraitPrompt, setPortraitPrompt] = useState('');
  const [backstoryPrompt, setBackstoryPrompt] = useState('');
  const [isGeneratingPortrait, setIsGeneratingPortrait] = useState(false);
  const [isGeneratingBackstory, setIsGeneratingBackstory] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const handleGeneratePortrait = async () => {
    if (!portraitPrompt) return;
    setIsGeneratingPortrait(true);
    setError(null);
    try {
      const fullPrompt = `${character.name} the ${character.race} ${character.charClass}, ${portraitPrompt}. Fantasy art, digital painting.`;
      const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: fullPrompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: '1:1',
        },
      });

      const base64ImageBytes = response.generatedImages[0].image.imageBytes;
      onPortraitGenerated(base64ImageBytes);
    } catch (err) {
      setError('Failed to generate portrait. Please try again.');
      console.error(err);
    } finally {
      setIsGeneratingPortrait(false);
    }
  };

  const handleGenerateBackstory = async () => {
    setIsGeneratingBackstory(true);
    setError(null);
    try {
       const fullPrompt = `Generate a compelling Dungeons & Dragons backstory for ${character.name}, a ${character.race} ${character.charClass}. Incorporate these keywords: ${backstoryPrompt}. The backstory should be about 2-3 paragraphs long and include a personality trait, an ideal, a bond, and a flaw.`;
       const response = await ai.models.generateContent({
         model: 'gemini-2.5-flash',
         contents: fullPrompt,
       });

       onBackstoryGenerated(response.text);
    } catch (err) {
      setError('Failed to generate backstory. Please try again.');
      console.error(err);
    } finally {
      setIsGeneratingBackstory(false);
    }
  };
  
  const buttonClasses = "w-full px-4 py-2 bg-purple-700 text-white font-bold rounded-lg hover:bg-purple-600 transition-colors disabled:bg-gray-600 disabled:cursor-wait";
  const inputClasses = "w-full bg-gray-900/80 border border-gray-600 rounded-md p-2 text-white focus:ring-purple-500 focus:border-purple-500";

  return (
    <div className="p-4 rounded-lg bg-gray-900/50 border-2 border-dashed border-purple-500/50 space-y-6">
       <h3 className="text-xl font-bold text-white mb-2 text-center">✨ AI Enhancements ✨</h3>
       {error && <p className="text-red-400 text-center">{error}</p>}
       
       {/* Portrait Generator */}
       <div className="space-y-2">
           <label htmlFor="portrait-prompt" className="block text-gray-300">Portrait Description</label>
           <p className="text-xs text-gray-400">Describe your character's appearance. E.g., "stoic, with a scar over his left eye and wearing iron armor."</p>
           <div className="flex gap-2">
                <input id="portrait-prompt" type="text" value={portraitPrompt} onChange={e => setPortraitPrompt(e.target.value)} className={inputClasses} placeholder="Describe appearance..." />
                <button type="button" onClick={handleGeneratePortrait} disabled={isGeneratingPortrait || !portraitPrompt} className={buttonClasses}>
                    {isGeneratingPortrait ? 'Creating...' : 'Generate Portrait'}
                </button>
           </div>
       </div>

       {/* Backstory Generator */}
       <div className="space-y-2">
           <label htmlFor="backstory-prompt" className="block text-gray-300">Backstory Keywords</label>
            <p className="text-xs text-gray-400">Provide some keywords. E.g., "lost family, seeking revenge, mysterious artifact."</p>
           <div className="flex gap-2">
            <input id="backstory-prompt" type="text" value={backstoryPrompt} onChange={e => setBackstoryPrompt(e.target.value)} className={inputClasses} placeholder="Keywords..."/>
            <button type="button" onClick={handleGenerateBackstory} disabled={isGeneratingBackstory} className={buttonClasses}>
                {isGeneratingBackstory ? 'Writing...' : 'Generate Backstory'}
            </button>
           </div>
       </div>

    </div>
  );
};

export default AIFeatures;
