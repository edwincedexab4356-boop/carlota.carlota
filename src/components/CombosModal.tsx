import React from 'react';
import { X, Sparkles, MessageCircle, Check } from 'lucide-react';
import { formatPrice, openWhatsAppLink } from '../utils/format';

interface CombosModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCombo: (comboName: string, price: number) => void;
}

interface Combo {
  id: string;
  title: string;
  tag: string;
  description: string;
  items: string[];
  regularPrice: number;
  promoPrice: number;
}

const FEATURED_COMBOS: Combo[] = [
  {
    id: 'combo-pareja',
    title: 'Combo Cremosidad para Dos',
    tag: 'El Más Pedido',
    description: 'Perfecto para compartir una tarde dulce inolvidable.',
    items: [
      '2x Fresas con Crema 16 Oz (ambas incluyen brownie y salsa de chocolate)',
      '2x Bebidas naturales en agua o leche (sabor a elección)',
      '1x Porción extra de Topping de Nutella',
    ],
    regularPrice: 55000,
    promoPrice: 48000,
  },
  {
    id: 'combo-tarde-dulce',
    title: 'Combo Tarde Carlota',
    tag: 'Favorito de la Casa',
    description: 'La combinación crocante y suave para consentirte.',
    items: [
      '1x Waffle con Fresas, crema y avellanas',
      '1x Malteada Carlota (toque de limón y galleta)',
      '1x Galleta artesanal a elección',
    ],
    regularPrice: 42000,
    promoPrice: 36000,
  },
  {
    id: 'combo-degustacion',
    title: 'Combo Degustación Repostera',
    tag: 'Ahorro Máximo',
    description: 'Para probar los favoritos de la vitrina.',
    items: [
      '1x Postre Carlota (crema de limón y capas de galleta)',
      '1x Cuchareable de Oreo o Brownie',
      '1x Caja por 4 Galletas surtidas',
    ],
    regularPrice: 46000,
    promoPrice: 39000,
  },
  {
    id: 'combo-salado-dulce',
    title: 'Combo Almuerzo & Antojo',
    tag: 'Completo',
    description: 'Salado gourmet + el toque dulce de la casa.',
    items: [
      '1x Hamburguesa La Porteña o Milanga Pork con papas',
      '1x Bebida natural en agua fría',
      '1x Fresas con Crema 12 Oz',
    ],
    regularPrice: 45000,
    promoPrice: 39500,
  },
];

export const CombosModal: React.FC<CombosModalProps> = ({
  isOpen,
  onClose,
  onSelectCombo,
}) => {
  if (!isOpen) return null;

  const handleAskWhatsApp = (combo: Combo) => {
    const phone = localStorage.getItem('carlota_whatsapp_phone') || '573001234567';
    const text = `¡Hola Carlota! 👋 Me gustaría preguntar por el *${combo.title}* en promoción a ${formatPrice(combo.promoPrice)}. ¿Está disponible para ordenar hoy? ✨`;
    openWhatsAppLink(phone, text);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-stone-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-100 flex items-center justify-between bg-gradient-to-r from-amber-50/80 via-white to-rose-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800">
              <Sparkles className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">
                Del Menú: &ldquo;Preguntar por los combos&rdquo;
              </span>
              <h2 className="font-display text-xl font-bold text-stone-900">
                Combos & Promociones del Día
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Combos list */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          <p className="text-xs text-stone-600">
            Aprovecha nuestros combos especiales diseñados para disfrutar en pareja, en familia o con amigos ahorrando en cada pedido:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FEATURED_COMBOS.map((combo) => (
              <div
                key={combo.id}
                className="p-4 rounded-2xl border border-stone-200 bg-stone-50/40 hover:border-amber-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800 bg-rose-50 px-2 py-0.5 rounded">
                      {combo.tag}
                    </span>
                    <span className="text-xs line-through text-stone-400 tabular-nums">
                      {formatPrice(combo.regularPrice)}
                    </span>
                  </div>

                  <h3 className="font-display text-base font-bold text-stone-900 mb-1">
                    {combo.title}
                  </h3>
                  <p className="text-xs text-stone-600 mb-3 leading-relaxed">
                    {combo.description}
                  </p>

                  <div className="space-y-1.5 mb-4">
                    {combo.items.map((it, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-xs text-stone-700">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{it}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-200 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] text-stone-500 block">Precio Especial</span>
                    <span className="text-base font-extrabold text-stone-900 tabular-nums">
                      {formatPrice(combo.promoPrice)}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleAskWhatsApp(combo)}
                      className="p-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg text-xs font-semibold flex items-center gap-1 border border-emerald-200"
                      title="Preguntar por WhatsApp"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-emerald-600 text-white" />
                      <span className="hidden sm:inline">Preguntar</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onSelectCombo(combo.title, combo.promoPrice);
                        onClose();
                      }}
                      className="px-3 py-2 bg-stone-900 hover:bg-rose-900 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                    >
                      Pedir Combo
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-100 bg-stone-50/80 flex items-center justify-between text-xs text-stone-500">
          <span>* Precios sujetos a disponibilidad en el día</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 font-semibold rounded-lg"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
