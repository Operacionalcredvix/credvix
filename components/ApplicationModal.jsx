'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import styles from './ApplicationModal.module.css'; // Importa o nosso CSS Module

export default function ApplicationModal({ isOpen, onClose, jobInfo }) {
  // Estados para controlar os dados do formulário
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cvFile, setCvFile] = useState(null);
  
  // Estado para controlar o processo de envio
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Reseta o formulário sempre que o modal for fechado ou o jobInfo mudar
  useEffect(() => {
    if (!isOpen) {
      // Adiciona um pequeno delay para a animação de fechar
      setTimeout(() => {
        setName('');
        setEmail('');
        setPhone('');
        setCvFile(null);
        setStatus('idle');
        setErrorMessage('');
      }, 300);
    }
  }, [isOpen]);

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
    e.preventDefault();

    if (!cvFile || !name || !email || !phone) {
        setErrorMessage('Por favor, preencha todos os campos e selecione um arquivo.');
        return;
    }
    
    setStatus('submitting');
    setErrorMessage('');

    try {
      const fileExt = cvFile.name.split('.').pop();
      const fileName = `${email.split('@')[0]}_${Date.now()}.${fileExt}`;
      const safeStoreName = jobInfo.storeName.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-');
      const filePath = `${safeStoreName}/${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('curriculos')
        .upload(filePath, cvFile);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage.from('curriculos').getPublicUrl(filePath);

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
      
      setStatus('success');
      setTimeout(onClose, 4000);

    } catch (error) {
      console.error('Erro no processo de candidatura:', error);
      setErrorMessage(error.message || 'Ocorreu um erro. Tente novamente.');
      setStatus('error');
    }
  };
  
  // Se o modal não estiver aberto, não renderiza nada
  if (!isOpen) {
    return null;
  }

  const renderContent = () => {
    switch (status) {
      case 'submitting':
        return (
          <div className={styles.statusMessage}>
            <p className="text-lg">Enviando seu currículo...</p>
          </div>
        );
      case 'success':
        return (
          <div className={styles.statusMessage}>
            <p className="text-green-600 font-bold text-xl mb-2">Currículo enviado com sucesso!</p>
            <p className="text-sm text-gray-500">Agradecemos seu interesse.</p>
          </div>
        );
      case 'error':
        return (
            <div className={styles.statusMessage}>
                <p className="text-red-600 font-bold text-xl mb-2">Ocorreu um erro</p>
                <p className="text-sm text-gray-500 mb-4">{errorMessage}</p>
                <button onClick={() => setStatus('idle')} className="text-help-purple font-semibold">Tentar novamente</button>
            </div>
        );
      default: // 'idle'
        return (
          <>
            <h3 className={styles.formTitle}>Candidatar-se para a Vaga</h3>
            <p className={styles.jobTitle}>{jobInfo?.title} - {jobInfo?.storeName}</p>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div>
                <label htmlFor="candidate-name" className={styles.formLabel}>Nome Completo*</label>
                <input type="text" id="candidate-name" value={name} onChange={(e) => setName(e.target.value)} className={styles.formInput} required />
              </div>
              <div>
                <label htmlFor="candidate-email" className={styles.formLabel}>E-mail*</label>
                <input type="email" id="candidate-email" value={email} onChange={(e) => setEmail(e.target.value)} className={styles.formInput} required />
              </div>
              <div>
                <label htmlFor="candidate-phone" className={styles.formLabel}>Telefone*</label>
                <input type="tel" id="candidate-phone" value={phone} onChange={(e) => setPhone(e.target.value)} className={styles.formInput} required />
              </div>
              <div>
                <label htmlFor="cv-file" className={styles.fileInputLabel}>Currículo (PDF ou DOCX)*</label>
                <input type="file" id="cv-file" onChange={handleFileChange} className={styles.hiddenFileInput} accept=".pdf,.doc,.docx" required />
                <label htmlFor="cv-file" className={styles.fileInputTrigger}>
                    <span className={styles.fileInputButton}>Escolher ficheiro</span>
                    <span className={styles.fileName}>{cvFile ? cvFile.name : 'Nenhum ficheiro selecionado'}</span>
                </label>
                <p className={styles.fileHint}>Tamanho máximo: 5MB</p>
              </div>
              {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
              <button type="submit" className={styles.submitButton}>Enviar Candidatura</button>
            </form>
          </>
        );
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modalContent}>
        <button onClick={onClose} className={styles.closeButton}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        {renderContent()}
      </div>
    </div>
  );
}