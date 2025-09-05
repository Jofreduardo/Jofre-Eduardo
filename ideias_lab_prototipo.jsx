import React, { useState } from 'react';

function App() {
  const [user, setUser] = useState('');
  const [idea, setIdea] = useState('');
  const [ideas, setIdeas] = useState([]);
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState('');

  const prohibitedWords = ['comprar', 'venda', 'curso', 'ebook', 'link', 'ganhe dinheiro'];

  const registerUser = () => {
    if(user) alert(`Bem-vindo(a), ${user}`);
  };

  const postIdea = () => {
    const lowerIdea = idea.toLowerCase();
    if(prohibitedWords.some(word => lowerIdea.includes(word))){
      alert('Sua ideia contém conteúdo proibido. Remova links ou ofertas comerciais.');
      return;
    }
    setIdeas([{user, text: idea, votes:0}, ...ideas]);
    setIdea('');
  };

  const voteIdea = (index, type) => {
    const newIdeas = [...ideas];
    newIdeas[index].votes += type === 'up' ? 1 : -1;
    setIdeas(newIdeas);
  };

  const postMessage = () => {
    const lowerMessage = message.toLowerCase();
    if(prohibitedWords.some(word => lowerMessage.includes(word))){
      alert('Mensagem proibida: não é permitido vender ou divulgar produtos no chat.');
      return;
    }
    setChat([...chat, {user, text: message}]);
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">BrainStorm Lab</h1>
      <div className="mb-4">
        <input className="border p-2 mr-2" placeholder="Seu nome/pseudônimo" value={user} onChange={e => setUser(e.target.value)} />
        <button className="bg-blue-500 text-white px-4 py-2" onClick={registerUser}>Registrar</button>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Postar Ideia</h2>
        <input className="border p-2 mr-2 w-1/2" placeholder="Escreva sua ideia" value={idea} onChange={e => setIdea(e.target.value)} />
        <button className="bg-green-500 text-white px-4 py-2" onClick={postIdea}>Postar</button>
        <ul className="mt-4">
          {ideas.map((i, idx) => (
            <li key={idx} className="mb-2 p-2 bg-white rounded shadow">
              <strong>{i.user}</strong>: {i.text} <br />
              Votos: {i.votes} 
              <button className="ml-2 text-green-600" onClick={() => voteIdea(idx, 'up')}>👍</button>
              <button className="ml-1 text-red-600" onClick={() => voteIdea(idx, 'down')}>👎</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Chat em tempo real</h2>
        <input className="border p-2 mr-2 w-1/2" placeholder="Digite sua mensagem" value={message} onChange={e => setMessage(e.target.value)} />
        <button className="bg-purple-500 text-white px-4 py-2" onClick={postMessage}>Enviar</button>
        <ul className="mt-4">
          {chat.map((c, idx) => (
            <li key={idx} className="mb-1 p-2 bg-white rounded shadow"><strong>{c.user}</strong>: {c.text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
