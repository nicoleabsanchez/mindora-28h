# Implementación de las 10 Heurísticas de Nielsen en Mindora

Este documento detalla cómo se han aplicado las **10 Heurísticas de Usabilidad de Jakob Nielsen** en la aplicación Mindora.

---

## 1. Visibilidad del Estado del Sistema ✅

**Principio**: El sistema debe mantener informados a los usuarios sobre lo que está sucediendo, mediante retroalimentación apropiada en tiempo razonable.

### Implementaciones:

- ✅ **Breadcrumbs (migas de pan)**: En componentes como Mi Perfil, mostramos la ruta de navegación actual

  ```tsx
  <BreadcrumbNav
    items={[
      { label: "Perfil", onClick: () => setCurrentView("profile") },
      { label: "Mi Diario" },
    ]}
  />
  ```

- ✅ **Indicadores de progreso**: Barras de progreso para plantas y crecimiento

  ```css
  .progress-bar::after {
    width: var(--progress, 0%);
    transition: width 0.3s ease;
  }
  ```

- ✅ **Estados de carga**: Spinner con mensaje opcional

  ```tsx
  <LoadingSpinner size="md" message="Cargando..." />
  ```

- ✅ **Mensajes de confirmación**: Toasts para acciones exitosas/errores

  ```tsx
  <Toast message="Cambios guardados" type="success" />
  ```

- ✅ **Animaciones de transición**: Feedback visual al cambiar de vista
  ```tsx
  className = "page-transition"; // Fade-in de 0.3s
  ```

---

## 2. Coincidencia entre el Sistema y el Mundo Real ✅

**Principio**: El sistema debe hablar el idioma de los usuarios, con palabras, frases y conceptos familiares.

### Implementaciones:

- ✅ **Lenguaje natural**: Uso de términos como "Desahogo", "Mi Jardín", "Aura"
- ✅ **Metáforas visuales**: Plantas que crecen representan progreso personal
- ✅ **Iconos intuitivos**: 🌱 para crecimiento, 💭 para pensamientos, 🤝 para apoyo
- ✅ **Nomenclatura familiar**: "Mi Diario" en lugar de "Log", "Volver" en lugar de "Back"

---

## 3. Control y Libertad del Usuario ✅

**Principio**: Los usuarios a menudo cometen errores. Necesitan una "salida de emergencia" claramente marcada.

### Implementaciones:

- ✅ **Botones "Volver" consistentes**: Presente en todas las vistas con BackButton component

  ```tsx
  <BackButton onClick={handleBack} label="Volver" />
  ```

- ✅ **Navegación sin recarga**: Uso de estado interno en lugar de window.history.back()

  ```tsx
  const handleBack = () => {
    if (onBack) {
      onBack(); // Navega sin recargar página
    } else {
      window.location.hash = "";
    }
  };
  ```

- ✅ **Breadcrumbs clicables**: Permite volver a cualquier nivel anterior
- ✅ **Modal con X**: Fácil salida de diálogos y modales
- ✅ **Scroll suave**: `scroll-behavior: smooth` sin interrupciones

---

## 4. Consistencia y Estándares ✅

**Principio**: Los usuarios no deberían tener que preguntarse si diferentes palabras, situaciones o acciones significan lo mismo.

### Implementaciones:

- ✅ **Componente BackButton reutilizable**: Mismo estilo en toda la app

  ```css
  .back-button {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    /* Estilo consistente */
  }
  ```

- ✅ **BreadcrumbNav component**: Navegación uniforme
- ✅ **Paleta de colores coherente**: Purple (#8B5CF6) para acciones primarias
- ✅ **Espaciado consistente**: Uso de sistema de spacing de Tailwind (4px base)
- ✅ **Tipografía uniforme**: Jerarquía clara (text-2xl para títulos, text-base para body)

---

## 5. Prevención de Errores ✅

**Principio**: Aún mejor que buenos mensajes de error es un diseño cuidadoso que previene que ocurra un problema.

### Implementaciones:

- ✅ **Touch targets mínimos**: 44x44px en desktop, 48x48px en móvil

  ```css
  button:not(.icon-only) {
    min-height: 44px;
    min-width: 44px;
  }
  ```

- ✅ **Diálogos de confirmación**: Para acciones destructivas

  ```tsx
  <ConfirmDialog
    isOpen={isOpen}
    title="¿Eliminar entrada?"
    message="Esta acción no se puede deshacer"
    onConfirm={handleDelete}
    type="danger"
  />
  ```

- ✅ **Validación de formularios**: Estados visuales para input válido/inválido

  ```css
  input:invalid:not(:focus):not(:placeholder-shown) {
    border-color: #dc2626;
  }
  ```

- ✅ **Disabled states**: Botones deshabilitados cuando no son aplicables
- ✅ **Prevención de zoom iOS**: `font-size: 16px` en inputs móviles

---

## 6. Reconocimiento en Lugar de Recuerdo ✅

**Principio**: Minimizar la carga de memoria del usuario haciendo visibles objetos, acciones y opciones.

### Implementaciones:

- ✅ **Breadcrumbs siempre visibles**: El usuario sabe dónde está sin tener que recordar
- ✅ **Iconos + texto**: No solo iconos, también etiquetas descriptivas
- ✅ **Estados visuales persistentes**: Hover effects muestran qué es clickeable

  ```css
  .interactive-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
  ```

- ✅ **Contexto visual**: Breadcrumbs muestran el camino completo
- ✅ **Tooltips**: Información adicional al hacer hover (data-tooltip attribute)

---

## 7. Flexibilidad y Eficiencia de Uso ✅

**Principio**: Los aceleradores pueden mejorar la interacción para usuarios expertos.

### Implementaciones:

- ✅ **Navegación por breadcrumbs**: Saltos directos a niveles anteriores
- ✅ **Transiciones rápidas**: 0.2-0.3s para feedback inmediato
- ✅ **Shortcuts visuales**: Breadcrumbs como atajos de navegación
- ✅ **Scroll suave**: Navegación fluida sin recargas

  ```css
  html {
    scroll-behavior: smooth;
    overscroll-behavior-y: contain;
  }
  ```

- ✅ **Focus-visible**: Navegación por teclado optimizada
  ```css
  *:focus-visible {
    outline: 2px solid #8b5cf6;
    outline-offset: 2px;
  }
  ```

---

## 8. Diseño Estético y Minimalista ✅

**Principio**: Los diálogos no deben contener información irrelevante o raramente necesaria.

### Implementaciones:

- ✅ **Componentes limpios**: Solo información esencial visible
- ✅ **Animaciones sutiles**: 0.2s transitions, no excesivas

  ```css
  button,
  a,
  input,
  textarea {
    transition: all 0.2s ease-in-out;
  }
  ```

- ✅ **Espacios en blanco**: Uso apropiado de padding y margins
- ✅ **Jerarquía visual clara**: Tamaños de fuente y colores intencionales
- ✅ **Scrollbar personalizado**: Estilo sutil que no distrae

  ```css
  ::-webkit-scrollbar-thumb {
    background: #8b5cf6;
    border-radius: 4px;
  }
  ```

- ✅ **Skeleton loading**: Estados de carga elegantes
  ```css
  .skeleton {
    background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
    animation: loading 1.5s ease-in-out infinite;
  }
  ```

---

## 9. Ayudar a Reconocer, Diagnosticar y Recuperarse de Errores ✅

**Principio**: Los mensajes de error deben expresarse en lenguaje simple, indicar con precisión el problema y sugerir una solución.

### Implementaciones:

- ✅ **Mensajes de error claros**: Con iconos y color rojo

  ```css
  .error-message::before {
    content: "⚠️";
  }
  ```

- ✅ **Mensajes de éxito**: Feedback positivo con verde y checkmark

  ```css
  .success-message::before {
    content: "✓";
  }
  ```

- ✅ **Toast notifications**: Mensajes temporales no intrusivos

  ```tsx
  <Toast message="Error al guardar" type="error" />
  ```

- ✅ **Validación inline**: Feedback inmediato en formularios
- ✅ **Colores semánticos**: Rojo para error, amarillo para warning, verde para success

---

## 10. Ayuda y Documentación ✅

**Principio**: Es mejor si el sistema puede usarse sin documentación, pero puede ser necesario proveer ayuda.

### Implementaciones:

- ✅ **Breadcrumbs como guía**: Muestran dónde está el usuario
- ✅ **Tooltips contextuales**: Información adicional al hacer hover

  ```css
  .tooltip::after {
    content: attr(data-tooltip);
    /* Muestra ayuda contextual */
  }
  ```

- ✅ **Labels descriptivos**: Texto claro en botones y enlaces
- ✅ **Feedback visual**: Indicadores de estado claros
- ✅ **Aria-labels**: Accesibilidad para lectores de pantalla

  ```tsx
  <button aria-label="Volver al inicio">
  ```

- ✅ **Mensajes informativos**: Alertas con contexto completo
- ✅ **Focus-visible**: Ayuda para navegación por teclado

---

## Archivos Principales Modificados

### 1. `src/styles/custom-improvements.css`

Nuevo archivo con todas las mejoras CSS:

- Smooth scrolling
- Focus states
- Breadcrumb styles
- Toast notifications
- Loading states
- Error/success messages
- Tooltips
- Skeleton loading
- Custom scrollbar

### 2. `src/components/ui/breadcrumb-nav.tsx`

Componentes reutilizables:

- `BreadcrumbNav`: Navegación con migas de pan
- `BackButton`: Botón de retroceso consistente
- `Toast`: Notificaciones temporales
- `ConfirmDialog`: Diálogos de confirmación
- `LoadingSpinner`: Indicadores de carga

### 3. Componentes Actualizados

- `src/components/mi-perfil.tsx`: Breadcrumbs y navegación sin reload
- `src/components/chat-verification-flow.tsx`: BackButton y handleBack
- `src/components/mindful-chat.tsx`: Navegación mejorada
- `src/main.tsx`: Importa custom-improvements.css

---

## Mejoras Técnicas Implementadas

### Navegación Sin Recarga de Página

```typescript
const handleBack = () => {
  if (onBack) {
    onBack(); // Callback interno
  } else {
    window.location.hash = ""; // Fallback
  }
};
```

### Smooth Scrolling

```css
html {
  scroll-behavior: smooth;
  overflow-y: scroll;
}

body {
  overscroll-behavior-y: contain;
  overflow-x: hidden;
}
```

### Transiciones Fluidas

```css
button,
a,
input,
textarea {
  transition: all 0.2s ease-in-out;
}

.page-transition {
  animation: fadeIn 0.3s ease-in-out;
}
```

---

## Checklist de Heurísticas

| #   | Heurística                | Implementado | Archivos                                                    |
| --- | ------------------------- | ------------ | ----------------------------------------------------------- |
| 1   | Visibilidad del estado    | ✅           | breadcrumb-nav.tsx, custom-improvements.css                 |
| 2   | Match sistema-mundo real  | ✅           | Todos los componentes (lenguaje)                            |
| 3   | Control y libertad        | ✅           | mi-perfil.tsx, chat-verification-flow.tsx, mindful-chat.tsx |
| 4   | Consistencia              | ✅           | breadcrumb-nav.tsx, custom-improvements.css                 |
| 5   | Prevención de errores     | ✅           | breadcrumb-nav.tsx (ConfirmDialog), custom-improvements.css |
| 6   | Reconocimiento > Recuerdo | ✅           | BreadcrumbNav en todos los componentes                      |
| 7   | Flexibilidad              | ✅           | Breadcrumbs clicables, smooth scroll                        |
| 8   | Estética minimalista      | ✅           | custom-improvements.css (animaciones sutiles)               |
| 9   | Reconocer errores         | ✅           | Toast, error-message, success-message styles                |
| 10  | Ayuda y documentación     | ✅           | Tooltips, aria-labels, breadcrumbs                          |

---

## Próximos Pasos Sugeridos

1. **Testing de Accesibilidad**: Verificar con screen readers
2. **Responsive Testing**: Probar en diferentes tamaños de pantalla
3. **Performance**: Medir métricas de Core Web Vitals
4. **User Testing**: Validar mejoras con usuarios reales
5. **A/B Testing**: Comparar métricas antes/después de las mejoras

---

## Recursos

- [Nielsen Norman Group - 10 Usability Heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/)
- [Material Design - Accessibility](https://material.io/design/usability/accessibility.html)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

**Última actualización**: ${new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}
**Commit**: [055dda5](https://github.com/nicoleabsanchez/mindora-28h/commit/055dda5)
