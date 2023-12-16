<script>
    import Modal from "./Modal.svelte";
    import check from "../../src/check.png";
    import { CartStore } from "../routes/stores.js";
    export let title;
    export let courseIDs;
    let showModal = false;

    async function handlePost(course) {
        //need to provistion with student id.
        try {
            await fetch(`http://localhost:4002/carts/32417468/${course}`, {
                method: "POST",
            });
            CartStore.update((cart) => {
                cart.push(course);
                return cart;
            })
        }
        catch (err) {
            console.error(err);
            alert("Unable to post");
        }
    }
</script>

<button class="stage-button card p-3" on:click={() => (showModal = true)}>
    <div class="m-auto">
        <span class="mr-2">{title} &nbsp;</span>
        <img style="width:25px;" alt="check" src={check} />
    </div> 
</button>
<Modal bind:showModal={showModal}>
    <h2 slot="header">
        {title}
    </h2>
    {#each courseIDs as course (course)}
        <div class="cart-item-container mb-2 d-flex">
            <li class="cart-item">{course}</li>
            <button on:click={() => handlePost(course)} class="btn btn-success">Add</button>
        </div>
    {/each}
</Modal>

<style>
    .stage-button{
        height: 15vh;
        width: 100%;
        font-weight: 200;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        border: none;
        margin-bottom: 10px;
    }
    .stage-button {
    transition: transform 0.5s;
    }

    .stage-button:hover {
        transform: scale(1.015);
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