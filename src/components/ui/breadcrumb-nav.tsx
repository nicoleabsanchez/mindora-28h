import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
  showHome?: boolean;
  onHomeClick?: () => void;
}

export const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({ 
  items, 
  showHome = true,
  onHomeClick 
}) => {
  return (
    <nav className="breadcrumb flex items-center text-sm text-gray-500 mb-4">
      {showHome && onHomeClick && (
        <>
          <button 
            onClick={onHomeClick}
            className="flex items-center gap-1 px-2 py-1 rounded hover:text-purple-600 hover:bg-purple-50 transition-colors"
            aria-label="Volver al inicio"
          >
            <Home className="w-4 h-4" />
            <span>Inicio</span>
          </button>
          <ChevronRight className="w-4 h-4 mx-1 text-gray-400" />
        </>
      )}
      
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        
        return (
          <React.Fragment key={index}>
            {isLast ? (
              <span className="text-gray-900 font-medium">
                {item.label}
              </span>
            ) : (
              <>
                <button
                  onClick={item.onClick}
                  className="px-2 py-1 rounded hover:text-purple-600 hover:bg-purple-50 transition-colors"
                >
                  {item.label}
                </button>
                <ChevronRight className="w-4 h-4 mx-1 text-gray-400" />
              </>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

// Component for back button with consistent styling
interface BackButtonProps {
  onClick: () => void;
  label?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({ 
  onClick, 
  label = 'Volver' 
}) => {
  return (
    <button
      onClick={onClick}
      className="back-button inline-flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all mb-4"
    >
      <svg 
        className="w-4 h-4" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M15 19l-7-7 7-7" 
        />
      </svg>
      {label}
    </button>
  );
};

// Toast notification component
interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'info', onClose }) => {
  React.useEffect(() => {
    if (onClose) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [onClose]);

  const colors = {
    success: 'border-green-500 bg-green-50',
    error: 'border-red-500 bg-red-50',
    info: 'border-purple-500 bg-purple-50'
  };

  return (
    <div className={`toast-notification ${colors[type]} border-l-4 p-4 rounded-lg shadow-lg`}>
      <div className="flex items-center gap-3">
        {type === 'success' && <span className="text-green-600 text-xl">✓</span>}
        {type === 'error' && <span className="text-red-600 text-xl">⚠️</span>}
        {type === 'info' && <span className="text-purple-600 text-xl">ℹ️</span>}
        <p className="text-gray-800">{message}</p>
      </div>
    </div>
  );
};

// Confirmation dialog component
interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  type = 'info'
}) => {
  if (!isOpen) return null;

  const confirmColors = {
    danger: 'bg-red-600 hover:bg-red-700',
    warning: 'bg-yellow-600 hover:bg-yellow-700',
    info: 'bg-purple-600 hover:bg-purple-700'
  };

  return (
    <div className="confirmation-overlay fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="confirmation-dialog bg-white p-6 rounded-xl max-w-md w-full mx-4 shadow-2xl">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 text-white ${confirmColors[type]} rounded-lg transition-colors`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

// Loading spinner component
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  message 
}) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className={`${sizes[size]} border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin`} />
      {message && <p className="text-gray-600 text-sm">{message}</p>}
    </div>
  );
};
