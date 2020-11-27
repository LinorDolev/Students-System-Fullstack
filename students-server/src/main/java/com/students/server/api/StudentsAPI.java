package com.students.server.api;

import com.students.server.entities.Student;
import com.students.server.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController("/students")
@CrossOrigin
public class StudentsAPI {
    private StudentService studentService;

    @Autowired
    public StudentsAPI(StudentService studentService){
        setStudentService(studentService);
    }

    @PostMapping()
    public Student addStudent(@RequestBody Student student){
        return studentService.addStudent(student);
    }

    @GetMapping()
    public List<Student> getAllStudents(){
        return studentService.getAllStudents();
    }

    @PutMapping("/{id}")
    public void updateStudent(@PathVariable("id") String id, @RequestBody Student student){
        studentService.updateStudent(id, student);
    }

    @DeleteMapping("/{id}")
    public void deleteStudent(@PathVariable("id") String id){
        studentService.deleteStudent(id);
    }

    public void setStudentService(StudentService studentService) {
        this.studentService = studentService;
    }
}
