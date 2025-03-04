<script lang="ts">
    import { onMount } from 'svelte';
  
    export let id: string;
    export let rating: number;
    const maxRating = 5;
  
    interface DishRating {
      id: string;
      rating: number;
    }
  
    const newRatingMessages = {
      1: "😞 ¡Gracias por tu valoración! Tomaremos nota para sorprenderte en tu próxima visita.",
      2: "😕 ¡Gracias por tu opinión! Trabajaremos duro para mejorar tu experiencia.",
      3: "😐 ¡Gracias por tu feedback! Estamos en constante mejora, ¡lo mejor está por venir!",
      4: "😊 ¡Qué bueno! Gracias por valorarnos, nos alegra que hayas disfrutado.",
      5: "🤩 ¡Increíble! Tu 5 estrellas nos llena de energía. ¡Prepárate para lo próximo!"
    };
  
    const changedRatingMessages = {
      1: "😔 Has cambiado de opinión. ¡Prometemos esforzarnos aún más para sorprenderte!",
      2: "😕 Tu nueva valoración nos motiva a seguir mejorando. ¡Gracias por tu sinceridad!",
      3: "😐 Gracias por actualizar tu valoración. ¡Tu opinión es vital para nosotros!",
      4: "😊 ¡Fantástico! Has mejorado tu valoración. ¡Estamos encantados de ver tu evolución!",
      5: "🤩 ¡Wow! Ahora eres de 5 estrellas. ¡Eres un auténtico experto en buen gusto!"
    };
  
    function handleRatingClick(selectedRating: number) {
      if (rating === selectedRating) return;
      rating = selectedRating;
      saveRating();
    }
  
    function saveRating() {
      try {
        const savedRatings: DishRating[] = JSON.parse(localStorage.getItem('dishRatingsList') || '[]');
        const dishIndex = savedRatings.findIndex(dish => dish.id === id);
        const isNew = dishIndex === -1;
        
        if (dishIndex !== -1) {
          savedRatings[dishIndex].rating = rating;
        } else {
          savedRatings.push({ id, rating });
        }
        localStorage.setItem('dishRatingsList', JSON.stringify(savedRatings));
        
        const message = isNew ? newRatingMessages[rating] : changedRatingMessages[rating];
        window.dispatchEvent(new CustomEvent('dishRatingsUpdated', {
          detail: { id, rating, message }
        }));
      } catch (error) {
        console.error('Error al guardar la valoración:', error);
      }
    }
  
    onMount(() => {
      try {
        const savedRatings = JSON.parse(localStorage.getItem('dishRatingsList') || '[]');
        const existingRating = savedRatings.find(dish => dish.id === id)?.rating;
        if (existingRating) rating = existingRating;
      } catch (error) {
        console.error('Error al inicializar valoraciones:', error);
      }
    });
  </script>
  
  <div id={"rating-container-" + id} class="rating-container flex items-center gap-1 bg-[var(--primary)] py-1 px-4 justify-center rounded-full " data-dish-id={id}>
    {#each Array(maxRating) as _, index}
     
      <button 
        class="star-rating text-[16px] cursor-pointer transition-transform duration-150 hover:scale-110 {index + 1 <= rating ? 'text-yellow-400' : 'text-gray-300'}"
        on:click={() => handleRatingClick(index + 1)}
        aria-label={`Calificar ${index + 1} estrella${index + 1 > 1 ? 's' : ''}`}
      >
        <i class="fa-solid fa-star"></i>
      </button>
    {/each}
  </div>
  