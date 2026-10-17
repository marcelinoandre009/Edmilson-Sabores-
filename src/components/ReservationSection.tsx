import React, { useState } from 'react';
import { Calendar, Clock, Users, User, Phone, MessageSquare, AlertCircle, CheckCircle } from 'lucide-react';
import { ReservationFormData } from '../types/restaurant';
import { RESTAURANT_CONFIG } from '../data/restaurantData';
import { createWhatsAppUrl, generateReservationMessage } from '../utils/whatsapp';

export const ReservationSection: React.FC = () => {
  const [formData, setFormData] = useState<ReservationFormData>({
    customerName: '',
    phone: '',
    date: new Date().toISOString().split('T')[0],
    time: '19:00',
    peopleCount: 4,
    notes: 'Mesa numa área tranquila, se possível.',
  });

  const [formError, setFormError] = useState<string | null>(null);
  const [reservationSent, setReservationSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!formData.customerName.trim()) {
      setFormError('Por favor, informe seu nome completo.');
      return;
    }
    if (!formData.phone.trim()) {
      setFormError('Por favor, informe seu telefone de contacto.');
      return;
    }
    if (!formData.date) {
      setFormError('Por favor, escolha a data da reserva.');
      return;
    }
    if (!formData.time) {
      setFormError('Por favor, escolha o horário desejado.');
      return;
    }

    const message = generateReservationMessage(formData);
    const url = createWhatsAppUrl(message);
    window.open(url, '_blank');
    setReservationSent(true);
  };

  return (
    <section id="reservar" className="py-16 sm:py-20 bg-zinc-950 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <span>🪑</span>
            <span>Serviço de Mesa na Caála</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-display">
            Reserve sua <span className="text-amber-500">Mesa</span>
          </h2>

          <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto">
            Vai comer no local? Reserve sua mesa de forma rápida e simples para vir com a família, amigos ou comemorar momentos especiais.
          </p>
        </div>

        {/* Card Form */}
        <div className="bg-zinc-900/90 rounded-3xl p-6 sm:p-8 lg:p-10 border border-zinc-800 shadow-2xl relative">
          
          {reservationSent ? (
            <div className="text-center py-8 space-y-5">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto text-3xl">
                💬
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white font-display">
                  Mensagem Pronta no WhatsApp!
                </h3>
                <p className="text-sm text-zinc-300 max-w-md mx-auto">
                  Envie a mensagem no WhatsApp para que a equipe da <strong>Edmilson Sabores</strong> verifique a disponibilidade.
                </p>
              </div>

              {/* Crucial notification required by prompt */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs sm:text-sm text-left max-w-md mx-auto flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong>Atenção:</strong> Sua reserva estará confirmada <strong>somente depois</strong> que a Edmilson Sabores responder e confirmar pelo WhatsApp.
                </div>
              </div>

              <button
                type="button"
                onClick={() => setReservationSent(false)}
                className="px-6 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-300 font-semibold cursor-pointer transition-colors"
              >
                Fazer outra solicitação
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {formError && (
                <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-800 text-red-200 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Nome */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-amber-400" />
                    <span>Nome Completo *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.customerName}
                    onChange={(e) =>
                      setFormData({ ...formData, customerName: e.target.value })
                    }
                    placeholder="Ex: André Marcelino"
                    className="w-full px-3.5 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Telefone */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>Número de Telefone *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="Ex: 922 955 570"
                    className="w-full px-3.5 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Data */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span>Data Desejada *</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className="w-full px-3.5 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Horário */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Horário Previsto *</span>
                  </label>
                  <input
                    type="time"
                    required
                    value={formData.time}
                    onChange={(e) =>
                      setFormData({ ...formData, time: e.target.value })
                    }
                    className="w-full px-3.5 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Pessoas */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-amber-400" />
                    <span>Nº de Pessoas *</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    required
                    value={formData.peopleCount}
                    onChange={(e) =>
                      setFormData({ ...formData, peopleCount: parseInt(e.target.value) || 1 })
                    }
                    className="w-full px-3.5 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>
              </div>

              {/* Observações */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                  <span>Observações (Opcional)</span>
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  placeholder="Ex: Mesa numa área tranquila, cadeira para criança, comemoração de aniversário..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Crucial instruction banner */}
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Sua reserva estará confirmada <strong>somente depois</strong> que a Edmilson Sabores responder e confirmar a disponibilidade pelo WhatsApp.
                </span>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 hover:from-amber-400 hover:to-red-500 active:scale-98 text-white font-black text-sm uppercase tracking-wider shadow-xl shadow-amber-950/40 flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <span>🪑</span>
                <span>RESERVAR PELO WHATSAPP</span>
              </button>

            </form>
          )}

        </div>

      </div>
    </section>
  );
};
