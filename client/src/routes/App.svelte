<script>
    import Nav from "../components/Nav.svelte";
    import StudentInfoContainer from "../components/StudentInfoContainer.svelte";
    import CourseTrack from "../components/CourseTrack.svelte";
    let studentId = 32417468; //Assuming we have this information configured from authentication

</script>

<Nav studentId={studentId}/>
<StudentInfoContainer studentId={studentId}/>
<CourseTrack />