import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { StudentsService } from '../services/students-service';
import { Student } from '../students-table/students-table.component';

@Component({
  selector: 'app-add-student-form',
  templateUrl: './add-student-form.component.html',
  styleUrls: ['./add-student-form.component.css']
})
export class AddStudentFormComponent implements OnInit {
  addStudentFields: string[] = ['id', 'firstName', 'lastName', 'address', 'city', 'state']
  addStudentForm: FormGroup;
  @Input() renderStudents?: Function;
  @ViewChild(MatAccordion) accordion?: MatAccordion;

  constructor(private studentsService: StudentsService,
    private formBuilder: FormBuilder) {
    let fieldsJson: any = {};
    this.addStudentFields.forEach((field: string) => {
      fieldsJson[field] = '';
    });
    fieldsJson['grade'] = 1;
    this.addStudentForm = this.formBuilder.group(fieldsJson);
  }

  ngOnInit(): void {
  }

  addStudent(value: any) {
    this.studentsService.addStudent((value as Student))
      .subscribe(student => this.renderStudents && this.renderStudents());
  }

  public closeAccordion() {
    this.accordion?.closeAll();
  }
}
