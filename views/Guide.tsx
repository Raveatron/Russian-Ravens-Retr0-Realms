import React from 'react';
import { GUIDE_CONTENT } from '../data/guide-content';

const Guide: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-purple-500/20 text-gray-300">
            <h1 className="text-4xl font-bold text-white text-center mb-8 tracking-wider">Player & DM Guide</h1>
            <div className="space-y-8">
                {GUIDE_CONTENT.map(section => (
                    <section key={section.title} className="bg-gray-900/60 p-6 rounded-lg border border-gray-700">
                        <h2 className="text-2xl font-bold text-purple-300 mb-4 border-b-2 border-gray-600 pb-2">{section.title}</h2>
                        <p className="whitespace-pre-wrap leading-relaxed">
                            {section.content}
                        </p>
                    </section>
                ))}
            </div>
        </div>
    );
}

export default Guide;
