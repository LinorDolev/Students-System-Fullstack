package com.students.server.service;

import com.students.server.dal.StudentDao;
import com.students.server.entities.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class StudentService {
    private StudentDao studentDao;

    @Autowired
    public StudentService(StudentDao studentDao){
        setStudentDao(studentDao);
    }

    public Student addStudent(Student student){
        if(student.getId() == null){
            throw new RuntimeException("Student must have an id!");
        }
        validateStudentNotExist(student.getId());
        return studentDao.save(student);
    }

    public List<Student> getAllStudents(){
        return studentDao.findAll();
    }

    public void updateStudent(String studentId, Student updatedStudent){
        validateStudentExists(studentId);
        Student studentFromDb = studentDao.getOne(studentId);

        if(updatedStudent.getFirstName() != null){
            studentFromDb.setFirstName(updatedStudent.getFirstName());
        }

        if(updatedStudent.getLastName() != null){
            studentFromDb.setLastName(updatedStudent.getLastName());
        }

        if(updatedStudent.getGrade() != null){
            studentFromDb.setGrade(updatedStudent.getGrade());
        }

        if(updatedStudent.getAddress() != null){
            studentFromDb.setAddress(updatedStudent.getAddress());
        }

        if(updatedStudent.getCity() != null){
            studentFromDb.setCity(updatedStudent.getCity());
        }

        if(updatedStudent.getState() != null){
            studentFromDb.setState(updatedStudent.getState());
        }
        studentDao.save(studentFromDb);
    }

    public void deleteStudent(String studentId){
        validateStudentExists(studentId);
        studentDao.deleteById(studentId);
    }

    private void validateStudentNotExist(String studentId){
        if(studentDao.existsById(studentId)){
            throw new RuntimeException(String.format("Student with the given id already exists!, id: %s",
                    studentId));
        }
    }


    private void validateStudentExists(String studentId){
        if(!studentDao.existsById(studentId)){
            throw new RuntimeException(String.format("Student with the given id not exists in database!, id: %s",
                    studentId));
        }
    }

    public void setStudentDao(StudentDao studentDao) {
        this.studentDao = studentDao;
    }
}
