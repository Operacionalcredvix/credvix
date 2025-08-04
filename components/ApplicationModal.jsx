'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient'; // Importa nosso cliente Supabase

export default function ApplicationModal({ isOpen, onClose, jobInfo }) {
  // Estados para controlar os dados do formulário
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cvFile, setCvFile] = useState(null);
  
  // Estado para controlar o processo de envio
  // 'idle' | 'submitting' | 'success' | 'error'
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Reseta o formulário sempre que o modal for fechado ou o jobInfo mudar
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => { // Adiciona um pequeno delay para a animação de fechar
        setName('');
        setEmail('');
        setPhone('');
        setCvFile(null);
        setStatus('idle');
        setErrorMessage('');
      }, 300);
    }
  }, [isOpen]);

  // Se o modal não estiver aberto, não renderiza nada
  if (!isOpen) {
    return null;
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Validação do arquivo
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage('O arquivo é muito grande. Tamanho máximo: 5MB.');
        return;
      }
      if (!validTypes.includes(file.type)) {
        setErrorMessage('Formato inválido. Use PDF, DOC ou DOCX.');
        return;
      }
      setErrorMessage('');
      setCvFile(file);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previne o recarregamento da página

    if (!cvFile || !name || !email || !phone) {
        setErrorMessage('Por favor, preencha todos os campos e selecione um arquivo.');
        return;
    }
    
    setStatus('submitting');
    setErrorMessage('');

    try {
      // 1. Upload do arquivo para o Supabase Storage
      const fileExt = cvFile.name.split('.').pop();
      const fileName = `${email.split('@')[0]}_${Date.now()}.${fileExt}`;
      const safeStoreName = jobInfo.storeName.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-');
      const filePath = `${safeStoreName}/${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('curriculos') // Nome do seu bucket no Supabase
        .upload(filePath, cvFile);

      if (uploadError) throw uploadError;

      // 2. Pegar a URL pública do arquivo
      const { data: urlData } = supabase.storage.from('curriculos').getPublicUrl(filePath);

      // 3. Inserir os dados do candidato no banco de dados
      const { error: insertError } = await supabase.from('candidatos').insert([
        {
          vaga_id: jobInfo.jobId,
          nome_completo: name,
          email: email,
          telefone: phone,
          curriculo_url: urlData.publicUrl,
          status: 'pendente',
          vaga: jobInfo.title,
          loja: jobInfo.storeName,
        },
      ]);
      
      if (insertError) throw insertError;
      
      // Sucesso!
      setStatus('success');
      setTimeout(onClose, 4000); // Fecha o modal após 4 segundos

    } catch (error) {
      console.error('Erro no processo de candidatura:', error);
      setErrorMessage(error.message || 'Ocorreu um erro. Tente novamente.');
      setStatus('error');
    }
  };

  // Funções para renderizar o conteúdo do modal com base no status
  const renderContent = () => {
    switch (status) {
      case 'submitting':
        return (
          <div className="text-center py-8">
            <svg className="animate-spin h-8 w-8 text-help-purple mb-4 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            <p className="text-lg">Enviando seu currículo...</p>
          </div>
        );
      case 'success':
        return (
          <div className="text-center py-8">
            <svg className="h-12 w-12 text-green-500 mb-4 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
            <p className="text-green-600 font-bold text-xl mb-2">Currículo enviado com sucesso!</p>
            <p className="text-sm text-gray-500">Agradecemos seu interesse. Entraremos em contato em breve.</p>
          </div>
        );
      case 'error':
        return (
            <div className="text-center py-8">
                <svg className="h-12 w-12 text-red-500 mb-4 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                <p className="text-red-600 font-bold text-xl mb-2">Ocorreu um erro</p>
                <p className="text-sm text-gray-500 mb-4">{errorMessage}</p>
                <button onClick={() => setStatus('idle')} className="text-help-purple font-semibold mt-2 px-4 py-2 border border-help-purple rounded-lg hover:bg-help-purple hover:text-white transition-colors">Tentar novamente</button>
            </div>
        );
      default: // 'idle'
        return (
          <>
            <h3 className="text-2xl font-bold text-help-purple mb-2">Candidatar-se para a Vaga</h3>
            <p id="modal-job-title" className="text-gray-600 font-semibold mb-6">{jobInfo?.title} - {jobInfo?.storeName}</p>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="candidate-name" className="block text-sm font-medium text-gray-700 mb-1">Nome Completo*</label>
                <input type="text" id="candidate-name" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 ring-help-purple" required />
              </div>
              <div className="mb-4">
                <label htmlFor="candidate-email" className="block text-sm font-medium text-gray-700 mb-1">E-mail*</label>
                <input type="email" id="candidate-email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 ring-help-purple" required />
              </div>
              <div className="mb-4">
                <label htmlFor="candidate-phone" className="block text-sm font-medium text-gray-700 mb-1">Telefone*</label>
                <input type="tel" id="candidate-phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 ring-help-purple" required />
              </div>
              <div className="mb-4">
                <label htmlFor="cv-file" className="block text-sm font-medium text-gray-700 mb-1">Currículo (PDF ou DOCX)*</label>
                <input type="file" id="cv-file" onChange={handleFileChange} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 ring-help-purple" accept=".pdf,.doc,.docx" required />
                <p className="text-xs text-gray-500 mt-1">Tamanho máximo: 5MB</p>
              </div>
              {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}
              <button type="submit" className="cta-button bg-help-purple text-white w-full mt-4 hover:bg-opacity-90 transition-colors">Enviar Candidatura</button>
            </form>
          </>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        {renderContent()}
      </div>
    </div>
  );
}