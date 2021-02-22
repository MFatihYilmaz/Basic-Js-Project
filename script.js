const StrogeController = (function () {

    return {
        setStudent: function (student) {
            let students;
            if (localStorage.getItem('students') === null) {
                students = [];
                students.push(student);
            } else {
                students = JSON.parse(localStorage.getItem('students'));
                students.push(student);
            }
            localStorage.setItem('students', JSON.stringify(students));
        },
        getStudent: function () {
            let student;
            if (localStorage.getItem('students') == null) {
                student = [];
            } else {
                student=JSON.parse(localStorage.getItem('students'))
            }
            return student
        },
        removeStudent:function(student){
            let students=JSON.parse(localStorage.getItem('students'));
            students.forEach((std,index) => {
                if(student.studentNumber==std.studentNumber){
                    students.splice(index,1);
                }
            });
            localStorage.setItem('students',JSON.stringify(students));
        },
    }
})();

const StudentUI=(function(){
    const Student=function(studentNumber,password,name,surname,score){
        this.studentNumber=studentNumber;
        this.password=password;
        this.name=name;
        this.surname=surname;
        this.score=score;
    }
    const data={
        students:StrogeController.getStudent()
    }
    return{
        getStudents:function(){
            return data.students;
        },
        getStudentById:function(studentNumber){
            let student=null;
            data.students.forEach((stdnt)=>{
                if(stdnt.studentNumber==studentNumber){
                    student==stdnt;
                }
            })
            return student;
        },
        addStudent:function(password,name,surname,score){
            let studentNumber;
            let s4 = () => {
                return Math.floor((1 + Math.random()) * 0x10000)
                .toString(10)
              }
            studentNumber=s4();
            score=null;
            const newStudent=new Student(studentNumber,password,name,surname,score);
            
            data.students.push(newStudent);
            
            return newStudent;
            
        },
        removeStudent:function(stdno){
            data.students.forEach((stdnt,index)=>{
                if(stdnt.studentNumber==stdno){
                    data.students.splice(index,1);
                }
            })
            return `${stdno} numaralı öğrenci kayıtlardan silinmiştir`;
        }
    }
})();


const App =(function(studentuı,strogecntrl){

    const loadEvent=function(){
        
    const studentAddSubmit=function(e){
        let stdntName=document.getElementById("sname").value;
        let stdntSurname=document.getElementById("slname").value;
        let stdntPswd=document.getElementById("spsw").value;
        if(stdntName!=''&&stdntPswd!=''&&stdntSurname!=''){
            const newStudent=studentuı.addStudent(stdntPswd,stdntName,stdntSurname);
            document.getElementById("showNo").innerHTML=`Öğrenci Numaranız:${newStudent.studentNumber} <br> Lütfen unutmayınız  `;
            strogecntrl.setStudent(newStudent);

        }
        e.preventDefault();
    }
    const login=function(e){
        e.preventDefault();
        let stdntno=document.getElementById("no").value
        let stdntpsw=document.getElementById("psw").value
        studentuı.getStudents().forEach((stdnt)=>{
            if(stdntno==stdnt.studentNumber && stdntpsw==stdnt.password){
                console.log(`Hoşgeldiniz ${stdnt.name}`);
            }
        })
    }
    document.getElementById("submit").addEventListener("click",studentAddSubmit);
    document.getElementById("loginb").addEventListener("click",login);
    }
    return{
        init:function(){
            loadEvent();
        }
    }

})(StudentUI,StrogeController);
App.init()