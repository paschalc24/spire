<script>
    import Modal from "./Modal.svelte";
    import { StudentStore } from "../routes/stores.js";
    import cartIcon from "./cart.svg";
    export let studentId;
    let showModal = false;
    let cart = [];

    StudentStore.subscribe((_student) => {
        cart = _student?.cart || [];
    });
    
    async function handleDelete(course) {
        try {
            await fetch(`http://localhost:4002/carts/${studentId}/${course}`, {
                method: "DELETE",
            });
            StudentStore.update((student) => {
                student.cart = student.cart.filter(e => e !== course);
                return student;
            })
        }
        catch (err) {
            console.error(err);
            alert("Unable to delete");
        }
    }
    async function handleEnroll(course) {
        try {
            await fetch(`http://localhost:4003/enrolled/${studentId}/${course}`, {
                method: "POST",
            });
            StudentStore.update((student) => {
                student.enrolled.push(course);
                student.cart = student.cart.filter(e => e !== course);
                return student;
            })
        }
        catch (err) {
            console.error(err);
            alert("Unable to enroll");
        }
    }
</script>

<button class="btn btn-dark ms-auto" on:click={() => (showModal = true)}>
    <div class="m-auto">
        <span class="mr-2">
            <img src={cartIcon} alt="Cart Icon" />
        </span>
    </div> 
</button>
<Modal bind:showModal={showModal}>
    <h2 slot="header">
        Cart
    </h2>
        {#each cart as course (course)}
            <div class="cart-item-container mb-2 d-flex">
                <li class="cart-item">{course}</li>
                <button on:click={() => handleDelete(course)} class="btn btn-dark">Remove</button>
                <button on:click={() => handleEnroll(course)} class="btn btn-success">Enroll</button>
            </div>
        {/each}
</Modal>

<style>
    .cart-item {
        margin-right: auto;
    }
    .btn-success {
        margin-left:10px;
        background-color: #38b6ff;
        border: none;
    }
</style>