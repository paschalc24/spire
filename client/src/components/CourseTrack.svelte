<script>
  export let student;
  import StageButton from "./StageButton.svelte";
  import { DepartmentStore } from "../routes/stores.js";

  let departments = {};
  let selectedDepartmentId; // Store the ID of the selected department

  $: selectedDepartment = departments[selectedDepartmentId]; // Store the details of the selected department

  // Fetch departments when student data is available
  $: if (student && Array.isArray(student.departments)) {
    fetchDepartments(student.departments);
  }

  async function fetchDepartments(departmentIds) {
    let _departments = {};
    for (const departmentId of departmentIds) {
      const res = await fetch(`http://localhost:4001/department/${departmentId}`);
      const data = await res.json();
      _departments[departmentId] = data;
    }
    DepartmentStore.set(_departments);

    // Set the default selected department to the first in the list
    selectedDepartmentId = departmentIds[0];
  }
  
  // Listener for DepartmentStore changes
  DepartmentStore.subscribe((_departments) => {
    departments = _departments;
    // Reactively update the selected department
    if (selectedDepartmentId) {
      selectedDepartment = departments[selectedDepartmentId];
    }
  });

  // Handle department selection change
  function onSelectDepartmentChange(event) {
    selectedDepartmentId = event.target.value;
  }
</script>

<!-- Selection dropdown for departments -->
{#if Object.keys(departments).length > 0}
  <div class="container-fluid">
    <label for="department-select" class="degree-header"></label>
    <select class="department-select h2 border-0 font-weight-light" id="department-select" bind:value={selectedDepartmentId} on:change={onSelectDepartmentChange}>
      {#each Object.keys(departments) as departmentId (departmentId)} <!-- Add the (departmentId) key here to help Svelte track items -->
        <option value={departmentId}>{departments[departmentId].title}</option>
      {/each}
    </select>
  </div>
{/if}

<!-- Render the selected department's course track -->
{#if selectedDepartment}
  <div class="container-fluid">
    <div class="container-fluid p-5">
      <div class="row">
        <div class="col">
          <div class="row m-5">
            {#each Object.entries(selectedDepartment.track) as [trackKey, trackValue], trackIndex (trackKey)}
              <StageButton title={trackValue.category} courseIDs={trackValue.courseIDs}/>
              {#if trackIndex < Object.keys(selectedDepartment.track).length - 1}
                <center>↓</center>
              {/if}
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
{:else}
  <div class="container-fluid">
    <h2 class="department-select container-fluid">
      No departments found
    </h2>
  </div>
{/if}

<style>
  .department-select {
    font-weight: 100;
  }
</style>