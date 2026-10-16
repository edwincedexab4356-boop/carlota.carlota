import React from 'react';
import { Heart, MessageCircle, MapPin, Clock, Phone, CreditCard } from 'lucide-react';
import { openWhatsAppLink } from '../utils/format';

export const StoreInfoFooter: React.FC = () => {
  const handleOpenWhatsApp = () => {
    const phone = localStorage.getItem('carlota_whatsapp_phone') || '573001234567';
    openWhatsAppLink(phone, '¡Hola Carlota! Me gustaría consultar sobre sus productos y servicio de hoy ✨');
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand & Bio */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-display text-2xl font-bold tracking-tight text-white">
                Carlota
              </span>
              <span className="w-2 h-2 rounded-full bg-rose-600" />
            </div>
            <p className="text-xs uppercase font-medium tracking-wider text-rose-400 mb-4">
              Cremosidad que enamora
            </p>
            <p className="text-xs text-stone-400 leading-relaxed mb-4">
              Especialistas en Fresas con Crema, postres cuchareables, repostería artesanal, waffles y bebidas naturales preparadas al instante.
            </p>
            <button
              onClick={handleOpenWhatsApp}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Contactar por WhatsApp</span>
            </button>
          </div>

          {/* Col 2: Horarios & Pedidos */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-rose-400" />
              <span>Horarios de Atención</span>
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li className="flex justify-between">
                <span>Lunes a Jueves:</span>
                <span className="text-white">2:00 PM – 9:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Viernes y Sábados:</span>
                <span className="text-white">1:00 PM – 10:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Domingos y Festivos:</span>
                <span className="text-white">1:00 PM – 9:00 PM</span>
              </li>
            </ul>
            <p className="text-[11px] text-stone-500 mt-4">
              * Pedidos para llevar con cargo de $1.000 por empaque.
            </p>
          </div>

          {/* Col 3: Métodos de Pago */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-rose-400" />
              <span>Medios de Pago</span>
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-stone-800/80 border border-stone-700/60 text-white font-medium">
                Nequi
              </div>
              <div className="p-2.5 rounded-lg bg-stone-800/80 border border-stone-700/60 text-white font-medium">
                Daviplata
              </div>
              <div className="p-2.5 rounded-lg bg-stone-800/80 border border-stone-700/60 text-white font-medium">
                Efectivo
              </div>
              <div className="p-2.5 rounded-lg bg-stone-800/80 border border-stone-700/60 text-white font-medium">
                Transferencias
              </div>
            </div>
            <p className="text-[11px] text-stone-400 mt-3">
              Pago contra entrega o previo al despacho para domicilios.
            </p>
          </div>

          {/* Col 4: Atención & Ubicación */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-rose-400" />
              <span>Servicio & Pedidos</span>
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed mb-3">
              Atención directa en mesa, pedidos para llevar y despachos a domicilio en el área local.
            </p>
            <div className="p-3 rounded-xl bg-stone-800/50 border border-stone-700/60 text-xs">
              <p className="text-rose-300 font-semibold mb-1">¿Preguntas sobre combos?</p>
              <p className="text-stone-400 text-[11px]">
                Escríbenos directamente o consulta nuestro botón de combos en el menú para promociones exclusivas.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} Carlota · Cremosidad que enamora. Todos los derechos reservados.</span>
          </div>
          <div className="flex items-center gap-2 text-stone-400">
            <span>Hecho con amor y pasión repostera</span>
            <Heart className="w-3.5 h-3.5 fill-rose-600 text-rose-600 inline" />
          </div>
        </div>
      </div>
    </footer>
  );
};
