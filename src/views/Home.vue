<template>
  <div>
    <h1>Welcome to the Home Page</h1>
    <button @click="exportLesson">Export Lesson</button>
  </div>
</template>

<script>
export default {
  methods: {
    exportLesson() {
      const lessonId = 'ch39idk1'; // Replace with your dynamic lesson ID logic

      // Send a POST request to the server to trigger the Slidev export
      fetch(`http://localhost:3000/export-lesson/${lessonId}`, {
        method: 'POST',
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log('Export successful:', data);
        })
        .catch(error => {
          console.error('Export failed:', error);
        });
    },
  },
};
</script>

<style scoped>
/* Add your component styles here */
</style>
