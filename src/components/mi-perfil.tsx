import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Lock, Book, Target, Settings as SettingsIcon, Clock, AlertCircle, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { MindoAvatar } from './mindo-avatar';
import { BreadcrumbNav, BreadcrumbItem, BackButton } from './ui/breadcrumb-nav';

type View = 'profile' | 'journal' | 'professionalHelp' | 'organizationDetail';

interface MiPerfilProps {
  onBack?: () => void;
}

interface DesahogoPost {
  id: string;
  text: string;
  timestamp: Date;
  tags: string[];
  isPublic: boolean;
  reactions: {
    calma: number;
    comments: number;
    yoTambien: number;
  };
  hoursUntilPrivate?: number;
}

interface PatternAlert {
  keyword: string;
  mentions: number;
  timeframe: number; // days
  severity: 'medium' | 'high' | 'critical';
  relatedTags: string[];
}

interface Organization {
  id: string;
  name: string;
  icon: string;
  description: string;
  services: string[];
  contact: {
    phone?: string;
    website?: string;
    chat?: boolean;
  };
  verified: boolean;
  rating: number;
  reviews: number;
}

const mockPosts: DesahogoPost[] = [
  {
    id: '1',
    text: 'Me siento ansioso por el examen de mañana. No he podido dormir bien y siento que no estoy preparado...',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    tags: ['ansiedad', 'examen'],
    isPublic: true,
    reactions: { calma: 12, comments: 3, yoTambien: 5 },
    hoursUntilPrivate: 22
  },
  {
    id: '2',
    text: 'Hoy tuve un ataque de ansiedad en clase. Mi corazón latía muy rápido y no podía concentrarme...',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    tags: ['ansiedad', 'pánico'],
    isPublic: false,
    reactions: { calma: 0, comments: 0, yoTambien: 0 }
  },
  {
    id: '3',
    text: 'No puedo dormir por la ansiedad. Llevo 3 noches así...',
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    tags: ['ansiedad', 'insomnio'],
    isPublic: false,
    reactions: { calma: 0, comments: 0, yoTambien: 0 }
  }
];

const mockAlert: PatternAlert = {
  keyword: 'ansiedad',
  mentions: 7,
  timeframe: 14,
  severity: 'medium',
  relatedTags: ['ansiedad', 'exámenes', 'insomnio', 'estrés']
};

const organizations: Organization[] = [
  {
    id: '1',
    name: 'Cruz Roja',
    icon: '🏥',
    description: 'Apoyo psicológico 24/7',
    services: ['Apoyo psicológico gratuito', 'Disponible 24/7', 'Profesionales certificados'],
    contact: {
      phone: '(55) 5395-1111',
      website: 'www.cruzroja.org.mx/apoyo',
      chat: true
    },
    verified: true,
    rating: 4.8,
    reviews: 2341
  },
  {
    id: '2',
    name: 'Línea de la Vida',
    icon: '💚',
    description: '(800) 911-2000',
    services: ['Consejería telefónica', 'Atención en crisis', 'Gratuito y confidencial'],
    contact: {
      phone: '800-911-2000',
      website: 'www.gob.mx/salud/conadic',
      chat: false
    },
    verified: true,
    rating: 4.7,
    reviews: 1893
  },
  {
    id: '3',
    name: 'Fundación Todo Mejora',
    icon: '🌈',
    description: 'Chat confidencial',
    services: ['Chat en línea', 'Apoyo emocional', 'Lun-Dom, 9am-9pm'],
    contact: {
      website: 'www.todomejora.org',
      chat: true
    },
    verified: true,
    rating: 4.6,
    reviews: 987
  }
];

export function MiPerfil({ onBack }: MiPerfilProps = {}) {
  const [currentView, setCurrentView] = useState<View>('profile');
  const [filter, setFilter] = useState<'all' | 'public' | 'private'>('all');
  const [showAlert, setShowAlert] = useState(true);
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      // Fallback: clear hash to trigger navigation to jardin
      window.location.hash = '';
      // Force state change if needed
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    }
  };

  const filteredPosts = mockPosts.filter(post => {
    if (filter === 'all') return true;
    if (filter === 'public') return post.isPublic;
    if (filter === 'private') return !post.isPublic;
    return true;
  });

  const formatTimeAgo = (date: Date) => {
    const hours = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60));
    if (hours < 24) return `hace ${hours}h`;
    const days = Math.floor(hours / 24);
    return `hace ${days} día${days > 1 ? 's' : ''}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 p-6">
      <div className="max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          {/* PROFILE VIEW */}
          {currentView === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="page-transition"
            >
              <BackButton onClick={handleBack} />

              <div className="mb-6">
                <h1 className="text-gray-900 text-2xl">Mi Perfil</h1>
              </div>

              {/* Profile Card */}
              <Card className="bg-white/80 backdrop-blur-sm border-purple-200 p-6 mb-4">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">
                    <MindoAvatar emotion="happy" size="medium" animate={false} />
                  </div>
                  <div className="space-y-2 text-gray-700">
                    <p className="text-sm">Usuario desde:</p>
                    <p className="font-semibold">15 de Octubre, 2024</p>
                    <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-200">
                      <div>
                        <div className="text-2xl">🌸</div>
                        <p className="text-sm mt-1">12 días activo</p>
                      </div>
                      <div>
                        <div className="text-2xl">💙</div>
                        <p className="text-sm mt-1">8 conexiones</p>
                      </div>
                      <div>
                        <div className="text-2xl">✍️</div>
                        <p className="text-sm mt-1">23 expresiones</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Mi Diario Privado */}
              <button
                onClick={() => setCurrentView('journal')}
                className="w-full mb-4"
              >
                <Card className="bg-gradient-to-r from-purple-500 to-purple-400 border-0 p-6 hover:from-purple-600 hover:to-purple-500 transition-all shadow-lg">
                  <div className="flex items-center justify-between">
                    <div className="text-left text-white">
                      <div className="flex items-center gap-2 mb-1">
                        <Book className="w-6 h-6" />
                        <h3 className="text-lg">Mi Diario Privado</h3>
                      </div>
                      <p className="text-sm opacity-85">Solo tú puedes verlo</p>
                    </div>
                    <Lock className="w-5 h-5 text-white" />
                  </div>
                </Card>
              </button>

              {/* Mis Objetivos */}
              <button
                onClick={() => alert('La sección de Objetivos está en desarrollo. Pronto podrás establecer y seguir tus metas personales. 🎯')}
                className="w-full mb-4"
              >
                <Card className="bg-white/80 backdrop-blur-sm border-blue-200 p-5 hover:bg-white/90 transition-all cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Target className="w-6 h-6 text-blue-500" />
                    <span className="text-gray-900">Mis Objetivos</span>
                  </div>
                </Card>
              </button>

              {/* Configuración */}
              <button
                onClick={() => alert('La configuración está en desarrollo. Próximamente podrás personalizar tu experiencia, notificaciones y privacidad. ⚙️')}
                className="w-full"
              >
                <Card className="bg-white/80 backdrop-blur-sm border-gray-200 p-5 hover:bg-white/90 transition-all cursor-pointer">
                  <div className="flex items-center gap-3">
                    <SettingsIcon className="w-6 h-6 text-gray-500" />
                    <span className="text-gray-900">Configuración</span>
                  </div>
                </Card>
              </button>
            </motion.div>
          )}

          {/* JOURNAL VIEW */}
          {currentView === 'journal' && (
            <motion.div
              key="journal"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={() => setCurrentView('profile')}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                  aria-label="Volver a Mi Perfil"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Mi Perfil
                </button>
                <Lock className="w-5 h-5 text-purple-500" aria-label="Contenido privado" />
              </div>

              {/* Breadcrumb Navigation */}
              <BreadcrumbNav 
                showHome={false}
                items={[
                  { label: 'Perfil', onClick: () => setCurrentView('profile') },
                  { label: 'Mi Diario' }
                ]}
              />

              <div className="mb-6">
                <h2 className="text-gray-900 text-xl mb-4">✍️ Tus emociones compartidas ({mockPosts.length})</h2>

                {/* Filters */}
                <div className="flex gap-2">
                  {[
                    { value: 'all', label: 'Todos' },
                    { value: 'public', label: 'Públicos' },
                    { value: 'private', label: 'Privados (24h+)' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setFilter(option.value as any)}
                      className={`px-4 py-2 rounded-lg text-sm transition-all ${
                        filter === option.value
                          ? 'bg-purple-500 text-white'
                          : 'bg-white/80 text-gray-700 hover:bg-white'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* AI Pattern Alert */}
              <AnimatePresence>
                {showAlert && (
                  <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="mb-6"
                  >
                    <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-purple-200 p-5 relative shadow-lg">
                      <button
                        onClick={() => setShowAlert(false)}
                        className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-4 h-4" />
                      </button>

                      <motion.div
                        animate={{
                          scale: [1, 1.05, 1]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: 'easeInOut'
                        }}
                        className="text-center mb-4"
                      >
                        <div className="text-5xl">💙</div>
                      </motion.div>

                      <h3 className="text-gray-900 text-center mb-3 font-semibold">Nos importa tu bienestar</h3>

                      <p className="text-gray-700 text-sm text-center mb-4 leading-relaxed">
                        Hemos notado que en tus últimas expresiones has mencionado{' '}
                        <span className="font-semibold text-purple-600">"{mockAlert.keyword}"</span>{' '}
                        varias veces. Queremos que sepas que no estás solo/a.
                      </p>

                      <p className="text-gray-700 text-sm text-center mb-6 leading-relaxed">
                        💜 Si lo deseas, podemos conectarte con profesionales que pueden ayudarte a sentirte mejor.
                      </p>

                      <div className="flex gap-3">
                        <Button
                          onClick={() => setCurrentView('professionalHelp')}
                          className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                        >
                          💬 Me gustaría apoyo
                        </Button>
                        <Button
                          onClick={() => setShowAlert(false)}
                          variant="outline"
                          className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                        >
                          Ahora no
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Posts */}
              <div className="space-y-4">
                {filteredPosts.map((post) => (
                  <Card
                    key={post.id}
                    className={`p-4 ${
                      post.isPublic
                        ? 'bg-white/80 border-2 border-green-400'
                        : 'bg-gray-50/80 border-2 border-purple-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className={post.isPublic ? 'text-green-500' : 'text-purple-500'}>
                          {post.isPublic ? '🟢' : '🔒'}
                        </span>
                        <span className={`text-sm font-medium ${
                          post.isPublic ? 'text-green-600' : 'text-purple-600'
                        }`}>
                          {post.isPublic ? 'Público' : 'Privado'}
                        </span>
                        <span className="text-gray-500 text-sm">
                          ({formatTimeAgo(post.timestamp)})
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-800 text-sm mb-3">{post.text}</p>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {post.isPublic && (
                      <>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3 pb-3 border-b border-gray-200">
                          <span>💙 {post.reactions.calma}</span>
                          <span>💬 {post.reactions.comments}</span>
                          <span>🌊 {post.reactions.yoTambien}</span>
                        </div>

                        <div className="flex items-center gap-2 text-yellow-600 text-xs bg-yellow-50 p-2 rounded">
                          <Clock className="w-3 h-3" />
                          <span>⏰ Se volverá privado en {post.hoursUntilPrivate} horas</span>
                        </div>
                      </>
                    )}

                    {!post.isPublic && (
                      <p className="text-gray-500 text-xs">Solo visible para ti</p>
                    )}
                  </Card>
                ))}
              </div>
            </motion.div>
          )}

          {/* PROFESSIONAL HELP VIEW */}
          {currentView === 'professionalHelp' && (
            <motion.div
              key="help"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <button
                onClick={() => setCurrentView('journal')}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
                aria-label="Volver a Mi Diario"
              >
                <ArrowLeft className="w-5 h-5" />
                Volver
              </button>

              {/* Breadcrumb Navigation */}
              <BreadcrumbNav 
                showHome={false}
                items={[
                  { label: 'Perfil', onClick: () => setCurrentView('profile') },
                  { label: 'Mi Diario', onClick: () => setCurrentView('journal') },
                  { label: 'Apoyo Profesional' }
                ]}
              />

              <div className="text-center mb-6">
                <div className="text-5xl mb-4">🤝</div>
                <h2 className="text-gray-900 text-2xl mb-3">Estamos aquí para ayudarte</h2>
                <p className="text-gray-600 text-sm">
                  Basándonos en lo que has compartido, creemos que hablar con un profesional podría ayudarte.
                </p>
              </div>

              {/* Pattern Summary */}
              <Card className="bg-orange-50 border border-orange-300 p-4 mb-6">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📊</span>
                  <div>
                    <h3 className="text-gray-900 font-semibold mb-2">Patrón detectado:</h3>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• {mockAlert.mentions} menciones de "{mockAlert.keyword}"</li>
                      <li>• Frecuencia: Alta</li>
                      <li>• Período: {mockAlert.timeframe} días</li>
                    </ul>
                    <div className="mt-3">
                      <p className="text-xs text-gray-600 mb-2">Temas relacionados:</p>
                      <div className="flex flex-wrap gap-2">
                        {mockAlert.relatedTags.map((tag, i) => (
                          <span key={i} className="text-xs bg-orange-200 text-orange-800 px-2 py-1 rounded">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <h3 className="text-gray-900 text-lg mb-4">🌟 Psicólogos Voluntarios</h3>
              <p className="text-gray-600 text-sm mb-6">
                Conectamos con organizaciones que ofrecen apoyo gratuito:
              </p>

              {/* Organizations */}
              <div className="space-y-4">
                {organizations.map((org) => (
                  <Card
                    key={org.id}
                    className="bg-white border-green-400 p-4 hover:bg-green-50/50 transition-all cursor-pointer"
                    onClick={() => {
                      setSelectedOrg(org);
                      setCurrentView('organizationDetail');
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-3xl">{org.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-gray-900 font-semibold">{org.name}</h4>
                          {org.verified && (
                            <span className="text-green-500 text-sm">✓</span>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm mb-3">{org.description}</p>
                        <Button
                          size="sm"
                          className="bg-green-500 hover:bg-green-600"
                        >
                          Contactar
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="mt-6 space-y-3">
                <Button
                  onClick={() => setCurrentView('journal')}
                  variant="outline"
                  className="w-full border-gray-300"
                >
                  Recordarme después
                </Button>
                <button
                  onClick={() => setCurrentView('journal')}
                  className="w-full text-gray-500 text-sm hover:text-gray-700"
                >
                  No mostrar de nuevo
                </button>
              </div>
            </motion.div>
          )}

          {/* ORGANIZATION DETAIL VIEW */}
          {currentView === 'organizationDetail' && selectedOrg && (
            <motion.div
              key="orgDetail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <button
                onClick={() => setCurrentView('professionalHelp')}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
                aria-label="Volver a lista de organizaciones"
              >
                <ArrowLeft className="w-5 h-5" />
                Volver
              </button>

              {/* Breadcrumb Navigation */}
              <BreadcrumbNav 
                showHome={false}
                items={[
                  { label: 'Perfil', onClick: () => setCurrentView('profile') },
                  { label: 'Mi Diario', onClick: () => setCurrentView('journal') },
                  { label: 'Apoyo', onClick: () => setCurrentView('professionalHelp') },
                  { label: selectedOrg?.name || 'Organización' }
                ]}
              />

              <Card className="bg-white/90 border-green-400 p-6 mb-6">
                <div className="text-center mb-4">
                  <div className="text-6xl mb-3">{selectedOrg.icon}</div>
                  <h2 className="text-gray-900 text-xl font-semibold mb-1">
                    {selectedOrg.name}
                  </h2>
                  {selectedOrg.verified && (
                    <p className="text-green-600 text-sm flex items-center justify-center gap-1">
                      <span>✓</span>
                      Verificada
                    </p>
                  )}
                </div>
              </Card>

              <div className="space-y-6">
                <div>
                  <h3 className="text-gray-900 font-semibold mb-3">Sobre el servicio:</h3>
                  <p className="text-gray-700 text-sm mb-4">{selectedOrg.description}</p>
                  <ul className="space-y-2">
                    {selectedOrg.services.map((service, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-green-500">✓</span>
                        <span>{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {selectedOrg.contact.phone && (
                  <div>
                    <h4 className="text-gray-700 font-semibold text-sm mb-2">📞 Teléfono:</h4>
                    <p className="text-gray-900">{selectedOrg.contact.phone}</p>
                  </div>
                )}

                {selectedOrg.contact.website && (
                  <div>
                    <h4 className="text-gray-700 font-semibold text-sm mb-2">🌐 Sitio web:</h4>
                    <p className="text-blue-600 text-sm">{selectedOrg.contact.website}</p>
                  </div>
                )}

                {selectedOrg.contact.chat && (
                  <div>
                    <h4 className="text-gray-700 font-semibold text-sm mb-2">💬 Chat en línea:</h4>
                    <p className="text-gray-700 text-sm">Lun-Dom, 24 horas</p>
                  </div>
                )}

                <div className="space-y-3 pt-4 border-t border-gray-200">
                  {selectedOrg.contact.phone && (
                    <Button className="w-full bg-green-500 hover:bg-green-600">
                      📞 Llamar ahora
                    </Button>
                  )}
                  {selectedOrg.contact.chat && (
                    <Button className="w-full bg-blue-500 hover:bg-blue-600">
                      💬 Iniciar chat
                    </Button>
                  )}
                  {selectedOrg.contact.website && (
                    <Button
                      variant="outline"
                      className="w-full border-gray-300"
                    >
                      🌐 Visitar sitio web
                    </Button>
                  )}
                </div>

                <div className="text-center pt-4 border-t border-gray-200">
                  <p className="text-gray-600 text-sm">
                    ⭐ {selectedOrg.rating}/5 ({selectedOrg.reviews.toLocaleString()} valoraciones)
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
