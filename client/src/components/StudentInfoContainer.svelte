<script>
    import testImage from "../../src/test.png";
    import StudentInfo from "./StudentInfo.svelte";
    import { onMount } from "svelte";
    import { StudentStore } from "../routes/stores.js";
    export let studentId;
    let student = {};

    onMount(async () => {
        try {
            const studentRes = await fetch(`http://localhost:4004/students/${studentId}`);
        const studentData = await studentRes.json();
        StudentStore.set(studentData);
        }
        catch (err) {
            console.error(err);
            alert("Unable to fetch student data")
        }
    });

    StudentStore.subscribe(async (_student) => {
        console.log(`Student List Subscribe: ${JSON.stringify(_student)}`);
        student = _student;
    });

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