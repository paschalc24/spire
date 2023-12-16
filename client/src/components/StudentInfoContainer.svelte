<script>
    import testImage from "../../src/test.png";
    import StudentInfo from "./StudentInfo.svelte";
    export let student = {};

</script>

<div class="container-fluid">
    <div class="row">
        <div class="col-md-6" style="flex: 40%;">
            <center>
                <img class="w-50 m-5" alt="user" src={testImage} />
            </center>
        </div>
        <div class="col-md-6 align-self-center p-5" style="flex: 60%;">
            <StudentInfo student={student}/>
        </div>
    </div>
</div>