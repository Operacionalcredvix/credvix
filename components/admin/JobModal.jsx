'use client';

import { useState, useEffect } from 'react';

// Importar os componentes shadcn/ui que vamos usar
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function JobModal({ isOpen, onClose, job, onSave, stores = [] }) {
  const [title, setTitle] = useState('');
  const [lojaId, setLojaId] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [jobCategory, setJobCategory] = useState('Aberta');
  const [isActive, setIsActive] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (job) {
      setTitle(job.title || '');
      setLojaId(job.loja_id?.toString() || '');
      setType(job.type || '');
      setDescription(job.description || '');
      setJobCategory(job.job_category || 'Aberta');
      setIsActive(job.is_active);
    } else {
      // Valores padrão para uma nova vaga
      setTitle('');
      setLojaId('');
      setType('Tempo Integral');
      setDescription('');
      setJobCategory('Aberta');
      setIsActive(true);
    }
  }, [job]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    const selectedStore = stores.find(s => s.id.toString() === lojaId);
    const jobData = {
      title,
      loja_id: lojaId,
      storename: selectedStore ? selectedStore.name : '',
      city: selectedStore ? selectedStore.city : '',
      state: selectedStore ? selectedStore.state : '',
      type,
      description,
      job_category: jobCategory,
      is_active: isActive,
    };
    await onSave(jobData);
    setIsSaving(false);
  };

  // O componente Dialog do shadcn controla a sua visibilidade através da prop 'open'
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{job ? 'Editar Vaga' : 'Criar Nova Vaga'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">Título</Label>
              <Input id="title" value={title} onChange={e => setTitle(e.target.value)} className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="loja" className="text-right">Loja</Label>
              <Select value={lojaId} onValueChange={setLojaId}>
                <SelectTrigger id="loja" className="col-span-3">
                  <SelectValue placeholder="Selecione a Loja" />
                </SelectTrigger>
                <SelectContent>
                  {stores.map(store => (
                    <SelectItem key={store.id} value={store.id.toString()}>{store.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">Tipo</Label>
              <Input id="type" value={type} onChange={e => setType(e.target.value)} className="col-span-3" placeholder="Ex: Tempo Integral" required />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">Categoria</Label>
               <Select value={jobCategory} onValueChange={setJobCategory}>
                <SelectTrigger id="category" className="col-span-3">
                  <SelectValue placeholder="Selecione a Categoria" />
                </SelectTrigger>
                <SelectContent>
                   <SelectItem value="Aberta">Vaga Aberta</SelectItem>
                   <SelectItem value="Banco de Talentos">Banco de Talentos</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="description" className="text-right pt-2">Descrição</Label>
              <Textarea id="description" value={description} onChange={e => setDescription(e.target.value)} className="col-span-3" rows={5} />
            </div>
            <div className="flex items-center space-x-2 justify-end">
                <input type="checkbox" id="isActive" checked={isActive} onChange={e => setIsActive(e.target.checked)} className="h-4 w-4" />
                <Label htmlFor="isActive">Vaga Ativa</Label>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancelar</Button>
            </DialogClose>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? 'Salvando...' : 'Salvar Vaga'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}