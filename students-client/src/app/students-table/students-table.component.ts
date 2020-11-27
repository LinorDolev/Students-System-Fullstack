import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { StudentsService } from '../services/students-service';
import { AddStudentFormComponent } from '../add-student-form/add-student-form.component';


export interface Student {
  [index: string]: string | number | symbol;
  id: string;
  firstName: string;
  lastName: string;
  grade: number;
  address: string;
  city: string;
  state: string;
}

@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.css']
})
export class StudentsTableComponent implements OnInit, AfterViewInit {
  headers: string[] = ['First Name', 'Last Name', 'Grade', 'Address', 'City', 'State']
  displayedColumns: string[] = ['firstName', 'lastName', 'grade', 'address', 'city', 'state']
  allColumns: string[] = ['firstName', 'lastName', 'grade', 'address', 'city', 'state', 'edit', 'delete']

  dataSource = new MatTableDataSource();
  editedStudent?: Student;
  backupStudent?: any;

  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(AddStudentFormComponent) addStudentFormComponent?: AddStudentFormComponent;

  constructor(public dialog: MatDialog, private studentsService: StudentsService) { }


  ngOnInit(): void {
    this.renderStudents();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    this.dataSource.sort = this.sort;
  }

  renderStudents() {
    this.studentsService.getStudents().subscribe(
      (students: any) => {
        this.dataSource.data = students;
        console.log(students);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.filterPredicate = (data, filter) => {
      let student = (data as Student);
      return `${student.firstName} ${student.lastName}`.toLowerCase().includes(filter.toLowerCase());
    }
  }

  shouldDisableButton(): boolean {
    return !this.editedStudent || !Object.values(this.editedStudent).every(value => !!value && value.toString().length > 0);
  }
  updateStudentField(event: Event) {
    const inputField = (event.target as HTMLInputElement);
    console.log(inputField);
    if (this.editedStudent) {
      this.editedStudent[inputField.name] = inputField.value;
    }
  }
  editStudent(student: Student) {
    if (this.editedStudent && this.editedStudent.id !== student.id) {
      Object.assign(this.editedStudent, this.backupStudent);
    }
    if (!this.editedStudent || this.editedStudent.id !== student.id) {
      this.editedStudent = student;
      const backup = {};
      Object.assign(backup, this.editedStudent);
      this.backupStudent = backup;
    } else {
      if (this.backupStudent) {
        Object.assign(this.editedStudent, this.backupStudent);
      }
      this.editedStudent = undefined;
    }
  }
  onSaveStudentUpdate() {
    if (this.editedStudent) {
      this.studentsService.updateStudent(this.editedStudent)
        .subscribe(() => this.renderStudents());
    }
    this.backupStudent = null;
    this.editedStudent = undefined;
  }

  openDialog(student: Student): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: { studentToDelete: student }
    });

    dialogRef.afterClosed().subscribe(studentToDelete => {
      if (studentToDelete) {
        this.studentsService.deleteStudent(studentToDelete)
          .subscribe(() => this.renderStudents());
      }
    });
  }

}
