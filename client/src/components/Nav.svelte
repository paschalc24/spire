<script>
    import Modal from "./Modal.svelte";
    import { StudentStore } from "../routes/stores.js";
    import cartIcon from "./cart.svg";
    import logoIcon from "./logo.svg"
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
</script>

<nav class="nav align-items-center p-2">
    <img src={logoIcon} alt="Logo Icon" />
    <a class="nav-link active" href="/">{studentId}</a>
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
                    <button class="btn btn-success">Enroll</button>
                </div>
            {/each}
    </Modal>
</nav>

<style>
    .nav {
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .nav-link.active {
        opacity: 1;
    }
    .nav-link {
        color: black;
        opacity: 0.5;
    }
    .nav-link:hover {
        opacity: 1;
    }
    .cart-item {
        margin-right: auto;
    }
    .btn-success {
        margin-left:10px;
        background-color: #38b6ff;
        border: none;
    }
</style>