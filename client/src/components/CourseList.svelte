<script>
    import Modal from "./Modal.svelte";
    import { StudentStore } from "../routes/stores.js";
    import starIcon from "./star.svg";
    export let studentId;
    let showModal = false;
    let enrolled = [];

    StudentStore.subscribe((_student) => {
        enrolled = _student?.enrolled || [];
    });
    
    async function handleDelete(course) {
        try {
            await fetch(`http://localhost:4003/enrolled/${studentId}/${course}`, {
                method: "DELETE",
            });
            StudentStore.update((student) => {
                student.enrolled = student.enrolled.filter(e => e !== course);
                return student;
            })
        }
        catch (err) {
            console.error(err);
            alert("Unable to delete");
        }
    }
</script>

<button class="btn btn-dark ms-auto" on:click={() => (showModal = true)}>
    <div class="m-auto">
        <span class="mr-2">
            <img src={starIcon} alt="Course List Icon" />
        </span>
    </div> 
</button>
<Modal bind:showModal={showModal}>
    <h2 slot="header">
        Course List
    </h2>
        {#each enrolled as course (course)}
            <div class="cart-item-container mb-2 d-flex">
                <li class="cart-item">{course}</li>
                <button on:click={() => handleDelete(course)} class="btn btn-danger">Unenroll</button>
            </div>
        {/each}
</Modal>

<style>
    .cart-item {
        margin-right: auto;
    }
</style>