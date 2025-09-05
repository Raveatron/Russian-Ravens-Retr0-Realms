import React from 'react';

interface CharacterPortraitProps {
  portrait?: string;
  name: string;
}

const CharacterPortrait: React.FC<CharacterPortraitProps> = ({ portrait, name }) => {
  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="w-full aspect-square rounded-lg bg-gray-900 border-2 border-gray-600 overflow-hidden shadow-lg">
      {portrait ? (
        <img
          src={`data:image/jpeg;base64,${portrait}`}
          alt={`Portrait of ${name}`}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-6xl font-bold text-gray-500">{getInitials(name)}</span>
        </div>
      )}
    </div>
  );
};

export default CharacterPortrait;
