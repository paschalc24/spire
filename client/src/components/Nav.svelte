<script>
    import logoIcon from "./logo.svg";
    import Cart from "./Cart.svelte";
    import CourseList from "./CourseList.svelte";
    export let studentId;
    
</script>

<nav class="nav align-items-center p-2">
    <img src={logoIcon} alt="Logo Icon" />
    <a class="nav-link active" href="/">{studentId}</a>
    <div class="cart-container">
        <CourseList studentId={studentId}/>
        <Cart studentId={studentId}/>
    </div>
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
    .cart-container{
        margin-left: auto;
    }
</style>