<!-- NotificationToast.svelte -->
<script lang="ts">
  import { fly } from 'svelte/transition';
  import { onMount, onDestroy } from 'svelte';

  export let message: string = '';
  export let isVisible: boolean = false;
  export let type: 'success' | 'info' | 'warning' = 'success';

  

  let timer: ReturnType<typeof setTimeout>;

  // Función para mostrar la notificación
  function showNotification(msg: string, notifType: 'success' | 'info' | 'warning' = 'success') {
    message = msg;
    type = notifType;
    isVisible = true;
  }

 // Manejar el evento con la información de la valoración y el mensaje
 const handleDishRatingsUpdated = (event: CustomEvent) => {
  const { dishId, rating, message } = event.detail;
  // Determina el tipo de notificación según la valoración
  const notificationType = rating >= 4 ? 'success' : (rating >= 2 ? 'info' : 'warning');
  // Muestra la notificación con el mensaje y el tipo calculado
  showNotification(message || `Platillo ${dishId} evaluado con ${rating} estrellas`, notificationType);
};

//Manejar el evento con la información del guardado
const handleItemSavedUpdate = (event: CustomEvent)=>{
  const {itemId, itemTitle, isSaved, message, savedCount } = event.detail;

  //Determina el ipo de notificación según guardado
  const notificaciónType = isSaved ? 'success' : 'info';
  //Mostrar notificación.
  showNotification(message || 'Hecho', notificaciónType )
}


  onMount(() => {
    window.addEventListener('dishRatingsUpdated', handleDishRatingsUpdated as EventListener);
    window.addEventListener('savedItemsUpdated', handleItemSavedUpdate as EventListener);
    return () => {
      window.removeEventListener('dishRatingsUpdated', handleDishRatingsUpdated as EventListener);
      window.removeEventListener('savedItemsUpdated', handleItemSavedUpdate as EventListener)
    };
  });

  // Cada vez que se muestre la notificación, se configura el timer de auto-cierre
  $: if (isVisible) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      isVisible = false;
    }, 3000);
  }

  onDestroy(() => {
    clearTimeout(timer);
  });
</script>

{#if isVisible}
  <div 
    class="notification-toast"
    transition:fly={{ y: 20, duration: 300 }}
    class:success={type === 'success'}
    class:info={type === 'info'}
    class:warning={type === 'warning'}
  >
    <div class="notification-content">
      <p>{message}</p>
    </div>
  </div>
{/if}

<style>
.notification-toast {
  position: fixed;
  top: 20px;
  right: 20px;
  min-width: 300px;
  max-width: 400px;
  padding: 15px 20px;
  border-radius: 8px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15); /* Sombra más pronunciada */
  z-index: 1000;
  font-family: system-ui, -apple-system, sans-serif;
}

/* Ejemplo de colores más contrastantes, pero derivados de tu paleta */
.success {
  background-color: #e9f7ef; /* Un verde muy claro, derivado de tu acento */
  border-left: 4px solid #28a745; /* Verde vibrante */
  color: #155724;
}

.info {
  background-color: #e8f4fd;
  border-left: 4px solid #17a2b8; /* Azul info */
  color: #0c5460;
}

.warning {
  background-color: #fff3cd;
  border-left: 4px solid #ffc107; /* Amarillo vibrante */
  color: #856404;
}

</style>
