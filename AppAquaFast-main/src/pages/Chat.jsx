import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import { FaUserCircle, FaShoppingCart, FaCommentDots } from 'react-icons/fa';
import logo from '../assets/Logo.png';


// ===============================================
// Componente de Animação de Digitação (TypingDots)
// ===============================================
const TypingDotsComponent = () => {
    return (
        <div className="typing-dots-container">
            <span className="dot dot-1"></span>
            <span className="dot dot-2"></span>
            <span className="dot dot-3"></span>
        </div>
    );
};


// Constantes e Mensagens
const INITIAL_BOT_GREETING = 'Oi! Eu sou a Nicole Ferreira 👋. Sou uma inteligência artificial criada para te ajudar no que for preciso. Se você tiver dúvidas ou vir algum problema, é só me chamar. Estou aqui para facilitar sua vida com rapidez e simpatia! ✨';
const MENU_PROMPT = 'O que você precisa de ajuda?';
const MENU_OPTIONS = ["Termos", "Planos", "Energia", "Agência", "Perfil", "Outros"];

// Mensagens de Resposta
const MESSAGE_TERMOS = `Ao utilizar o aplicativo da Aquafast, você declara estar ciente e concorda com a coleta e utilização de seus dados de desempenho. Essas informações serão utilizadas exclusivamente para análises internas, com o objetivo de aprimorar a experiência do usuário, otimizar funcionalidades e garantir um desempenho mais eficiente da plataforma. 
Nos comprometemos a tratar todos os dados com confidencialidade e conforme as diretrizes da Lei Geral de Proteção de Dados (LGPD).`;
const MESSAGE_PLANOS = `
💧 Plano Comum
Ideal para quem precisa do básico: Arduino configurado, instalação em dias úteis, relatório simples e garantia mensal.

💧 Plano Extra
Mais suporte e segurança! Inclui todos os benefícios do Plano Comum, além de suporte técnico online, relatório detalhado e garantia semestral.

💧 Plano Premium
A experiência completa! Todos os benefícios dos planos anteriores, com manutenção e atualização contínua, relatório completo e garantia anual.
`;
const MESSAGE_ENERGIA = `Aqui na AquaFast você pode visualizar o seu consumo de energia de forma prática e detalhada. Após cadastrar seus móveis e eletrodomésticos, você terá uma visão geral de quanto cada setor da sua casa consome, ajudando você a economizar com mais inteligência!`;
const MESSAGE_AGENCIA = `Na aba Agências, você encontrará uma lista com as principais unidades disponíveis. 
O sistema identifica sua localização automaticamente e prioriza a exibição da agência mais próxima, tornando sua experiência mais rápida e prática!`;
const MESSAGE_PERFIL = `Na aba Perfil, você pode adicionar, editar ou excluir suas informações pessoais de forma simples e rápida. É possível atualizar:

Foto de usuário, Nome, Senha, Telefone, Endereço, Trocar de usuário, Adicionar ou editar dados de outras residências

Por motivos de segurança e integridade dos dados, o CPF não pode ser alterado após o cadastro.
`;


// Componente auxiliar para renderizar mensagens individuais
const Message = ({ msg }) => (
    <div className={`message ${msg.sender}-message`}>
        {/* Avatar: Bolha branca com ícone azul no bot, e ícone branco/cinza no usuário */}
        <div className={`message-avatar ${msg.sender === 'bot' ? 'bot-avatar' : 'user-avatar'}`}>
            {/* Usando FaCommentDots para o bot e FaUserCircle para o usuário */}
            {msg.sender === 'bot' ? <FaCommentDots /> : <FaUserCircle />}
        </div>
        <div className="message-bubble">
            {msg.text}
        </div>
    </div>
);


function Chat() {
    const [messages, setMessages] = useState([]);
    const [isBotTyping, setIsBotTyping] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [conversationPhase, setConversationPhase] = useState(0);

    // Efeito para gerenciar a sequência de mensagens cronometradas
    useEffect(() => {
        let timer1, timer2;

        if (conversationPhase === 0) {
            // Fase 0: Primeira Mensagem (Greeting)
            setIsBotTyping(true);
            timer1 = setTimeout(() => {
                setMessages(m => [...m, { sender: 'bot', text: INITIAL_BOT_GREETING, type: 'text' }]);
                setIsBotTyping(false);
                setConversationPhase(1); // Vai para a próxima fase
            }, 2500); 
        } else if (conversationPhase === 1) {
            // Fase 1: Segunda Mensagem (Prompt e Menu)
            setIsBotTyping(true);
            timer2 = setTimeout(() => {
                setMessages(m => [...m, { sender: 'bot', text: MENU_PROMPT, type: 'prompt' }]);
                setIsBotTyping(false);
                setShowMenu(true); 
                setConversationPhase(2); 
            }, 2500); 
        }

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, [conversationPhase]);


    // Função que é chamada ao clicar em uma opção do menu
    const handleOptionClick = (optionText) => {
        // 1. Adiciona a mensagem do usuário
        setShowMenu(false);
        setMessages(m => [...m, { sender: 'user', text: optionText, type: 'text' }]);
        
        // 2. Inicia a digitação para a resposta automática
        setIsBotTyping(true);
        
        // 3. Define a resposta do bot com base na opção
        let botResponse = '';

        switch (optionText) {
            case "Termos":
                botResponse = MESSAGE_TERMOS;
                break;
            case "Planos":
                botResponse = MESSAGE_PLANOS;
                break;
            case "Energia":
                botResponse = MESSAGE_ENERGIA;
                break;
            case "Agência":
                botResponse = MESSAGE_AGENCIA;
                break;
            case "Perfil":
                botResponse = MESSAGE_PERFIL;
                break;
            default:
                botResponse = `Entendido! Você escolheu '${optionText}'. Para prosseguir com o tema, peço que me forneça mais detalhes sobre o que você busca.`;
                break;
        }

        // 4. Simula a digitação e exibe a resposta
        setTimeout(() => {
            setMessages(m => [...m, { sender: 'bot', text: botResponse, type: 'text' }]);
            setIsBotTyping(false);
        }, 3000);
    };


    return (
        <div className="app-container"> 
            
            {/* 1. CABEÇALHO (IDÊNTICO AO HOME.JSX) */}
        <header className="home-header">
          <Link to="/home">
            <img src={logo} alt="AquaFast" className="home-logo-header" />
          </Link>
          <div className="home-header-icons">
            <Link to="/profile" className="header-icon-link">
              <FaUserCircle />
            </Link>
            <Link to="/cart" className="header-icon-link">
              <FaShoppingCart />
            </Link>
          </div>
        </header>

            {/* 2. CONTEÚDO PRINCIPAL DO CHAT */}
            <main className="chat-main-content">
                <div className="chat-profile">
                    <div className="profile-avatar"><FaCommentDots /></div>
                    <div className="profile-name">Nicole Ferreira</div>
                </div>

                <div className="chat-area">
                    
                    {messages.map((msg, index) => (
                        <Message key={index} msg={msg} />
                    ))}
                    
                    {/* Indicador de Digitação do Bot (se ativo) */}
                    {isBotTyping && (
                        <div className="message bot-message loading-state">
                            <div className="message-avatar bot-avatar"><FaCommentDots /></div>
                            <div className="message-bubble loading-bubble">
                                <TypingDotsComponent />
                            </div>
                        </div>
                    )}

                    {/* Menu Interativo (Menu clicável) */}
                    {showMenu && (
                        <div className="message bot-message interactive-menu-container">
                            <div className="message-avatar bot-avatar"><FaCommentDots /></div>
                            <div className="interactive-menu-bubble">
                                <div className="menu-grid">
                                    {MENU_OPTIONS.map((option) => (
                                        <button 
                                            key={option} 
                                            className="menu-option-button" 
                                            onClick={() => handleOptionClick(option)}
                                            disabled={isBotTyping}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* Estilos CSS Incorporados */}
            <style jsx="true">{`
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                :root {
                    --color-primary: #0F7CBF;
                    --color-secondary: #EFEBE2;
                    --color-text-light: #ffffff; 
                    --color-text-dark: #333;
                    --color-bg-light: #ffffff;
                    --color-shadow: rgba(0, 0, 0, 0.5);
                }

                .app-container {
                    display: flex;
                    flex-direction: column;
                    min-height: 100vh;
                    width: 100%;
                    max-width: 100%;
                    margin: 0;
                    padding: 0;
                    background-color: var(--color-bg-light);
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                    overflow-x: hidden;
                }

                .chat-main-content {
                    flex-grow: 1;
                    background-color: var(--color-primary);
                    overflow-y: auto; /* CORRIGIDO: auto em vez de hidden */
                    padding-bottom: 20px;
                    padding-top: 20px; 
                }

                .chat-profile {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 10px 0 30px;
                }

                .profile-avatar {
                    background-color: var(--color-bg-light);
                    border: 3px solid var(--color-text-light);
                    color: var(--color-primary); 
                    border-radius: 50%;
                    width: 80px;
                    height: 80px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 40px;
                    margin-bottom: 10px;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
                }

                .profile-name {
                    color: var(--color-text-light);
                    font-size: 18px;
                    font-weight: 500;
                }

                .chat-area {
                    padding: 0 15px; 
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }

                .message {
                    display: flex;
                    margin-bottom: 15px;
                    align-items: flex-end; 
                }

                .bot-message {
                    justify-content: flex-start;
                    align-self: flex-start;
                }

                .message-avatar {
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 18px;
                    flex-shrink: 0;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    margin-bottom: 0px;
                }

                .bot-avatar {
                    background-color: var(--color-bg-light);
                    color: var(--color-primary);
                    margin-right: 10px;
                }

                .user-avatar {
                    background-color: #f0f0f0;
                    color: #666;
                    margin-left: 10px;
                    margin-right: 0;
                }

                .message-bubble {
                    max-width: 90%;
                    padding: 15px;
                    border-radius: 20px;
                    font-size: 16px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
                    white-space: pre-wrap;
                    word-wrap: break-word;
                    line-height: 1.4;
                }

                .bot-message .message-bubble {
                    background-color: #16558c; 
                    color: #e2e9f1;
                    border-bottom-left-radius: 5px; 
                }

                .user-message {
                    align-self: flex-end;
                    flex-direction: row-reverse; 
                }

                .user-message .message-bubble {
                    background-color: #38a1f6; 
                    color: var(--color-text-light);
                    box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
                    border-bottom-right-radius: 5px; 
                }

                .loading-bubble {
                    background-color: #16558c;
                    display: flex;
                    align-items: center;
                    width: 80px; 
                    height: 40px;
                    padding: 10px 15px;
                    border-bottom-left-radius: 5px; 
                }

                .typing-dots-container {
                    display: flex;
                    align-items: center; 
                    height: 100%;
                }

                .dot {
                    width: 8px;
                    height: 8px;
                    background-color: var(--color-text-light); 
                    border-radius: 50%;
                    margin: 0 3px;
                    animation: pulse 1s infinite alternate; 
                }

                .dot-1 { animation-delay: 0s; }
                .dot-2 { animation-delay: 0.2s; }
                .dot-3 { animation-delay: 0.4s; }

                @keyframes pulse {
                    0% {
                        transform: translateY(0);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(-5px);
                        opacity: 0.6;
                    }
                }

                .interactive-menu-container {
                    max-width: 90%; 
                    align-self: flex-start;
                    margin-bottom: 20px;
                }

                .interactive-menu-bubble {
                    padding: 0;
                    width: 360px;
                    margin-left: 0;
                    background-color: transparent;
                }

                .menu-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 10px;
                    margin-top: 10px;
                    padding: 15px;
                    background-color: #16558c;
                    border-radius: 20px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                    border-bottom-left-radius: 5px; 
                }

                .menu-option-button {
                    background-color: #0f7cbf; 
                    color: white;
                    border: none; 
                    padding: 12px 5px;
                    border-radius: 15px; 
                    cursor: pointer;
                    font-size: 14px; 
                    font-weight: bold; 
                    transition: all 0.2s;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                }

                .menu-option-button:hover {
                    background-color: #0a5a8f;
                }

                .menu-option-button:active {
                    background: #005691;
                    transform: translateY(1px);
                }
            `}</style>
        </div>
    );
};

export default Chat;