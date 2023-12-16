<script>
    export let student = {};
    $: student_first = student.firstName ? student.firstName: '...';
    $: student_gpa = student.gpa ? student.gpa: '...';
    $: student_major_gpa = student.major_gpa ? student.major_gpa: '...';
    $: student_academic_year = student.academic_year ? student.academic_year: '...';
    $: student_standing = student.standing ? student.standing: '...';
    $: student_credits = student.credits ? student.credits: '...';
    $: student_expected_grad = student.expected_grad ? student.expected_grad: '...';
    $: student_last = student.lastName ? student.lastName: '';

</script>

<div class="card p-5 shadow-sm border-0">
    <div class="student-info container">
        <div class="row">
            <div class="col-md-6">
                <div class="row pb-3">{student_first} {student_last}</div>
                <div class="row pb-3">GPA: {student_gpa}</div>
                <div class="row pb-3">Major GPA: {student_major_gpa}</div>
                <div class="row pb-3">Academic Year: {student_academic_year}</div>
            </div>
            <div class="col-md-6">
                <div class="row pb-3">Academic Standing: {student_standing}</div>
                <div class="row pb-3">Credits: {student_credits}</div>
                <div class="row pb-3">Expected Graduation: {student_expected_grad}</div>
            </div>
        </div>
    </div>
</div>

<style>
    .card {
        align-self: "center";
    }
    .student-info {
        font-weight: 200;
    }
</style>