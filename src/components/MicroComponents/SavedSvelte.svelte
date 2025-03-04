<script lang="ts">
    import { onMount } from 'svelte';
  
    export let id: string;
    export let title: string;
    export let isSaved: boolean = false;
  
    interface SavedItem {
      id: string;
      title: string;
      dateAdded: string;
    }
  
    const savedMessages = {
      added: "🎉 ¡Elemento guardado con éxito! Lo encontrarás en tu lista de favoritos.",
      removed: "✓ Elemento eliminado de tu lista de guardados."
    };
  
    function toggleSavedState() {
      const currentSavedState = isSaved;
      isSaved = !currentSavedState;
      updateButtonAppearance();
      updateSavedItemsStorage();
    }
  
    function updateButtonAppearance() {
      const outlineIcon = document.querySelector(`.saved-icon-outline[data-id='${id}']`);
      const filledIcon = document.querySelector(`.saved-icon-filled[data-id='${id}']`);
      
      if (outlineIcon && filledIcon) {
        outlineIcon.style.display = isSaved ? 'none' : '';
        filledIcon.style.display = isSaved ? '' : 'none';
      }
    }
  
    function updateSavedItemsStorage() {
      try {
        const savedItems: SavedItem[] = JSON.parse(localStorage.getItem('savedItemsList') || '[]');
        const itemIndex = savedItems.findIndex(item => item.id === id);
        let eventDetail;
  
        if (isSaved && itemIndex === -1) {
          savedItems.push({ id, title, dateAdded: new Date().toISOString() });
          eventDetail = { itemId: id, itemTitle: title, isSaved: true, message: savedMessages.added, savedCount: savedItems.length };
        } else if (!isSaved && itemIndex !== -1) {
          savedItems.splice(itemIndex, 1);
          eventDetail = { itemId: id, itemTitle: title, isSaved: false, message: savedMessages.removed, savedCount: savedItems.length };
        } else {
          return;
        }
  
        localStorage.setItem('savedItemsList', JSON.stringify(savedItems));
        window.dispatchEvent(new CustomEvent('savedItemsUpdated', { detail: eventDetail }));
      } catch (error) {
        console.error('Error al actualizar elementos guardados:', error);
      }
    }
  
    onMount(() => {
      try {
        const savedItems = JSON.parse(localStorage.getItem('savedItemsList') || '[]');
        isSaved = savedItems.some(item => item.id === id);
      } catch (error) {
        console.error('Error al inicializar estado de guardado:', error);
        localStorage.removeItem('savedItemsList');
      }
    });
  </script>
  
  <div class="saved-container inline-flex items-center" data-item-id={id} data-item-title={title} data-is-saved={isSaved}>
    <button 
      class="saved-button p-2 rounded-full w-[40px] h-[40px] bg-white cursor-pointer transition-colors duration-200 "
      aria-label={isSaved ? "Eliminar de guardados" : "Guardar elemento"}
      type="button"
      on:click={toggleSavedState}
    >
      <span class="saved-icon-outline" data-id={id} style={isSaved ? "display: none;" : ""}>
        <i class="fa-regular fa-bookmark text-[var(--primary)]"></i>
      </span>
      <span class="saved-icon-filled" data-id={id} style={isSaved ? "" : "display: none;"}>
        <i class="fa-solid fa-bookmark text-[var(--primary)]"></i>
      </span>
    </button>
  </div>
  