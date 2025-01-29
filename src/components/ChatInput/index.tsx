'use client';  // Pasta app renderiza do lado do servidor. Essa linha informa que é para renderizar do lado cliente.
import React, { useState } from 'react';

const ChatInput = () => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Valor do input:', inputValue);
  };

  return (
    <div className='w-full h-full'>
      <form onSubmit={handleSubmit} className='flex flex-row h-full gap-6'>
        <input className='w-full rounded-2xl p-6 bg-gray-300'
          type="text"
          value={inputValue}      // O valor do campo é controlado pelo estado
          onChange={handleInputChange} // Atualiza o estado conforme o usuário digita
          placeholder="Pergunte sobre o banco de dados" 
        />
        <button type="submit"><div className='bg-blue-300 w-24 h-full rounded-2xl flex items-center justify-center'>Buscar</div></button>
      </form>
    </div>
  );
};

export default ChatInput;
