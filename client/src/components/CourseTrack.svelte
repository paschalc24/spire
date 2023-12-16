<script>
  import StageButton from "./StageButton.svelte";
  import { StudentStore } from "../routes/stores.js";

  let student;
  let selectedDepartmentId = null; // Initialize as null
  let selectedDepartment = {};

  // Subscribe to the StudentStore and initialize the data
  StudentStore.subscribe((_student) => {
    student = _student;
    if (student?.departments?.length > 0) {
      // Initialize selectedDepartment if there are departments available
      selectedDepartmentId = selectedDepartmentId ?? student.departments[0];
      selectedDepartment = student.track?.[selectedDepartmentId] ?? {};
    }
  });

  // Handle department change
  function onSelectDepartmentChange(event) {
    selectedDepartmentId = event.target.value;
  
    // Safely update selectedDepartment with checks
    selectedDepartment = student.track?.[selectedDepartmentId] ?? {};
  }
</script>

{#if student?.departments?.length > 0}
  <div class="container-fluid">
    <select class="department-select h2" id="department-select" bind:value={selectedDepartmentId} on:change={onSelectDepartmentChange}>
      {#each student.departments as departmentId (departmentId)}
        <option value={departmentId}>{departmentId}</option>
      {/each}
    </select>
  </div>
{/if}

{#if Object.keys(selectedDepartment).length > 0}
  <div class="container-fluid">
    <!-- Display track information for the selected department -->
    {#each Object.entries(selectedDepartment?.track ?? {}) as [categoryId, category], index}
      <StageButton studentId={student.id} title={category.category} courseIDs={category.courseIDs} />
      {#if index < Object.keys(selectedDepartment.track).length - 1}
      <center>↓</center>
      {/if}
    {/each}
  </div>
{/if}

<style>
  .department-select {
    font-weight: 100;
    border: none;
  }
</style>