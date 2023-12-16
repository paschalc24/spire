<script>
    import Nav from "../components/Nav.svelte";
    import StudentInfoContainer from "../components/StudentInfoContainer.svelte";
    import CourseTrack from "../components/CourseTrack.svelte";
    import { onMount } from "svelte";
    import { StudentStore } from "./stores.js";
    let studentId = 32417468; //Assuming we have this information configured from authentication
    let student = {};

    onMount(async () => {
        const studentRes = await fetch(`http://localhost:4000/student/${studentId}`);
        const studentData = await studentRes.json();
        StudentStore.set(studentData);
    });

    StudentStore.subscribe(async (_student) => {
        console.log(`Student List Subscribe: ${JSON.stringify(_student)}`);
        student = _student;
    });

</script>

<Nav studentId={studentId}/>
<StudentInfoContainer student={student} />
<CourseTrack student={student} />